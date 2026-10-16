#!/usr/bin/env node
// Synchronise the seven numbered image folders with the images arrays in content.js.
// No external dependencies. Run from anywhere: node scripts/sync-gallery-images.mjs
// Use --check to verify without writing (exit 1 if updates are needed).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleries = ['start', 'about', 'angebot', 'praktisches', 'gestalt', 'miniBlog', 'kontakt'];
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const variants = new Set(['en', 'dark', 'phone']);
const maxSlides = 12;
const checkOnly = process.argv.includes('--check');

function parseName(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (!supported.has(ext)) return null;
  const stem = filename.slice(0, -ext.length);
  if (!/^\d{1,3}_/.test(stem)) return null;
  const parts = stem.split('_');
  const suffixes = [];
  while (parts.length > 2 && variants.has(parts[parts.length - 1])) {
    suffixes.unshift(parts.pop());
  }
  const baseStem = parts.join('_');
  const number = Number(baseStem.match(/^(\d{1,3})_/)[1]);
  return { filename, baseStem, ext, number, suffixes };
}

function entriesFor(gallery, hash) {
  const folderName = gallery === 'miniBlog' ? 'miniblog' : gallery;
  const folder = path.join(root, 'images', folderName);
  if (!fs.existsSync(folder)) throw new Error('Missing gallery folder: images/' + folderName);
  const files = fs.readdirSync(folder).sort((a, b) => a.localeCompare(b, 'en'));
  const grouped = new Map();

  for (const filename of files) {
    const full = path.join(folder, filename);
    if (!fs.statSync(full).isFile()) continue;
    const item = parseName(filename);
    if (!item) {
      if (supported.has(path.extname(filename).toLowerCase())) {
        console.warn('::warning::Skipped unnumbered image: images/' + folderName + '/' + filename);
      }
      continue;
    }
    // Include the bytes so replacing an image without renaming it also refreshes
    // the cache version in index.html.
    hash.update('images/' + folderName + '/' + filename + '\0');
    hash.update(fs.readFileSync(full));
    let group = grouped.get(item.baseStem);
    if (!group) {
      group = { number: item.number, stem: item.baseStem, plain: [], variants: [] };
      grouped.set(item.baseStem, group);
    }
    (item.suffixes.length ? group.variants : group.plain).push(item);
  }

  const sorted = [...grouped.values()].sort(
    (a, b) => a.number - b.number || a.stem.localeCompare(b.stem, 'en')
  );
  if (sorted.length > maxSlides) {
    throw new Error(gallery + ' contains ' + sorted.length +
      ' slides, but only ' + maxSlides + ' are supported. No files changed.');
  }

  const seenNumbers = new Map();
  for (const group of sorted) {
    if (seenNumbers.has(group.number)) {
      console.warn('::warning::Duplicate number ' + group.number +
        ' in images/' + folderName + ': ' + seenNumbers.get(group.number) + ' and ' +
        group.stem + '. Both slides will be kept in alphabetical order.');
    } else {
      seenNumbers.set(group.number, group.stem);
    }
  }

  return sorted.map(group => {
    if (group.plain.length > 1) {
      throw new Error('Ambiguous original formats for images/' + folderName + '/' +
        group.stem + ': ' + group.plain.map(x => x.filename).join(', '));
    }
    const nonDark = group.variants.find(x => !x.suffixes.includes('dark'));
    if (!group.plain.length && !nonDark) {
      throw new Error('Only dark-mode variants exist for images/' + folderName +
        '/' + group.stem + '. Supply a base, _en or _phone file.');
    }
    const main = group.plain[0];
    // A slide with only _en or _phone still has a logical base filename.
    // The browser's fallback logic locates the real variant automatically.
    const extension = main ? main.ext : nonDark.ext;
    const baseName = 'images/' + folderName + '/' + group.stem + extension;
    const en = group.variants.find(x =>
      x.suffixes.length === 1 && x.suffixes[0] === 'en'
    );

    for (const variant of group.variants) {
      if (variant.ext !== extension && variant !== en) {
        console.warn('::warning::Variant has a different extension from its base: images/' +
          folderName + '/' + variant.filename + '. Automatic dark/phone lookup ' +
          'requires the same extension as ' + baseName + '.');
      }
    }

    // English translations using a different format are stored explicitly:
    // { image: '01_picture.jpg', image_en: '01_picture_en.png' }.
    if (en && en.ext !== extension) {
      return { image: baseName, image_en: 'images/' + folderName + '/' + en.filename };
    }
    return baseName;
  });
}

function replaceImages(source, gallery, entries) {
  // Accept both multiline and inline arrays (ANGEBOT/PRAKTISCHES were inline).
  const regexp = new RegExp('(\\b' + gallery +
    ':\\s*\\{[\\s\\S]*?\\bimages:\\s*\\[)([^\\]]*)(\\])');
  const match = source.match(regexp);
  if (!match) throw new Error('Cannot locate images list for ' + gallery + ' in content.js');
  const quoted = value => "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  const rendered = '\n' + entries.map(item =>
    '      ' + (typeof item === 'string'
      ? quoted(item)
      : '{ image: ' + quoted(item.image) +
        ', image_en: ' + quoted(item.image_en) + ' }')
  ).join(',\n');
  return source.replace(regexp, (_, before, unused, after) => before + rendered + '\n    ' + after);
}

function run() {
  const hash = crypto.createHash('sha256');
  const all = new Map();
  for (const gallery of galleries) {
    const entries = entriesFor(gallery, hash);
    all.set(gallery, entries);
    console.log(gallery + ': ' + entries.length + ' slides');
  }

  const contentPath = path.join(root, 'content.js');
  const indexPath = path.join(root, 'index.html');
  const beforeContent = fs.readFileSync(contentPath, 'utf8');
  const beforeIndex = fs.readFileSync(indexPath, 'utf8');
  let newContent = beforeContent;
  for (const [gallery, entries] of all) {
    newContent = replaceImages(newContent, gallery, entries);
  }

  // Change the URL whenever an image or variant changes, even if its filename
  // remains the same. Other scripts and stylesheet versions are untouched.
  const version = 'gallery-' + hash.digest('hex').slice(0, 12);
  const versionPattern = /content\.js\?v=[^"'<> \t\r\n]+/g;
  if (!versionPattern.test(beforeIndex)) {
    throw new Error('Missing versioned content.js reference in index.html');
  }
  const newIndex = beforeIndex.replace(versionPattern, 'content.js?v=' + version);
  const changed = [];
  if (newContent !== beforeContent) changed.push('content.js');
  if (newIndex !== beforeIndex) changed.push('index.html');
  if (changed.length) {
    console.log('To update: ' + changed.join(', '));
    if (!checkOnly) {
      if (changed.includes('content.js')) fs.writeFileSync(contentPath, newContent);
      if (changed.includes('index.html')) fs.writeFileSync(indexPath, newIndex);
    }
  } else {
    console.log('Already up to date.');
  }
  if (checkOnly && changed.length) process.exitCode = 1;
}

try {
  run();
} catch (err) {
  console.error('::error::' + err.message);
  process.exitCode = 1;
}