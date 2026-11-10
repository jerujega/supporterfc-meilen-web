export interface GalleryPhoto {
  url: string;
  caption: { de: string; en: string };
  year: number;
  collectionTitle: { de: string; en: string };
}

export const FEATURED_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    url: '/gallery/gallery-01-uebergabe-vorstand.jpg',
    year: 2024,
    caption: {
      de: 'Historischer Tag 2024: Übergabe an den neuen Vorstand unter Leitung von Sanji Lingam',
      en: 'Historischer Tag 2024: Übergabe an den neuen Vorstand unter Leitung von Sanji Lingam',
    },
    collectionTitle: {
      de: 'Generalversammlung 2024',
      en: 'Generalversammlung 2024',
    },
  },
  {
    url: '/gallery/gallery-02-apero-vorstand.jpg',
    year: 2024,
    caption: {
      de: 'Gemütlicher Apéro & Beisammensein der Supporter-Vereinigung FC Meilen',
      en: 'Gemütlicher Apéro & Beisammensein der Supporter-Vereinigung FC Meilen',
    },
    collectionTitle: {
      de: 'Supporter FC Meilen',
      en: 'Supporter FC Meilen',
    },
  },
  {
    url: '/gallery/gallery-03-geschenkuebergabe.jpg',
    year: 2024,
    caption: {
      de: 'Dank & Würdigung: Geschenkübergabe an den langjährigen Präsidenten Pascal Golay',
      en: 'Dank & Würdigung: Geschenkübergabe an den langjährigen Präsidenten Pascal Golay',
    },
    collectionTitle: {
      de: 'Würdigung & Dank',
      en: 'Würdigung & Dank',
    },
  },
  {
    url: '/gallery/gallery-04-vorstandssitzung.jpg',
    year: 2024,
    caption: {
      de: 'Vorstandssitzung auf der Allmend – Weichenstellung für die Zukunft',
      en: 'Vorstandssitzung auf der Allmend – Weichenstellung für die Zukunft',
    },
    collectionTitle: {
      de: 'Vereinsarbeit',
      en: 'Vereinsarbeit',
    },
  },
  {
    url: '/gallery/gallery-05-vereinsessen-allmend.jpg',
    year: 2024,
    caption: {
      de: 'Gemütliches Nachtessen im Clubhaus auf der Allmend Meilen',
      en: 'Gemütliches Nachtessen im Clubhaus auf der Allmend Meilen',
    },
    collectionTitle: {
      de: 'Clubhaus Allmend',
      en: 'Clubhaus Allmend',
    },
  },
];

