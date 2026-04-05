/**
 * Activity-wise gallery albums. Filenames live under `public/landingpage/`.
 * Add more strings to `images` for the same activity (e.g. four Annual Day shots).
 */
export type GalleryAlbum = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "annual-day",
    title: "Annual Day",
    description: "Cultural programs mein bacche",
    images: ["annuals day nandini kids.jpg"],
  },
  {
    id: "academic-success",
    title: "Academic Success",
    description: "Celebrations & milestones",
    images: ["Academic Success celebration nandini kids Dalmiyanagar.jpg"],
  },
  {
    id: "christmas",
    title: "Christmas",
    description: "Festive celebrations",
    images: ["Christmas celebration nandini kids Dalmiyanagar.jpg"],
  },
  {
    id: "janmashtami-dandiya",
    title: "Janmashtami & Dandiya",
    description: "Traditional festivities",
    images: ["Dandiya and KrishnaJanmashtami Celebration nandini kids Dalmiyanagar.jpg"],
  },
  {
    id: "holi",
    title: "Holi",
    description: "Rang aur khushi",
    images: ["Holi celebration nandini kids Dalmiyanagar.jpg"],
  },
  {
    id: "saraswati-puja",
    title: "Saraswati Puja",
    description: "Blessings for learning",
    images: ["saraswati pooja celebration nandini kids Dalmiyanagar.jpg"],
  },
];
