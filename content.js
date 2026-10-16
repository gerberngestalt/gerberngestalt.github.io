/*
 * GERBERNGESTALT — INHALTE
 *
 * Texte, Bilder, Übersetzungen und NETZWERK-Einträge werden hier bearbeitet.
 * Jede Galerie enthält ein images-Array; optionale englische Bilddateien
 * stehen bei Bedarf in image_en; Varianten mit _dark und _phone im
 * Dateinamen werden automatisch erkannt.
 * Bedienung und klickbare KONTAKT-Karten stehen in script.js.
 * Weitere Hinweise: README.md.
 */
window.SITE_CONTENT = {
  start: {
    title: 'START',
    title_en: 'HOME',
    images: [
      { image:'images/start/logo3.jpg' },
      { image:'images/start/logo2.jpg' },
      { image:'images/start/slide3.png' }
    ]
  },

  about: {
    title: 'ÜBER MICH',
    title_en: 'ABOUT ME',
    images: [
      'images/about/01_passfoto.jpg',
      'images/about/02_niklaus-zumstein.png',
      'images/about/03_was-mich-privat.png',
      'images/about/04_metal-stamp.jpg',
      'images/about/05_ich-sehe-ausgesprochen.png',
      'images/about/06_offensichtliches-erschliesst.png',
      'images/about/07_smile.png',
      'images/about/08_wir-wollen-uns.png',
      'images/about/09_einen-dialog-mit.png',
      'images/about/10_hat-moustache.png'
    ]
  },

  angebot: {
    title: 'ANGEBOT',
    title_en: 'WHAT I DO',
    images: ['images/angebot/ab-maerz.png', 'images/angebot/mein-angebot.png', 'images/angebot/wood-stamp.jpg']
  },

  praktisches: {
    title: 'PRAKTISCHES',
    title_en: 'PRACTICALITIES',
    images: ['images/praktisches/erstsitzung.png', 'images/praktisches/clay-stamp.jpg']
  },

  gestalt: {
    title: 'GESTALT',
    title_en: 'GESTALT',
    images: [
      { image:'images/gestalt/01_alles-was-ist.jpg', image_en:'images/gestalt/01_alles-was-ist_en.jpg' },
      { image:'images/gestalt/02_was-sein-darf.jpg', image_en:'images/gestalt/02_was-sein-darf_en.jpg' },
      { image:'images/gestalt/03_gestalttherapie-betont.png' },
      { image:'images/gestalt/04_nicht-alles-ist.png' },
      { image:'images/gestalt/05_ich-bin-ich.png' },
      { image:'images/gestalt/06_gestalttherapie-uebt.png' },
      { image:'images/gestalt/07_stone-stamp.jpg' }
    ]
  },

  miniBlog: {
    title: 'MINI-BLOG',
    title_en: 'MINI-BLOG',
    images: [
      { image:'images/miniblog/als-mensch-mache-ich.png', image_en:'images/miniblog/als-mensch-mache-ich_en.png' },
      'images/miniblog/potato-stamp.jpg'
    ]
  },

  kontakt: {
    title: 'KONTAKT',
    title_en: 'CONTACT',
    images: [
      'images/kontakt/01_gerberngestalt.png',
      { image:'images/kontakt/02_kroki.jpg', image_en:'images/kontakt/02_kroki_en.jpg' },
      { image:'images/kontakt/03_kroki.jpg', image_en:'images/kontakt/03_kroki_en.jpg' },
      'images/kontakt/04_soap-stamp.jpg'
    ]
  },

  contact: {
    name: 'Niklaus Zumstein',
    role: 'Gestalttherapeut in Ausbildung',
    service: 'psychologische beratung',
    location: 'Solothurner Altstadt',
    address: 'Gerberngasse 3, 4500 Solothurn',
    email: 'gerberngestalt@gmail.com'
  },

  legal: {
    imprint: 'Niklaus Zumstein · gerberngestalt · Solothurn. Weitere Angaben folgen.',
    imprint_en: 'Niklaus Zumstein · gerberngestalt · Solothurn. Further details to follow.',
    privacy: 'Kurze Datenschutzerklärung folgt.',
    privacy_en: 'Privacy information to follow.'
  },

  network: [
    {
      label: "Seminar für Gestalttherapie SfGT, Winterthur",
      autoWrap: true,
      url: "https://www.sfgt.ch/",
      display: "www.sfgt.ch",
      spaceAfter: true
    },
    {
      label: "Lapis Dharma Centre, Mullumbimby Creek, Australien",
      label_en: "Lapis Dharma Centre, Mullumbimby Creek, Australia",
      url: "https://www.lapisdharma.com/",
      display: "www.lapisdharma.com"
    },
    {
      label: "Miguel Guldimann, Solothurn",
      url: "https://www.zenmeditation.ch/",
      display: "www.zenmeditation.ch"
    },
    {
      label: "Shambhala Zentrum, Bern",
      label_en: "Shambhala Centre, Bern",
      url: "https://bern.shambhala.org/",
      url_en: "https://bern.shambhala.org/?lang=en",
      display: "bern.shambhala.org"
    },
    {
      label: "Shambhala Zentrum, Köln",
      label_en: "Shambhala Centre, Cologne",
      url: "https://cologne.shambhala.org/",
      url_en: "https://cologne.shambhala.org/?lang=en",
      display: "cologne.shambhala.org"
    },
    {
      label: "Shambhala Zentrum, Wien",
      label_en: "Shambhala Centre, Vienna",
      url: "https://wien.shambhala.info/",
      url_en: "https://wien.shambhala.info/?lang=en",
      display: "wien.shambhala.info"
    },
    {
      label: "Shambhala Zentrum, Zürich",
      label_en: "Shambhala Centre, Zurich",
      url: "https://zuerich.shambhala.org/",
      url_en: "https://zuerich.shambhala.org/?lang=en",
      display: "zuerich.shambhala.org"
    },
    {
      label: "Siddhartha's Intent, Dzongsar Khyentse Rinpoche",
      url: "https://siddharthasintent.org/",
      display: "siddharthasintent.org"
    },
    {
      label: "Songtsen, Pema Wangyal Rinpoche",
      url: "https://www.songtsen.org/",
      display: "www.songtsen.org"
    }
  ]
};
