import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Nandini Kids 'N' Academy",
  description:
    "Photos from school activities and celebrations at Nandini Kids 'N' Academy — Annual Day, festivals, and more.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
