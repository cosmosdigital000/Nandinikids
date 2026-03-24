"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { landingImage } from "@/lib/landingMedia";

const NAV_H = 66; // navbar height in px — keep in sync with CSS
const LOGO_SRC = landingImage("logo nandinikids.jpg");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleSectionClick = (hash: string) => (e: React.MouseEvent) => {
    if (!isHome) {
      setMenuOpen(false);
      return;
    }
    const el = document.querySelector(hash);
    if (el) {
      e.preventDefault();
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_H;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Items: label, section hash OR page path
  const items: { label: string; hash?: string; page?: string; cta?: boolean }[] = [
    { label: "About Us",              hash: "#about" },
    { label: "Infrastructure",        hash: "#infrastructure" },
    { label: "Gallery",               hash: "#gallery" },
    { label: "Admission",             hash: "#admission", cta: true },
    { label: "Notice Board",          page: "/notice-board" },
    { label: "Mandatory Disclosure",  page: "/mandatory-disclosure" },
    { label: "Contact Us",            hash: "#location" },
  ];

  return (
    <>
      <style>{`
        #nk-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 800;
          height: ${NAV_H}px;
          background: #fff;
          border-bottom: 2px solid ${scrolled ? "#B8E8F5" : "transparent"};
          box-shadow: ${scrolled ? "0 2px 18px rgba(0,0,0,.09)" : "none"};
          transition: box-shadow .25s, border-color .25s;
          display: flex; align-items: center; padding: 0 20px;
        }
        .nk-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .nk-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nk-logo-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg,#4FC3D8,#52C9A8);
          display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
          flex-shrink: 0;
        }
        .nk-logo-text { line-height: 1.15; }
        .nk-logo-name { font-family:'Baloo 2',cursive; font-size: .97rem; font-weight: 800; color: #1A5E7A; display: block; }
        .nk-logo-sub  { font-size: .62rem; color: #888; font-weight: 600; letter-spacing:.03em; display: block; }
        .nk-links { display: flex; align-items: center; gap: 2px; flex-wrap: nowrap; }
        .nk-link {
          padding: 6px 11px; border-radius: 8px; font-size: .8rem; font-weight: 600;
          color: #444; text-decoration: none; white-space: nowrap;
          transition: color .18s, background .18s;
          font-family: 'Poppins', sans-serif;
        }
        .nk-link:hover { color: #1A5E7A; background: #E4F8FD; }
        .nk-link-active { color: #1A5E7A; background: #E4F8FD; }
        .nk-cta {
          padding: 8px 16px; border-radius: 22px;
          background: linear-gradient(135deg,#FF9944,#E06800); color: #fff !important;
          font-size: .8rem; font-weight: 700; text-decoration: none; white-space: nowrap;
          box-shadow: 0 3px 10px rgba(255,153,68,.3); transition: transform .18s, box-shadow .18s;
          font-family: 'Baloo 2', cursive;
        }
        .nk-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(255,153,68,.4); }
        .nk-burger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          padding: 6px; background: none; border: none; flex-shrink: 0;
        }
        .nk-burger span { display: block; width: 24px; height: 2.5px; background: #333; border-radius: 2px; transition: all .3s; }
        .nk-burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
        .nk-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nk-burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
        /* Mobile drawer */
        .nk-drawer {
          position: fixed; top: ${NAV_H}px; left: 0; right: 0;
          background: #fff; box-shadow: 0 8px 24px rgba(0,0,0,.1);
          z-index: 799; padding: 12px 16px 20px;
          transform: translateY(-110%); transition: transform .28s ease;
          border-top: 2px solid #E4F8FD;
        }
        .nk-drawer.open { transform: translateY(0); }
        .nk-mobile-link {
          display: block; padding: 12px 14px; border-radius: 10px;
          font-size: .9rem; font-weight: 600; color: #444; text-decoration: none;
          transition: background .18s, color .18s; font-family: 'Poppins', sans-serif;
          border-bottom: 1px solid #f0f0f0;
        }
        .nk-mobile-link:last-child { border-bottom: none; }
        .nk-mobile-link:hover { background: #E4F8FD; color: #1A5E7A; }
        .nk-mobile-link-active { background: #E4F8FD; color: #1A5E7A; }
        .nk-mobile-cta {
          display: block; margin-top: 10px; padding: 13px; border-radius: 22px; text-align: center;
          background: linear-gradient(135deg,#FF9944,#E06800); color: #fff;
          font-size: .92rem; font-weight: 700; text-decoration: none;
          font-family: 'Baloo 2', cursive;
        }
        @media (max-width: 1024px) { .nk-links { display: none; } .nk-burger { display: flex; } }
        @media (min-width: 1025px) { .nk-drawer { display: none !important; } }
      `}</style>

      <nav id="nk-nav">
        <div className="nk-inner">
          {/* Logo */}
          <Link href="/" className="nk-logo">
            <div className="nk-logo-icon" style={{ padding: 0, overflow: "hidden", background: "#fff" }}>
              <img src={LOGO_SRC} alt="Nandini Kids Academy" width={42} height={42} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="nk-logo-text">
              <span className="nk-logo-name">Nandini Kids &apos;N&apos; Academy</span>
              <span className="nk-logo-sub">Ward No. 5, Dehri · Rohtas, Bihar · Est. 2010</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nk-links">
            {items.map(item => {
              if (item.page) {
                const active = pathname === item.page;
                return (
                  <Link key={item.label} href={item.page}
                    className={`nk-link${active ? " nk-link-active" : ""}`}
                    onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                );
              }
              const href = isHome ? item.hash! : `/${item.hash}`;
              return (
                <a key={item.label} href={href}
                  className={item.cta ? "nk-cta" : "nk-link"}
                  onClick={isHome ? handleSectionClick(item.hash!) : () => setMenuOpen(false)}>
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Hamburger */}
          <button className={`nk-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nk-drawer${menuOpen ? " open" : ""}`}>
        {items.map(item => {
          if (item.page) {
            const active = pathname === item.page;
            return (
              <Link key={item.label} href={item.page}
                className={`nk-mobile-link${active ? " nk-mobile-link-active" : ""}${item.cta ? " nk-mobile-cta" : ""}`}
                onClick={() => setMenuOpen(false)}>
                {item.cta ? "🎒 " : ""}{item.label}
              </Link>
            );
          }
          const href = isHome ? item.hash! : `/${item.hash}`;
          return (
            <a key={item.label} href={href}
              className={item.cta ? "nk-mobile-cta" : "nk-mobile-link"}
              onClick={isHome ? handleSectionClick(item.hash!) : () => setMenuOpen(false)}>
              {item.cta ? "🎒 " : ""}{item.label}
            </a>
          );
        })}
      </div>

      {/* Overlay to close menu */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 798, background: "rgba(0,0,0,.25)" }} />
      )}
    </>
  );
}

