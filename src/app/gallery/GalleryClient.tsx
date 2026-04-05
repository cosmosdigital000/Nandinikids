"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GALLERY_ALBUMS, type GalleryAlbum } from "@/config/gallery";
import { landingImage as lp } from "@/lib/landingMedia";

function AlbumPreview({ album }: { album: GalleryAlbum }) {
  const thumbs = album.images.slice(0, 4);
  if (thumbs.length === 1) {
    return (
      <img
        src={lp(thumbs[0])}
        alt=""
        style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 4,
        height: "200px",
      }}
    >
      {[0, 1, 2, 3].map((i) => {
        const file = thumbs[i];
        if (!file) {
          return (
            <div
              key={i}
              style={{ background: "linear-gradient(135deg, #f0f0f0, #e8e8e8)", minHeight: 0 }}
            />
          );
        }
        return (
          <img
            key={file + i}
            src={lp(file)}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        );
      })}
    </div>
  );
}

export default function GalleryClient() {
  const [openAlbum, setOpenAlbum] = useState<GalleryAlbum | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => {
    setOpenAlbum(null);
    setIndex(0);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!openAlbum) return;
      const n = openAlbum.images.length;
      setIndex((i) => (i + dir + n) % n);
    },
    [openAlbum]
  );

  useEffect(() => {
    if (!openAlbum) return;
    setIndex(0);
  }, [openAlbum]);

  useEffect(() => {
    if (!openAlbum) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openAlbum, close, go]);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 66px)",
        padding: "48px 0 80px",
        background: "linear-gradient(135deg, #E6E6FA 0%, #F0F8FF 50%, #FFF8DC 100%)",
      }}
    >
      <div className="max-w-6xl px-5" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <nav style={{ marginBottom: "28px" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#1A5E7A",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </Link>
        </nav>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            className="badge"
            style={{ display: "inline-block", marginBottom: "12px" }}
          >
            Photo gallery
          </div>
          <h1
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: "clamp(1.85rem, 4vw, 2.6rem)",
              color: "#2C1810",
              margin: "0 0 12px",
            }}
          >
            Activities & celebrations
          </h1>
          <p style={{ color: "#555", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
            Har activity ke photos alag album mein hain. Album par click karke saari images carousel
            mein dekhein.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ALBUMS.map((album) => (
            <button
              key={album.id}
              type="button"
              onClick={() => setOpenAlbum(album)}
              className="card p-0 overflow-hidden"
              style={{
                background: "white",
                border: "1px solid rgba(44, 24, 16, 0.07)",
                borderRadius: "20px",
                cursor: "pointer",
                textAlign: "center",
                padding: 0,
                font: "inherit",
              }}
            >
              <AlbumPreview album={album} />
              <div className="p-4" style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#2C1810",
                    marginBottom: "6px",
                  }}
                >
                  {album.title}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "8px" }}>
                  {album.description}
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#8A2BE2" }}>
                  {album.images.length} photo{album.images.length === 1 ? "" : "s"} — tap to view
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openAlbum && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${openAlbum.title} photos`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>

          <div
            style={{
              maxWidth: "min(960px, 100%)",
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                fontFamily: "'Baloo 2', cursive",
                color: "#fff",
                fontSize: "1.15rem",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {openAlbum.title}
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {openAlbum.images.length > 1 && (
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => go(-1)}
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                  }}
                >
                  ‹
                </button>
              )}

              <img
                src={lp(openAlbum.images[index])}
                alt={`${openAlbum.title} — ${index + 1} of ${openAlbum.images.length}`}
                style={{
                  maxHeight: "min(72vh, 640px)",
                  maxWidth: "100%",
                  flex: "1 1 280px",
                  objectFit: "contain",
                  borderRadius: 12,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              />

              {openAlbum.images.length > 1 && (
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => go(1)}
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                  }}
                >
                  ›
                </button>
              )}
            </div>

            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", fontWeight: 600 }}>
              {openAlbum.images.length > 1 ? `${index + 1} / ${openAlbum.images.length}` : "1 photo"}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
