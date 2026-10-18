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
    images: [
      'images/angebot/01_ab-maerz.png',
      'images/angebot/02_mein-angebot.png',
      'images/angebot/03_wood-stamp.jpg'
    ]
  },

  praktisches: {
    title: 'PRAKTISCHES',
    title_en: 'PRACTICALITIES',
    images: [
      'images/praktisches/01_erstsitzung.png',
      'images/praktisches/02_clay-stamp.jpg'
    ]
  },

  gestalt: {
    title: 'GESTALT',
    title_en: 'GESTALT',
    images: [
      'images/gestalt/01_alles-was-ist.jpg',
      'images/gestalt/02_was-sein-darf.jpg',
      'images/gestalt/03_gestalttherapie-betont.png',
      'images/gestalt/04_nicht-alles-ist.png',
      'images/gestalt/05_ich-bin-ich.png',
      'images/gestalt/06_gestalttherapie-uebt.png',
      'images/gestalt/07_stone-stamp.jpg'
    ]
  },

  miniBlog: {
    title: 'MINI-BLOG',
    title_en: 'MINI-BLOG',
    images: [
      'images/miniblog/01_als-mensch-mache-ich.png',
      'images/miniblog/02_potato-stamp.jpg'
    ]
  },

  kontakt: {
    title: 'KONTAKT',
    title_en: 'CONTACT',
    images: [
      'images/kontakt/01_gerberngestalt.png',
      'images/kontakt/02_kroki.jpg',
      'images/kontakt/03_kroki.jpg',
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
    imprint: 'gerberngestalt\nNiklaus Zumstein\nGerberngasse 3\n4500 Solothurn\nSchweiz\n\ngerberngestalt@gmail.com',
    imprint_en: 'gerberngestalt\nNiklaus Zumstein\nGerberngasse 3\n4500 Solothurn\nSchweiz\n\ngerberngestalt@gmail.com',
    privacy: "Diese Website wird über GitHub Pages betrieben. Dabei können technische Zugriffsdaten, insbesondere IP-Adressen, auch im Ausland verarbeitet werden.\n\nWir verwenden keine eigenen Analyse- oder Werbetracker. Die Spracheinstellung wird lokal im Browser gespeichert. Für externe Links, etwa zu Google Maps oder Instagram, gelten die Datenschutzbestimmungen der jeweiligen Anbieter.\n\nE-Mail-Anfragen werden ausschliesslich zur Kontaktaufnahme und Beantwortung verwendet und nur so lange wie nötig aufbewahrt.\n\nPersönliche Angaben und Inhalte aus den gestalttherapeutischen Beratungssitzungen werden vertraulich behandelt und im Rahmen meiner Ausbildung ausschliesslich anonymisiert besprochen.\n\nFür Auskunft, Berichtigung oder Löschung Ihrer Daten kontaktieren Sie bitte die im Impressum genannte verantwortliche Person.",
    privacy_en: "This website is hosted on GitHub Pages. Technical access data, including IP addresses, may be processed outside Switzerland.\n\nWe do not use our own analytics or advertising trackers. Your language preference is stored locally in your browser. External links, such as Google Maps or Instagram, are subject to the respective providers' privacy policies.\n\nEmail enquiries are used solely for communication and replies and are retained only as long as necessary.\n\nPersonal information and content from gestalt therapy counselling sessions are treated confidentially and discussed as part of my training only in anonymised form.\n\nTo request access to, correction or deletion of your data, please contact the responsible person listed in the legal notice."
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
