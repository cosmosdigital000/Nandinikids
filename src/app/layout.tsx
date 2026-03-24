import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Nandini Kids 'N' Academy – English Medium School | Dehri, Rohtas, Bihar",
  description:
    "Nandini Kids 'N' Academy – Trusted English-medium school in Dehri, Rohtas, Bihar. Nursery to Class V. Admissions open 2025-26. Computer Lab, Library, Safe Campus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, paddingTop: 66, fontFamily: "'Poppins', sans-serif", background: "#FAFFFE" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
