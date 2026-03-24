"use client";
import Head from "next/head";
import { useEffect, useState, useRef, useCallback } from "react";
import { telHref, waWithText, phoneDisplay } from "@/config/contact";
import { landingImage as lp } from "@/lib/landingMedia";

const GALLERY_PHOTOS: { file: string; label: string; desc: string }[] = [
  { file: "annuals day nandini kids.jpg", label: "Annual Day", desc: "Cultural programs mein bacche" },
  { file: "Academic Success celebration nandini kids Dalmiyanagar.jpg", label: "Academic Success", desc: "Celebrations & milestones" },
  { file: "Christmas celebration nandini kids Dalmiyanagar.jpg", label: "Christmas", desc: "Festive celebrations" },
  { file: "Dandiya and KrishnaJanmashtami Celebration nandini kids Dalmiyanagar.jpg", label: "Janmashtami & Dandiya", desc: "Traditional festivities" },
  { file: "Holi celebration nandini kids Dalmiyanagar.jpg", label: "Holi", desc: "Rang aur khushi" },
  { file: "saraswati pooja celebration nandini kids Dalmiyanagar.jpg", label: "Saraswati Puja", desc: "Blessings for learning" },
];

export default function NandiniKidsAcademy() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [backgroundMusicStarted, setBackgroundMusicStarted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phoneNumber: '',
    childClass: ''
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

  // Encoded URLs — spaces in filenames break requests unless encoded
  const BG_MUSIC_SRC = "/music/backgound%20music.mp3";
  const BELL_CTA_SRC = "/music/bellsound%20scroll.mp3";

  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  const bgMusicStartedRef = useRef(false);

  soundEnabledRef.current = soundEnabled;

  /** Bell MP3 on CTA clicks only (not on scroll). */
  const playCtaBell = useCallback(() => {
    if (!soundEnabledRef.current) return;
    const a = new Audio(BELL_CTA_SRC);
    a.volume = 0.55;
    a.play().catch(() => {});
  }, []);

  const playCtaBellRef = useRef(playCtaBell);
  playCtaBellRef.current = playCtaBell;

  // Create background music once; loop until muted via icon
  useEffect(() => {
    const bg = new Audio(BG_MUSIC_SRC);
    bg.loop = true;
    bg.preload = "auto";
    bg.volume = 0.35;
    backgroundMusicRef.current = bg;

    return () => {
      bg.pause();
      backgroundMusicRef.current = null;
    };
  }, []);

  // Mute / unmute: only touch background after user has started it once
  useEffect(() => {
    const bg = backgroundMusicRef.current;
    if (!bg || !bgMusicStartedRef.current) return;
    if (soundEnabled) {
      bg.play().catch(() => {});
    } else {
      bg.pause();
    }
  }, [soundEnabled]);

  // Enhanced Sound functions using Web Audio API
  const playSound = (type: string) => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
      case 'cheer':
        // Happy cheer sound for form submission
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case 'owl':
        // Owl hoot sound
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
      case 'chirp':
        // Parrot chirp sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case 'welcome':
        // Welcome jingle when page loads
        const frequencies = [523, 659, 784, 1047]; // C-E-G-C chord
        frequencies.forEach((freq, index) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);
          gain.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.5);
          osc.start(audioContext.currentTime + index * 0.1);
          osc.stop(audioContext.currentTime + index * 0.1 + 0.5);
        });
        break;
      case 'giggle':
        // Kids giggle sound
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.05);
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
    }
  };

  // Play welcome jingle when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (soundEnabled) {
        playSound('welcome');
      }
    }, 1000); // Play after 1 second

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onAnchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        playCtaBellRef.current();
      }
    };

    const anchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]:not(.nk-link):not(.nk-cta):not(.nk-mobile-link):not(.nk-mobile-cta)'
    );
    anchors.forEach((el) => el.addEventListener("click", onAnchorClick));

    const onScrollStartBg = () => {
      if (bgMusicStartedRef.current || !soundEnabledRef.current) return;
      const bg = backgroundMusicRef.current;
      if (!bg) return;
      bgMusicStartedRef.current = true;
      setBackgroundMusicStarted(true);
      bg.play().catch(() => {});
    };

    window.addEventListener("scroll", onScrollStartBg, { passive: true });
    window.addEventListener("wheel", onScrollStartBg, { passive: true });
    window.addEventListener("touchmove", onScrollStartBg, { passive: true });

    const reveals = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    reveals.forEach((r) => obs.observe(r));

    return () => {
      anchors.forEach((el) => el.removeEventListener("click", onAnchorClick));
      obs.disconnect();
      window.removeEventListener("scroll", onScrollStartBg);
      window.removeEventListener("wheel", onScrollStartBg);
      window.removeEventListener("touchmove", onScrollStartBg);
    };
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <>
      <Head>
        <title>Nandini Kids 'N' Academy – Dalmiyanagar, Rohtas, Bihar | Best English Medium School</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Best English medium school in Dalmiyanagar, Rohtas, Bihar. Safe, caring environment for Nursery to Class 5. Admissions Open!" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        section[id], footer[id] {
          scroll-margin-top: 76px;
        }

        /* Color Variables - Blazingly Colorful Theme */
        :root {
          --pink: #FF1493;
          --purple: #8A2BE2;
          --yellow: #FFD700;
          --mint: #00FA9A;
          --sky: #00BFFF;
          --orange: #FF4500;
          --red: #FF6347;
          --green: #32CD32;
          --cream: #FFFAF0;
          --ink: #2C1810;
        }

        /* Reset & Base */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: var(--cream);
          color: #2C1810;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* Typography */
        h1, h2, h3, .brand { font-family: 'Baloo 2', cursive; }
        .nunito { font-family: 'Nunito', sans-serif; }

        /* Buttons */
        .btn-candy {
          display: inline-block;
          background: linear-gradient(135deg, var(--pink), var(--purple));
          color: #fff;
          font-weight: 700;
          border-radius: 50px;
          padding: 16px 32px;
          font-size: 1rem;
          box-shadow: 0 8px 32px rgba(255, 20, 147, 0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn-candy:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 16px 40px rgba(255, 20, 147, 0.6);
        }

        .btn-candy:active {
          transform: translateY(-2px) scale(1.02);
        }

        .btn-ghost {
          display: inline-block;
          border: 3px solid var(--ink);
          color: #2C1810;
          font-weight: 700;
          border-radius: 50px;
          padding: 14px 28px;
          font-size: 1rem;
          background: transparent;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
        }

        .btn-ghost:hover {
          background: var(--ink);
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(44, 24, 16, 0.3);
        }

        /* Cards & Components */
        .card {
          background: #fff;
          border-radius: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-12px) rotate(1deg);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
        }

        .pill {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #FFF0FF, #F0F8FF);
          border: 3px solid var(--purple);
          border-radius: 50px;
          padding: 8px 20px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #8A2BE2;
          letter-spacing: 0.05em;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes walk {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }

        @keyframes peek {
          0%, 100% { transform: translateX(-60px); }
          50% { transform: translateX(0px); }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        .float { animation: float 4s ease-in-out infinite; }
        .float2 { animation: float2 5s ease-in-out infinite; }
        .wiggle { animation: wiggle 3s ease-in-out infinite; }
        .bounce { animation: bounce 2s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 25s linear infinite; }
        .walk { animation: walk 15s linear infinite; }
        .peek { animation: peek 6s ease-in-out infinite; }
        .wave { animation: wave 2s ease-in-out infinite; }

        /* Animal Mascots */
        .owl-mascot {
          position: fixed;
          top: 20%;
          right: 20px;
          font-size: 3rem;
          z-index: 150;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .owl-mascot:hover {
          transform: scale(1.2);
        }


        .parrot-mascot {
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 2rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .parrot-mascot:hover {
          transform: scale(1.1);
        }

        .butterfly-mascot {
          position: absolute;
          font-size: 2rem;
          z-index: 50;
        }

        .walking-animal {
          position: fixed;
          bottom: 100px;
          font-size: 2rem;
          z-index: 50;
        }

        /* Sound Toggle - More Prominent and Above Navbar */
        .sound-toggle {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 400;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border: 3px solid #FF6347;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 1.8rem;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .sound-toggle:hover {
          transform: scale(1.2);
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.8);
        }

        .sound-toggle:active {
          transform: scale(0.95);
        }

        .music-indicator {
          position: fixed;
          top: 150px;
          right: 20px;
          z-index: 350;
          background: linear-gradient(135deg, #FF1493, #8A2BE2);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(255, 20, 147, 0.4);
          animation: musicPulse 1.5s ease-in-out infinite;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .music-indicator.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes musicPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Sticky Bottom Bar */
        .sticky-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: linear-gradient(135deg, var(--pink), var(--purple));
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        /* Reveal Animation */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Utility Classes */
        .flex { display: flex; }
        .flex-wrap { flex-wrap: wrap; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .gap-4 { gap: 16px; }
        .gap-5 { gap: 20px; }
        .gap-6 { gap: 24px; }
        .gap-8 { gap: 32px; }
        .gap-10 { gap: 40px; }
        .gap-12 { gap: 48px; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .mb-4 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 32px; }
        .mb-12 { margin-bottom: 48px; }
        .mt-8 { margin-top: 32px; }
        .p-6 { padding: 24px; }
        .p-8 { padding: 32px; }
        .px-5 { padding-left: 20px; padding-right: 20px; }
        .py-3 { padding-top: 12px; padding-bottom: 12px; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .hidden { display: none; }
        .text-center { text-align: center; }
        .max-w-6xl { max-width: 72rem; margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        .overflow-hidden { overflow: hidden; }

        /* Responsive */
        @media (min-width: 768px) {
          .md\\:flex { display: flex; }
          .md\\:hidden { display: none; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          .md\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
          .md\\:text-left { text-align: left; }
        }

        /* Responsive GIF Animations */
        @media (max-width: 768px) {
          .hero-monkey {
            width: 400px !important;
            height: 400px !important;
            top: 8% !important;
            left: 1% !important;
          }
          
          .section-kid-running {
            width: 180px !important;
            height: 180px !important;
            top: 5% !important;
            right: 2% !important;
          }
          
          .section-horse {
            width: 150px !important;
            height: 150px !important;
            top: 15% !important;
            right: 5% !important;
          }
          
          .faq-monkey {
            width: 100px !important;
            height: 100px !important;
            bottom: 10% !important;
            left: 2% !important;
          }
        }

        @media (max-width: 480px) {
          .hero-monkey {
            width: 280px !important;
            height: 280px !important;
            top: 5% !important;
            left: 0% !important;
          }
          
          .section-kid-running {
            width: 100px !important;
            height: 100px !important;
            top: 3% !important;
            right: 1% !important;
          }
          
          .section-horse {
            width: 80px !important;
            height: 80px !important;
            top: 10% !important;
            right: 3% !important;
          }
          
          .faq-monkey {
            width: 60px !important;
            height: 60px !important;
            bottom: 5% !important;
            left: 1% !important;
          }
        }

        /* FAQ Accordion */
        .accordion {
          border: none;
          background: #fff;
          border-radius: 20px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .accordion:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .accordion-header {
          width: 100%;
          padding: 20px 24px;
          background: none;
          border: none;
          text-align: left;
          font-weight: 700;
          font-size: 1rem;
          color: #2C1810;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .accordion-content {
          padding: 0 24px 20px;
          color: #666;
          line-height: 1.6;
        }

        .accordion-icon {
          transition: transform 0.3s ease;
        }

        .accordion.active .accordion-icon {
          transform: rotate(180deg);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .lightbox.active {
          opacity: 1;
          visibility: visible;
        }

        .lightbox img {
          max-width: 90%;
          max-height: 90%;
          border-radius: 16px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 2rem;
          color: white;
          cursor: pointer;
          background: none;
          border: none;
        }
      `}</style>

      {/* SOUND TOGGLE - Enhanced with Music Control */}
      <button 
        className="sound-toggle" 
        onClick={() => {
          const newSoundState = !soundEnabled;
          setSoundEnabled(newSoundState);
          
          if (backgroundMusicRef.current) {
            if (newSoundState && bgMusicStartedRef.current) {
              backgroundMusicRef.current.play().catch(() => {});
            } else {
              backgroundMusicRef.current.pause();
            }
          }
          
          // Play a confirmation sound when enabling
          if (newSoundState) {
            setTimeout(() => playCtaBell(), 100);
          }
        }}
        onMouseEnter={() => playSound('chirp')}
        title={soundEnabled ? "🔊 Click to mute all sounds & music" : "🔇 Click to enable sounds & music"}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>

      {/* MUSIC INDICATOR */}
      <div className={`music-indicator ${soundEnabled && backgroundMusicStarted ? 'active' : ''}`}>
        🎵 Background Music Playing
      </div>

      {/* ANIMATED MASCOTS */}
      <div 
        className="owl-mascot float" 
        onClick={() => playSound('owl')} 
        onMouseEnter={() => playSound('chirp')}
        title="🦉 Hoot! Click me!"
      >
        🦉
      </div>


      {/* STICKY BOTTOM CTA BAR */}
      <div className="sticky-bar">
        <a 
          href={telHref} 
          className="btn-candy" 
          style={{padding:"12px 20px", fontSize:"0.9rem", background:"white", color:"#8A2BE2"}}
          onClick={() => playCtaBell()}
        >
          📞 Call Now
        </a>
        <a 
          href={waWithText("Hello! I would like to know more about Nandini Kids Academy.")} 
          className="btn-candy" 
          style={{padding:"12px 20px", fontSize:"0.9rem", background:"#25D366", color:"white"}}
          onClick={() => playCtaBell()}
        >
          💬 WhatsApp
        </a>
        <a 
          href="#enquiry" 
          className="btn-ghost" 
          style={{borderColor:"white", color:"white", padding:"12px 20px", fontSize:"0.9rem"}}
          onClick={() => playCtaBell()}
        >
          📋 Enquire
        </a>
      </div>

      {/* 1. HERO SECTION */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "60px",
        paddingBottom: "40px",
        background: "linear-gradient(135deg, #FF69B4 0%, #FFD700 25%, #00FA9A 50%, #00BFFF 75%, #FF4500 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Elements */}
        <div className="butterfly-mascot float" style={{top: "10%", left: "10%"}}>🦋</div>
        <div className="butterfly-mascot float2" style={{top: "20%", right: "15%"}}>🦋</div>
        
        {/* Animated GIF: Monkey swinging - COVERS ENTIRE WIDTH */}
        <img 
          src={lp("monkey swinging through a vine.gif")} 
          alt="Monkey swinging" 
          className="float hero-monkey" 
          style={{
            position: "absolute", 
            top: "10%", 
            left: "2%", 
            width: "600px", 
            height: "600px", 
            opacity: 0.8,
            zIndex: 15
          }} 
        />
        
        
        <div className="spin-slow" style={{position: "absolute", top: "5%", right: "5%", fontSize: "4rem", opacity: 0.3}}>⭐</div>
        <div className="spin-slow" style={{position: "absolute", bottom: "10%", left: "5%", fontSize: "3rem", opacity: 0.3, animationDirection: "reverse"}}>🌟</div>

        <div className="max-w-6xl px-5 w-full" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge">
                🏫 Dalmiyanagar's Most Trusted School
              </div>
              <h1 style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1.1,
                color: "white",
                marginBottom: "24px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}>
                A Safe, Caring & English-Medium School for Your Child's 
                <span style={{
                  background: "linear-gradient(135deg, #FFD700, #FF4500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}> Bright Future</span> ✨
              </h1>
              <p style={{
                fontSize: "1.2rem",
                color: "white",
                lineHeight: 1.7,
                marginBottom: "20px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}>
                Admissions Open for Nursery to Class 5 | Limited Seats
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  {bg: "#FFE4E1", color: "#8B0000", text: "Secured Environment"},
                  {bg: "#E0FFFF", color: "#006400", text: "6+ Years Experience"},
                  {bg: "#FFF8DC", color: "#B8860B", text: "100% Parents satisfaction"}
                ].map(({bg, color, text}) => (
                  <span key={text} className="pill" style={{background: bg, color: color}}>{text}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="#admission" 
                  className="btn-candy" 
                  onClick={() => {playCtaBell(); /* Trigger animal wave animation */}}
                >
                  ✅ Book a School Visit
                </a>
                <a 
                  href={telHref} 
                  className="btn-ghost" 
                  style={{borderColor: "white", color: "white"}}
                  onClick={() => playCtaBell()}
                >
                  ✅ Call Now
                </a>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                padding: "12px",
                textAlign: "center",
                border: "3px solid #8A2BE2",
                overflow: "hidden"
              }}>
                <img
                  src={lp("nandini real school photo.jpeg")}
                  alt="Students and teachers at Nandini Kids Academy"
                  style={{
                    width: "100%",
                    maxHeight: "280px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    display: "block"
                  }}
                />
                <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "10px", fontWeight: 600 }}>
                  Hamare school ka asli nazara — bacche aur teachers saath mein
                </div>
              </div>
            </div>

            {/* Animated Owl Mascot */}
            <div className="relative flex justify-center" style={{minHeight: "400px", alignItems: "center"}}>
              <div 
                className="owl-mascot float" 
                style={{position: "relative", fontSize: "8rem"}} 
                onClick={() => playSound('owl')}
                onMouseEnter={() => playSound('giggle')}
                title="🦉 Click me for owl sounds!"
              >
                🦉
              </div>
              <div className="absolute wave" style={{top: "10px", right: "10px", fontSize: "2rem"}}>
                👋
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PARENTS CHOOSE US */}
      <section style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #FFE4E1 0%, #F0FFFF 50%, #F5FFFA 100%)",
        position: "relative"
      }} className="reveal">
        
        {/* Animated GIF: Kid running to school - MOVED to horse position with 2x size */}
        <img 
          src={lp("kid going school running..gif")} 
          alt="Kid running to school" 
          className="bounce section-kid-running" 
          style={{
            position: "absolute", 
            top: "10%", 
            right: "5%", 
            width: "340px", 
            height: "340px", 
            opacity: 0.9,
            zIndex: 15
          }} 
        />
        
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">👩‍🏫 Why Parents Choose Us</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              School Aisa jahan Bache Khud daud ke aana chahe
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👩‍🏫",
                title: "Experienced & caring teachers",
                desc: "13 dedicated teachers jo bachon ko samjhate hain pyaar se",
                bg: "linear-gradient(135deg, #FFE4E1, #FFC0CB)"
              },
              {
                icon: "📚",
                title: "Strong academic foundation",
                desc: "English medium mein strong base banate hain hum",
                bg: "linear-gradient(135deg, #E0FFFF, #B0E0E6)"
              },
              {
                icon: "🛡️",
                title: "Safe campus & CCTV",
                desc: "24/7 CCTV aur secure boundary wall - tension free rahiye",
                bg: "linear-gradient(135deg, #F5FFFA, #98FB98)"
              },
              {
                icon: "🚌",
                title: "Transport facility",
                desc: "Door to door safe transport - aane jaane ki koi problem nahi",
                bg: "linear-gradient(135deg, #FFF8DC, #F0E68C)"
              },
              {
                icon: "🗣️",
                title: "Focus on spoken English",
                desc: "Bachhe English mein confidently baat kar sakte hain",
                bg: "linear-gradient(135deg, #E6E6FA, #DDA0DD)"
              },
              {
                icon: "🎨",
                title: "Activity-based learning",
                desc: "Khel khel mein seekhte hain - boring nahi, fun hai!",
                bg: "linear-gradient(135deg, #FFEFD5, #FFE4B5)"
              }
            ].map(({icon, title, desc, bg}) => (
              <div key={title} className="card p-8" style={{background: bg, border: "3px solid white"}}>
                <div style={{fontSize: "3rem", marginBottom: "16px", textAlign: "center"}}>{icon}</div>
                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "12px",
                  textAlign: "center"
                }}>
                  {title}
                </h3>
                <p style={{
                  color: "#555",
                  lineHeight: 1.6,
                  textAlign: "center",
                  fontSize: "0.95rem"
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE SCHOOL */}
      <section id="about" style={{
        padding: "80px 0",
        background: "#fff",
        position: "relative"
      }} className="reveal">
        
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge">🧒 About the School</div>
              <h2 style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "#2C1810",
                marginBottom: "24px",
                lineHeight: 1.2
              }}>
                Hamara School - Aapke Bachon Ka Dusra Ghar Hai🏡
              </h2>
              
              <div style={{
                background: "linear-gradient(135deg, #FFF0F5, #F0F8FF)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "24px",
                border: "3px solid #FF1493"
              }}>
                <p style={{
                  fontSize: "1.1rem",
                  color: "#444",
                  lineHeight: 1.7,
                  fontStyle: "italic"
                }}>
                  "Hum sirf padhaate nahi hain, bachon ko sanskaar bhi dete hain. 
                  Yahan har bachha special hai, har bachha star hai. 
                  English medium mein quality education ke saath-saath 
                  Indian values bhi sikhate hain."
                </p>
                <div style={{
                  textAlign: "right",
                  marginTop: "16px",
                  fontWeight: 700,
                  color: "#8A2BE2"
                }}>
                  — Principal, Nandini Kids Academy
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                padding: "12px",
                textAlign: "center",
                border: "3px solid #00FA9A",
                overflow: "hidden"
              }}>
                <img
                  src={lp("teacher community group.jpg")}
                  alt="Nandini Kids Academy teachers and staff"
                  style={{
                    width: "100%",
                    maxHeight: "260px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    display: "block"
                  }}
                />
                <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "12px", fontWeight: 600 }}>
                  Hamari dedicated teacher community — Bachon ka dusra parivaar
                </div>
              </div>
            </div>

            <div>
              <div style={{
                background: "linear-gradient(135deg, #FFD700, #FF4500)",
                borderRadius: "32px",
                padding: "32px",
                color: "white",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)",
                  backgroundSize: "20px 20px"
                }}></div>
                
                <div style={{fontSize: "4rem", marginBottom: "16px"}} className="bounce">🎓</div>
                <h3 style={{fontSize: "1.8rem", marginBottom: "16px", fontWeight: 800}}>
Our Achivements 
                </h3>
                <p style={{fontSize: "1.1rem", marginBottom: "20px", opacity: 0.9}}>
                  2019 se lekar aaj tak  bachon ko successful banaya hai
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    {number: "1000+", label: "Happy Students"},
                    {number: "100%", label: "Parent Satisfaction"},
                    {number: "6+", label: "Years Experience"},
                    {number: "13", label: "Expert Teachers"}
                  ].map(({number, label}) => (
                    <div key={label} style={{
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "16px",
                      padding: "16px 8px"
                    }}>
                      <div style={{fontSize: "1.5rem", fontWeight: 800}}>{number}</div>
                      <div style={{fontSize: "0.8rem", opacity: 0.9}}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL SCHOOL LIFE (Photo/Video Section) */}
      <section id="gallery" style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #E6E6FA 0%, #F0F8FF 50%, #FFF8DC 100%)",
        position: "relative"
      }} className="reveal">
        {/* Animated GIF: Toy horse moving - MOVED HERE with good size */}
        <img 
          src={lp("kids toy horse moving..gif")} 
          alt="Kids toy horse moving" 
          className="float2 section-horse" 
          style={{
            position: "absolute", 
            top: "20%", 
            right: "8%", 
            width: "250px", 
            height: "250px", 
            opacity: 0.8,
            zIndex: 15
          }} 
        />
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">📸 Real School Life</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
Enjoyment and Activitiesat NandiniKids            <p style={{color: "#666", fontSize: "1.1rem"}}>
              Real photos aur videos - koi fake nahi, sab genuine hai!
            </p>
          </div>

          {/* Photo grid — real campus & celebration photos */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {GALLERY_PHOTOS.map(({ file, label, desc }) => {
              const src = lp(file);
              return (
                <div
                  key={file}
                  className="card p-0 overflow-hidden"
                  style={{
                    background: "white",
                    cursor: "pointer",
                    border: "3px solid #8A2BE2",
                    borderRadius: "16px"
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxSrc(src);
                      setLightboxAlt(label);
                      setLightboxOpen(true);
                      playCtaBell();
                    }
                  }}
                  onClick={() => {
                    setLightboxSrc(src);
                    setLightboxAlt(label);
                    setLightboxOpen(true);
                    playCtaBell();
                  }}
                >
                  <img
                    src={src}
                    alt={label}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <div className="p-4">
                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#2C1810", marginBottom: "6px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#666", textAlign: "center" }}>
                      {desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Placeholder */}
          <div style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            textAlign: "center",
            border: "3px dashed #FF6347",
            marginBottom: "20px"
          }}>
            <div style={{fontSize: "5rem", marginBottom: "20px"}}>📹</div>
            <h3 style={{fontSize: "1.5rem", fontWeight: 700, color: "#2C1810", marginBottom: "12px"}}>
              School Walkthrough Video
            </h3>
            <p style={{color: "#666", fontSize: "1rem", marginBottom: "16px"}}>
              YouTube embed placeholder - Virtual tour of our campus
            </p>
            <div style={{
              background: "#f0f0f0",
              borderRadius: "12px",
              padding: "20px",
              fontSize: "0.9rem",
              color: "#888"
            }}>
              [YouTube Video Embed Here - School Tour]
            </div>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #FFD700, #FF4500)",
            borderRadius: "20px",
            padding: "20px",
            textAlign: "center",
            color: "white"
          }}>
            <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "6px" }}>
              📸 Photo pe click karke bada size mein dekho
            </div>
            <div style={{ fontSize: "0.95rem", opacity: 0.95 }}>
              Asli school moments — celebrations, learning aur khushi ke pal
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMICS & CURRICULUM */}
      <section style={{
        padding: "80px 0",
        background: "#fff",
        position: "relative"
      }} className="reveal">
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">🧠 Academics & Curriculum</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              English Medium Mein Strong Foundation 📚
            </h2>
            <p style={{color: "#666", fontSize: "1.1rem"}}>
              Nursery se Class 5 tak - har class mein quality education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div style={{
                background: "linear-gradient(135deg, #00FA9A, #00BFFF)",
                borderRadius: "24px",
                padding: "32px",
                color: "white",
                marginBottom: "24px"
              }}>
                <h3 style={{fontSize: "1.8rem", marginBottom: "20px", fontWeight: 800}}>
                  Classes Available 🎓
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"
                  ].map((cls) => (
                    <div key={cls} style={{
                      background: "rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: 700
                    }}>
                      {cls}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, #FFF0F5, #F0F8FF)",
                borderRadius: "20px",
                padding: "24px",
                border: "3px solid #8A2BE2"
              }}>
                <h4 style={{fontSize: "1.3rem", fontWeight: 700, color: "#2C1810", marginBottom: "16px"}}>
                  English Medium Explanation 🗣️
                </h4>
                <p style={{color: "#555", lineHeight: 1.7, fontSize: "1rem"}}>
                  Saare subjects English mein padhate hain, lekin Hindi bhi sikhate hain. 
                  Bachhe dono language mein comfortable ho jaate hain. 
                  Speaking, reading, writing - sab kuch English mein strong banate hain.
                </p>
              </div>
            </div>

            <div>
              <h3 style={{fontSize: "1.5rem", fontWeight: 700, color: "#2C1810", marginBottom: "24px"}}>
                Teaching Approach 👩‍🏫
              </h3>
              
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: "🎨",
                    title: "Activity-based learning",
                    desc: "Khel khel mein sikhaate hain - boring lectures nahi",
                    bg: "linear-gradient(135deg, #FFE4E1, #FFC0CB)"
                  },
                  {
                    icon: "📝",
                    title: "Regular tests",
                    desc: "Monthly tests se progress track karte hain",
                    bg: "linear-gradient(135deg, #E0FFFF, #B0E0E6)"
                  },
                  {
                    icon: "👥",
                    title: "Personal attention for every child",
                    desc: "Har bachhe ko individual attention milta hai",
                    bg: "linear-gradient(135deg, #F5FFFA, #98FB98)"
                  }
                ].map(({icon, title, desc, bg}) => (
                  <div key={title} style={{
                    background: bg,
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    border: "2px solid white"
                  }}>
                    <div style={{fontSize: "2.5rem"}}>{icon}</div>
                    <div>
                      <div style={{fontWeight: 700, fontSize: "1.1rem", color: "#2C1810", marginBottom: "4px"}}>
                        {title}
                      </div>
                      <div style={{color: "#555", fontSize: "0.95rem"}}>
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SAFETY & FACILITIES / INFRASTRUCTURE */}
      <section id="infrastructure" style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #F0FFF0 0%, #F5F5DC 50%, #FFF8DC 100%)",
        position: "relative"
      }} className="reveal">
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto 48px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "4px solid #98FB98",
              boxShadow: "0 8px 28px rgba(0,0,0,.08)"
            }}
          >
            <img
              src={lp("nandini real school photo.jpeg")}
              alt="Nandini Kids Academy campus and facilities"
              style={{ width: "100%", maxHeight: "340px", objectFit: "cover", display: "block" }}
            />
            <div style={{ background: "#fff", padding: "14px 18px", textAlign: "center", fontWeight: 700, color: "#2C1810" }}>
              🏫 Hamara campus — safe, clean aur bachon ke liye designed
            </div>
          </div>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">🛡️ Safety & Facilities</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              Mummy Ko Tension Nahi - Baccha Safe Hai Hamare Paas 🙏
            </h2>
            <p style={{color: "#666", fontSize: "1.1rem"}}>
              Safety = major conversion trigger for mothers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "📹",
                title: "CCTV surveillance (24/7)",
                desc: "Poore campus mein cameras - har corner safe hai",
                color: "#FF6347"
              },
              {
                icon: "👩‍🏫",
                title: "Female staff for small kids",
                desc: "Chhote bachon ke liye lady teachers available",
                color: "#FF1493"
              },
              {
                icon: "🚽",
                title: "Clean toilets",
                desc: "Separate boys aur girls toilets - hamesha clean",
                color: "#00BFFF"
              },
              {
                icon: "💧",
                title: "Safe drinking water",
                desc: "RO water - health ka pura khayal",
                color: "#00FA9A"
              },
              {
                icon: "🚌",
                title: "Transport tracking",
                desc: "Bus ki location parents ko pata rehti hai",
                color: "#FF4500"
              },
              {
                icon: "🏗️",
                title: "Pucca boundary wall",
                desc: "Strong wall - bahar se koi nahi aa sakta",
                color: "#8A2BE2"
              }
            ].map(({icon, title, desc, color}) => (
              <div key={title} className="card p-6" style={{
                background: "white",
                border: `3px solid ${color}`
              }}>
                <div className="flex items-center gap-4">
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    color: "white"
                  }}>
                    ✅
                  </div>
                  <div>
                    <div style={{
                      fontSize: "2rem",
                      marginBottom: "8px"
                    }}>
                      {icon}
                    </div>
                  </div>
                </div>
                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "8px",
                  marginTop: "16px"
                }}>
                  {title}
                </h3>
                <p style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: 1.6
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PARENT TESTIMONIALS */}
      <section id="testimonials" style={{
        padding: "80px 0",
        background: "#fff",
        position: "relative"
      }} className="reveal">
        <div 
          className="parrot-mascot float" 
          onClick={() => playSound('chirp')}
          onMouseEnter={() => playSound('giggle')}
          title="🦜 Click me for parrot sounds!"
        >
          🦜
        </div>
        
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">🗣️ Parent Testimonials</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              Dekho Kya Kehte Hain Dusre Parents 👨‍👩‍👧‍👦
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sunita Devi",
                quote: "Mere bacche ki English 6 mahine mein bahut improve hui. Teacher bahut caring hain aur daily update dete hain.",
                rating: 5,
                bg: "linear-gradient(135deg, #FFE4E1, #FFC0CB)"
              },
              {
                name: "Rajesh Kumar",
                quote: "Transport facility bahut achhi hai. Ghar se school tak safe delivery. CCTV se pura confidence hai.",
                rating: 5,
                bg: "linear-gradient(135deg, #E0FFFF, #B0E0E6)"
              },
              {
                name: "Priya Singh",
                quote: "Computer lab dekh kar bahut khushi hui. Baccha ghar aakar computer ke baare mein bolta rehta hai.",
                rating: 5,
                bg: "linear-gradient(135deg, #F5FFFA, #98FB98)"
              },
              {
                name: "Amit Sharma",
                quote: "Fees reasonable hai aur quality education mil rahi hai. Principal madam bahut supportive hain.",
                rating: 4,
                bg: "linear-gradient(135deg, #FFF8DC, #F0E68C)"
              },
              {
                name: "Kavita Kumari",
                quote: "Meri beti pehle shy thi, ab confident ho gayi hai. Speaking skills bahut develop hui hain.",
                rating: 5,
                bg: "linear-gradient(135deg, #E6E6FA, #DDA0DD)"
              }
            ].map(({name, quote, rating, bg}) => (
              <div key={name} className="card p-6" style={{background: bg, border: "3px solid white"}}>
                {/* Placeholder for parent photo */}
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  border: "3px dashed #8A2BE2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "2rem"
                }}>
                  👤
                </div>
                
                <div style={{textAlign: "center", marginBottom: "16px"}}>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{
                        color: i < rating ? "#FFD700" : "#ddd",
                        fontSize: "1.2rem"
                      }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <h4 style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#2C1810",
                    marginBottom: "4px"
                  }}>
                    {name}
                  </h4>
                </div>
                
                <p style={{
                  fontSize: "1rem",
                  color: "#444",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  textAlign: "center"
                }}>
                  "{quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ADMISSION PROCESS */}
      <section id="admission" style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #FFF0F5 0%, #F0F8FF 50%, #F5FFFA 100%)",
        position: "relative"
      }} className="reveal">
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">🎯 Admission Process</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              Sirf 4 Steps Mein Admission Complete! 🎉
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                step: 1,
                icon: "📞",
                title: "Call karo ya form bharo",
                desc: "Phone kar ke enquiry karo ya online form bharo",
                color: "#FF1493"
              },
              {
                step: 2,
                icon: "🏫",
                title: "School visit karo",
                desc: "Campus dekho, teachers se milo, facilities check karo",
                color: "#8A2BE2"
              },
              {
                step: 3,
                icon: "👦",
                title: "Bacche se baat karenge",
                desc: "Simple interaction - koi scary exam nahi",
                color: "#00FA9A"
              },
              {
                step: 4,
                icon: "✅",
                title: "Admission confirm!",
                desc: "Documents complete karo aur admission pakka!",
                color: "#FF4500"
              }
            ].map(({step, icon, title, desc, color}) => (
              <div key={step} className="card p-6" style={{
                background: "white",
                border: `4px solid ${color}`,
                textAlign: "center",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.2rem"
                }}>
                  {step}
                </div>
                
                <div style={{fontSize: "3rem", marginBottom: "16px", marginTop: "20px"}}>
                  {icon}
                </div>
                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "12px"
                }}>
                  {title}
                </h3>
                <p style={{
                  color: "#555",
                  fontSize: "0.95rem",
                  lineHeight: 1.6
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a 
              href={telHref} 
              className="btn-candy" 
              onClick={() => playCtaBell()}
            >
              Start Today — Seats Filling Fast!
            </a>
            <a
              href="#enquiry"
              className="btn-ghost"
              style={{ borderColor: "#8A2BE2", color: "#8A2BE2", background: "white" }}
              onClick={() => playCtaBell()}
            >
              📋 Online Enquiry Form
            </a>
          </div>
        </div>
      </section>

      {/* 9. STRONG CALL-TO-ACTION SECTION */}
      <section id="enquiry" style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #FF6347, #FF4500)",
        position: "relative",
        overflow: "visible",
        zIndex: 1
      }} className="reveal">
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)",
          backgroundSize: "30px 30px"
        }}></div>
        
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div style={{fontSize: "4rem", marginBottom: "20px"}} className="bounce">🚨</div>
            <h2 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "white",
              marginBottom: "20px",
              fontWeight: 800,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}>
              Admissions Open – Sirf Limited Seats Bachi Hain!
            </h2>
            <p style={{
              fontSize: "1.3rem",
              color: "white",
              opacity: 0.9,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
            }}>
              WhatsApp &gt; Email in Tier 3 India - Contact us now!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Options */}
            <div>
              <div style={{
                background: "white",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)"
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "24px",
                  textAlign: "center"
                }}>
                  Abhi Contact Karo! 📞
                </h3>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href={telHref} 
                    className="btn-candy"
                    style={{
                      fontSize: "1.2rem",
                      padding: "16px 24px",
                      textAlign: "center",
                      background: "linear-gradient(135deg, #00FA9A, #00BFFF)"
                    }}
                    onClick={() => playCtaBell()}
                  >
                    📞 Call Now — {phoneDisplay}
                  </a>
                  
                  <a 
                    href={waWithText("Hello! I want to know about admission for my child in Nandini Kids Academy")} 
                    className="btn-candy"
                    style={{
                      fontSize: "1.2rem",
                      padding: "16px 24px",
                      textAlign: "center",
                      background: "#25D366"
                    }}
                    onClick={() => playCtaBell()}
                  >
                    💬 WhatsApp Karo
                  </a>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div>
              <div style={{
                background: "white",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                position: "relative",
                zIndex: 20
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "24px",
                  textAlign: "center"
                }}>
                  📋 Quick Enquiry Form
                </h3>
                
                <form 
                  className="flex flex-col gap-4"
                  style={{position: "relative", zIndex: 30}}
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Form submitted:', formData);
                    playSound('cheer');
                    alert(`Thank you ${formData.parentName || 'Guest'}! Hum aapko call karenge.`);
                    // Reset form
                    setFormData({parentName: '', phoneNumber: '', childClass: ''});
                  }}
                >
                  <div>
                    <label style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#2C1810",
                      marginBottom: "8px"
                    }}>
                      Parent Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.parentName}
                      onChange={(e) => {
                        console.log('Name changed:', e.target.value);
                        setFormData({...formData, parentName: e.target.value});
                      }}
                      onClick={() => console.log('Name input clicked')}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "2px solid #ddd",
                        fontSize: "1rem",
                        outline: "none",
                        backgroundColor: "white",
                        position: "relative",
                        zIndex: 10,
                        pointerEvents: "auto"
                      }}
                      placeholder="Aapka naam"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#2C1810",
                      marginBottom: "8px"
                    }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "2px solid #ddd",
                        fontSize: "1rem",
                        outline: "none",
                        backgroundColor: "white",
                        position: "relative",
                        zIndex: 10
                      }}
                      placeholder="Mobile number"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: "block",
                      fontWeight: 600,
                      color: "#2C1810",
                      marginBottom: "8px"
                    }}>
                      Child's Class
                    </label>
                    <select 
                      value={formData.childClass}
                      onChange={(e) => setFormData({...formData, childClass: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "2px solid #ddd",
                        fontSize: "1rem",
                        outline: "none",
                        backgroundColor: "white",
                        position: "relative",
                        zIndex: 10,
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select class</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn-candy"
                    style={{
                      fontSize: "1.1rem",
                      padding: "14px 24px",
                      marginTop: "8px"
                    }}
                  >
                    Submit & Get Call Back 🎉
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOCATION + MAP */}
      <section id="location" style={{
        padding: "80px 0",
        background: "#fff",
        position: "relative"
      }} className="reveal">
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">📍 Location + Map</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              Aao Milne — Hum Real Hain! 😄
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "3px solid #00FA9A",
              minHeight: "400px",
              background: "#e8f8f0",
              boxShadow: "0 8px 28px rgba(0,0,0,.06)"
            }}>
              <iframe
                title="Nandini Kids Academy — Dehri, Rohtas, Bihar"
                src="https://www.google.com/maps?q=Dehri+on+Son+Rohtas+Bihar+821307&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Location Details */}
            <div>
              <div className="flex flex-col gap-6">
                <div style={{
                  background: "linear-gradient(135deg, #FFE4E1, #FFC0CB)",
                  borderRadius: "20px",
                  padding: "24px",
                  border: "3px solid white"
                }}>
                  <div className="flex items-center gap-4 mb-3">
                    <div style={{fontSize: "2.5rem"}}>📍</div>
                    <h3 style={{fontSize: "1.3rem", fontWeight: 700, color: "#2C1810"}}>
                      Address
                    </h3>
                  </div>
                  <p style={{fontSize: "1.1rem", color: "#444", lineHeight: 1.6}}>
                    <strong>Nandini Kids 'N' Academy</strong><br/>
                    Dalmiyanagar, Rohtas, Bihar<br/>
                    Near [Landmark Name], [City Name], Bihar
                  </p>
                </div>

                <div style={{
                  background: "linear-gradient(135deg, #E0FFFF, #B0E0E6)",
                  borderRadius: "20px",
                  padding: "24px",
                  border: "3px solid white"
                }}>
                  <div className="flex items-center gap-4 mb-3">
                    <div style={{fontSize: "2.5rem"}}>🚗</div>
                    <h3 style={{fontSize: "1.3rem", fontWeight: 700, color: "#2C1810"}}>
                      How to Reach
                    </h3>
                  </div>
                  <p style={{fontSize: "1rem", color: "#444", lineHeight: 1.6}}>
                    Auto se easily pahunch sakte hain. Main road se just 5 minute walk. 
                    Bus stop se bhi pass hai. Transport facility bhi available hai.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://maps.google.com/?q=Dalmiyanagar+Rohtas+Bihar" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-candy"
                    onClick={() => playCtaBell()}
                  >
                    🗺️ Get Directions
                  </a>
                  <a 
                    href={telHref} 
                    className="btn-ghost"
                    onClick={() => playCtaBell()}
                  >
                    📞 Call for Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section style={{
        padding: "80px 0",
        background: "linear-gradient(135deg, #F5F5DC 0%, #FFF8DC 50%, #FFFACD 100%)",
        position: "relative"
      }} className="reveal">
        <div 
          className="parrot-mascot" 
          style={{right: "20px", top: "20px"}} 
          onClick={() => playSound('chirp')}
          onMouseEnter={() => playSound('giggle')}
          title="🦜 Click me for parrot sounds!"
        >
          🦜
        </div>
        
        {/* Animated GIF: Monkey swinging - BIGGER in FAQ */}
        <img 
          src={lp("monkey swinging through a vine.gif")} 
          alt="Monkey swinging" 
          className="wiggle faq-monkey" 
          style={{
            position: "absolute", 
            bottom: "15%", 
            left: "5%", 
            width: "150px", 
            height: "150px", 
            opacity: 0.8,
            zIndex: 15
          }} 
        />
        
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div style={{textAlign: "center", marginBottom: "60px"}}>
            <div className="badge">❓ FAQ Section</div>
            <h2 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#2C1810",
              marginBottom: "16px"
            }}>
              Parents Ke Common Questions 🤔
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Fees kitni hai?",
                answer: "Fees bahut reasonable hai - monthly 2000-3000 range mein. Exact fees ke liye call karo, kyunki class ke hisab se different hai."
              },
              {
                question: "Transport milega kya?",
                answer: "Haan bilkul! Door to door transport facility hai. GPS tracking bhi hai, so aap dekh sakte hain bus kahan hai. Transport fees alag se hai."
              },
              {
                question: "Kaunsa medium hai — Hindi ya English?",
                answer: "English medium hai, lekin Hindi bhi sikhate hain. Bachhe dono language mein comfortable ho jaate hain. Speaking par special focus hai."
              },
              {
                question: "Kitni age chahiye admission ke liye?",
                answer: "Nursery ke liye 3 years, LKG ke liye 4 years, UKG ke liye 5 years. Age proof ke liye birth certificate chahiye."
              },
              {
                question: "CBSE hai ya State Board?",
                answer: "Hum CBSE pattern follow karte hain, lekin officially state board affiliated hain. Quality education CBSE jaisi hi milti hai."
              },
              {
                question: "Kya CCTV lagga hai?",
                answer: "Haan, pura campus CCTV se covered hai. 24/7 monitoring hoti hai. Parents ko full confidence de sakte hain safety ke liye."
              }
            ].map(({question, answer}, index) => (
              <div key={index} className="accordion">
                <button 
                  className="accordion-header"
                  onClick={(e) => {
                    const accordion = e.currentTarget.parentElement;
                    const content = accordion?.querySelector('.accordion-content') as HTMLElement;
                    const icon = accordion?.querySelector('.accordion-icon') as HTMLElement;
                    
                    if (accordion?.classList.contains('active')) {
                      accordion.classList.remove('active');
                      if (content) content.style.display = 'none';
                    } else {
                      // Close all other accordions
                      document.querySelectorAll('.accordion.active').forEach(acc => {
                        acc.classList.remove('active');
                        const accContent = acc.querySelector('.accordion-content') as HTMLElement;
                        if (accContent) accContent.style.display = 'none';
                      });
                      
                      accordion?.classList.add('active');
                      if (content) content.style.display = 'block';
                      playCtaBell();
                    }
                  }}
                >
                  <span style={{fontSize: "1.1rem"}}>{question}</span>
                  <span className="accordion-icon" style={{fontSize: "1.5rem"}}>⬇️</span>
                </button>
                <div className="accordion-content" style={{display: "none"}}>
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer style={{
        background: "linear-gradient(135deg, #2C1810, #1a1a2e)",
        color: "#fff",
        padding: "60px 0 120px",
        position: "relative"
      }}>
        <div className="max-w-6xl px-5" style={{marginLeft: "auto", marginRight: "auto"}}>
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* School Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #FF1493, #8A2BE2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem"
                }}>
                  🎀
                </div>
                <div>
                  <div style={{fontSize: "1.3rem", fontWeight: 800, marginBottom: "4px"}}>
                    Nandini Kids 'N' Academy
                  </div>
                  <div style={{fontSize: "0.9rem", color: "#aaa"}}>
                    Dalmiyanagar, Rohtas · Est. 2010
                  </div>
                </div>
              </div>
              <p style={{color: "#ccc", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px"}}>
                "Har bachha star hai, har bachha special hai." 
                English medium mein quality education ke saath Indian values bhi sikhate hain.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Since 2019", "1000+ Happy Students", "100% Parent Satisfaction", "Safe & Caring Environment"
                ].map((badge) => (
                  <span key={badge} className="pill" style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "0.7rem"
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px"}}>
                Quick Links
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  {href: "#about", label: "About School"},
                  {href: "#infrastructure", label: "Safety & Facilities"},
                  {href: "#testimonials", label: "Parent Reviews"},
                  {href: "#enquiry", label: "Admission Enquiry"}
                ].map(({href, label}) => (
                  <a 
                    key={href} 
                    href={href} 
                    style={{
                      color: "#ccc",
                      textDecoration: "none",
                      fontSize: "1rem",
                      transition: "color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#ccc"}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px"}}>
                Contact Info
              </h3>
              <div className="flex flex-col gap-4">
                <div style={{display: "flex", alignItems: "flex-start", gap: "12px"}}>
                  <div style={{fontSize: "1.5rem"}}>📍</div>
                  <div>
                    <div style={{fontWeight: 600, marginBottom: "4px"}}>Address</div>
                    <div style={{color: "#ccc", fontSize: "0.95rem", lineHeight: 1.6}}>
                      Dalmiyanagar, Rohtas, Bihar<br/>
                      Near [Landmark Name]
                    </div>
                  </div>
                </div>
                
                <div style={{display: "flex", alignItems: "flex-start", gap: "12px"}}>
                  <div style={{fontSize: "1.5rem"}}>📞</div>
                  <div>
                    <div style={{fontWeight: 600, marginBottom: "4px"}}>Phone</div>
                    <div style={{color: "#ccc", fontSize: "0.95rem"}}>
                      {phoneDisplay}
                    </div>
                  </div>
                </div>
                
                <div style={{display: "flex", alignItems: "flex-start", gap: "12px"}}>
                  <div style={{fontSize: "1.5rem"}}>🎓</div>
                  <div>
                    <div style={{fontWeight: 600, marginBottom: "4px"}}>Classes</div>
                    <div style={{color: "#ccc", fontSize: "0.95rem"}}>
                      Nursery to Class 5<br/>
                      English Medium
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div style={{
            borderTop: "2px solid #333",
            paddingTop: "24px",
            textAlign: "center"
          }}>
            <div style={{fontSize: "1rem", color: "#888", marginBottom: "8px"}}>
              © 2025 Nandini Kids 'N' Academy, Dalmiyanagar, Rohtas, Bihar. All rights reserved.
            </div>
            <div style={{fontSize: "0.9rem"}}>
              <span style={{color: "#FFD700"}}>Made with 💜 for little stars</span>
              {" · "}
              <span style={{color: "#aaa"}}>Website designed for Bihar parents</span>
            </div>
          </div>
        </div>

      </footer>

      {/* LIGHTBOX for gallery photos */}
      <div
        className={`lightbox${lightboxOpen ? " active" : ""}`}
        id="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged photo"
        onClick={() => setLightboxOpen(false)}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(false);
          }}
        >
          ✕
        </button>
        <img src={lightboxSrc || undefined} alt={lightboxAlt} onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
}