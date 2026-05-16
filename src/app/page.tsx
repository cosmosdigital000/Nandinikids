"use client";

import { useState, useEffect, useRef, useCallback, type ChangeEvent } from "react";
import { SITE_LOGO_FILE } from "@/lib/landingMedia";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — edit these to match your real values
// ─────────────────────────────────────────────────────────────────────────────
const PHONE       = "9876543210";                      // ← replace
const PHONE_DISP  = "+91 98765 43210";                 // ← replace
const TEL         = `tel:+91${PHONE}`;
const WA          = (t: string) => `https://wa.me/91${PHONE}?text=${encodeURIComponent(t)}`;
const WA_DEFAULT  = WA("Hello! I want to know about Nandini Kids Academy.");
const WA_ADMIT    = WA("Hello! I want to know about admission for my child in Nandini Kids Academy.");

// Image helper — in Next.js replace with: import { landingImage as lp } from "@/lib/landingMedia";
const lp = (file: string) => `/landingpage/${encodeURIComponent(file)}`;

const PRINCIPAL_FILE =
  "principal and director nandini kids dalmiyanagar dehri on sone.jpg";
const SCHOOL_PHOTO    = "nandini real school photo.jpeg";
const TEACHERS_PHOTO  = "teacher community group.jpg";
const MONKEY_GIF      = "monkey swinging through a vine.gif";
const KID_RUNNING_GIF = "kid going school running..gif";
const HORSE_GIF       = "kids toy horse moving..gif";

const GALLERY_ALBUMS = [
  { id:"annual-day",       title:"Annual Day",          desc:"Cultural programs mein bacche",            images:["annuals day nandini kids.jpg"],                                                  color:"#FF6B9D", emoji:"🎭" },
  { id:"academic-success", title:"Academic Success",    desc:"Celebrations & milestones",                images:["Academic Success celebration nandini kids Dalmiyanagar.jpg"],                    color:"#26C6DA", emoji:"🏆" },
  { id:"christmas",        title:"Christmas",           desc:"Festive celebrations",                     images:["Christmas celebration nandini kids Dalmiyanagar.jpg"],                          color:"#4FC3F7", emoji:"🎄" },
  { id:"janmashtami",      title:"Janmashtami & Dandiya",desc:"Traditional festivities",                images:["Dandiya and KrishnaJanmashtami Celebration nandini kids Dalmiyanagar.jpg"],      color:"#66BB6A", emoji:"🦚" },
  { id:"holi",             title:"Holi",                desc:"Rang aur khushi",                         images:["Holi celebration nandini kids Dalmiyanagar.jpg"],                               color:"#AB47BC", emoji:"🌈" },
  { id:"saraswati",        title:"Saraswati Puja",      desc:"Blessings for learning",                  images:["saraswati pooja celebration nandini kids Dalmiyanagar.jpg"],                    color:"#FF9800", emoji:"🪔" },
];

const NOTICES = [
  { date:"20 Mar 2025", title:"Admissions Open for Session 2025–26",   category:"Admission", important:true,  body:`Nursery se Class V tak admissions shuru. Limited seats — call now: ${PHONE_DISP}. No entrance test!` },
  { date:"15 Mar 2025", title:"Annual Day Celebration — 28 March 2025",category:"Event",     important:true,  body:"School Annual Day 28 March 2025, 10:00 AM. Bacche songs, dances & skits perform karenge. Parents invited!" },
  { date:"10 Mar 2025", title:"Unit Test 1 Schedule — March 2025",     category:"Exam",      important:false, body:"Class I–V ke liye Unit Test: 24 Mar (English), 25 Mar (Maths), 26 Mar (EVS/Hindi)." },
  { date:"05 Mar 2025", title:"Holi Holiday Notice",                    category:"Holiday",   important:false, body:"School closed 13–14 March 2025 (Holi). Reopens 17 March (Monday). 🌈" },
  { date:"01 Mar 2025", title:"Parent-Teacher Meeting — 8 March",      category:"General",   important:true,  body:"PTM on Saturday 8 March, 9 AM–12 PM. Collect progress card. All parents welcome." },
  { date:"22 Feb 2025", title:"Fee Payment Reminder — Last Date 28 Feb",category:"Fee",      important:false, body:"February fees last date 28 Feb. Late fine from 1st March. Office: Mon–Sat 9 AM–3 PM." },
  { date:"14 Feb 2025", title:"Republic Day Celebration Photos",        category:"Event",     important:false, body:"26 January celebration photos on notice board. Coming soon to WhatsApp group! 🇮🇳" },
  { date:"01 Feb 2025", title:"Computer Lab Upgraded",                  category:"General",   important:false, body:"8 new PCs + updated CAL software. Better digital learning for all students! 💻" },
];

const FAQS = [
  { q:"Is transport available?",        a:"Yes — door-to-door safe transport with GPS tracking. Fees charged separately." },
  { q:"Medium of instruction?",         a:"English medium with strong Hindi. We focus on spoken English so every child finds their voice." },
  { q:"Age requirement for Nursery?",   a:"3+ years for Nursery, 4+ for LKG, 5+ for UKG. Birth certificate required as age proof." },
  { q:"CBSE or State Board?",           a:"We follow the CBSE pattern but are State Board affiliated. Same quality of education." },
  { q:"Is the campus safe & monitored?",a:"Full CCTV coverage 24/7, secured boundary wall, and female staff for small kids." },
];

const STEPS = [
  { n:1, icon:"📞", title:"Call / Fill Form",   desc:"Enquire by calling or fill online form", color:"#FF6B9D" },
  { n:2, icon:"🏫", title:"Visit the School",   desc:"Explore campus, meet teachers",           color:"#7C4DFF" },
  { n:3, icon:"👶", title:"Child Interaction",  desc:"Simple interaction — no scary exam",      color:"#00BCD4" },
  { n:4, icon:"✅", title:"Admission Confirmed!",desc:"Complete docs & secure the seat",        color:"#4CAF50" },
];

const QUIZ_Q = [
  { prompt:"My child loves…",          opts:[{label:"Drawing & colors",emoji:"🎨",trait:"creative"},{label:"Numbers & puzzles",emoji:"🔢",trait:"analytical"},{label:"Talking & stories",emoji:"🗣",trait:"communicator"},{label:"Building things",emoji:"🧩",trait:"builder"}] },
  { prompt:"When stuck, my child…",    opts:[{label:"Thinks creatively",emoji:"💡",trait:"creative"},{label:"Follows logic",emoji:"📐",trait:"analytical"},{label:"Asks questions",emoji:"❓",trait:"communicator"},{label:"Tries hands-on",emoji:"✋",trait:"builder"}] },
  { prompt:"My child gets excited by…",opts:[{label:"Art & music",emoji:"🎭",trait:"creative"},{label:"Science & math",emoji:"🔬",trait:"analytical"},{label:"Making friends",emoji:"💬",trait:"communicator"},{label:"Sports & activities",emoji:"⚽",trait:"builder"}] },
];

const QUIZ_RESULTS = {
  creative:     { emoji:"🌟", title:"Creative Explorer!",       blurb:"We nurture creativity through art-integrated learning, storytelling & project-based activities." },
  analytical:   { emoji:"🔢", title:"Bright Thinker!",          blurb:"We strengthen English, Math & Science with puzzles, clear concepts & curiosity-led learning." },
  communicator: { emoji:"🗣", title:"Confident Communicator!",  blurb:"We emphasise spoken English, storytelling & conversations — every child finds their voice." },
  builder:      { emoji:"🧩", title:"Hands-On Learner!",        blurb:"We learn by doing — activities, projects & movement turn ideas into real confidence." },
};

const MANDATORY_DISCLOSURE = [
  { section:"A. General Information",  items:[
    ["Name of School",                  "Nandini Kids 'N' Academy"],
    ["Affiliation No.",                 "— (State Board affiliated)"],
    ["School Code",                     "—"],
    ["Complete Address",                "Dalmiyanagar, Rohtas, Bihar"],
    ["Principal Name",                  "—"],
    ["Contact No.",                     PHONE_DISP],
    ["Email",                           "—"],
    ["Year of Establishment",           "2019"],
    ["Status of School",                "Co-educational"],
  ]},
  { section:"B. Documents & Certificates", items:[
    ["NOC from State Govt / UT",        "Available at office"],
    ["Recognition Certificate",         "Available at office"],
    ["Building Safety Certificate",     "Issued by competent authority"],
    ["Fire Safety Certificate",         "Issued by competent authority"],
    ["Self-Certification",              "Submitted"],
  ]},
  { section:"C. Result & Academics", items:[
    ["Classes Offered",                 "Nursery, LKG, UKG, Class 1–5"],
    ["Medium of Instruction",           "English (Hindi also taught)"],
    ["Total No. of Students",           "1000+"],
    ["Pass Percentage",                 "100%"],
  ]},
  { section:"D. Staff", items:[
    ["Total No. of Teachers",           "20+"],
    ["Trained Teachers",                "All trained & qualified"],
    ["Support Staff",                   "Available"],
  ]},
];

type PageId = "home" | "gallery" | "notices" | "disclosure";
type GalleryAlbum = (typeof GALLERY_ALBUMS)[number];
type QuizTrait = keyof typeof QUIZ_RESULTS;
type LightboxState = { album: GalleryAlbum; index: number };
type SetPage = (page: PageId) => void;

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────────────
const G = String.raw;
const GLOBAL_CSS = G`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --pink:#FF6B9D;--purple:#7C4DFF;--yellow:#FFD600;--teal:#00BCD4;
    --green:#4CAF50;--orange:#FF9800;--ink:#1A1A2E;--cream:#FAFAF8;
  }
  html{scroll-behavior:smooth}
  body{font-family:'Nunito',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden}
  .brand{font-family:'Baloo 2',cursive}
  section,main{scroll-margin-top:66px}

  /* ── NAV ── */
  .nav{position:fixed;top:0;left:0;right:0;z-index:900;height:66px;
    background:rgba(255,255,255,.94);backdrop-filter:blur(14px);
    border-bottom:1.5px solid rgba(124,77,255,.12);
    display:flex;align-items:center;padding:0 20px;transition:box-shadow .2s}
  .nav.scrolled{box-shadow:0 4px 24px rgba(0,0,0,.09)}
  .nav-inner{max-width:1100px;margin:0 auto;width:100%;display:flex;align-items:center;justify-content:space-between}
  .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer;border:none;background:none;padding:0}
  .nav-logo-ring{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,var(--pink),var(--purple));display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0}
  .nav-logo-name{font-family:'Baloo 2',cursive;font-size:.92rem;font-weight:800;color:var(--purple);line-height:1.1}
  .nav-logo-sub{font-size:.58rem;color:#888;font-weight:600}
  .nav-links{display:flex;align-items:center;gap:3px}
  .nav-link{padding:6px 10px;border-radius:8px;font-size:.8rem;font-weight:700;color:#555;text-decoration:none;background:none;border:none;cursor:pointer;font-family:'Nunito',sans-serif;transition:color .15s,background .15s}
  .nav-link:hover,.nav-link.active{color:var(--purple);background:rgba(124,77,255,.09)}
  .nav-cta{padding:9px 18px;border-radius:50px;background:linear-gradient(135deg,var(--pink),var(--purple));color:#fff;font-weight:800;font-size:.82rem;text-decoration:none;white-space:nowrap;box-shadow:0 4px 14px rgba(255,107,157,.35);transition:transform .18s,box-shadow .18s;border:none;cursor:pointer;font-family:'Nunito',sans-serif}
  .nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,157,.45)}
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px}
  .hamburger span{display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;transition:all .25s}
  .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .hamburger.open span:nth-child(2){opacity:0}
  .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  .drawer{position:fixed;top:66px;left:0;right:0;background:#fff;z-index:890;padding:14px;
    border-bottom:2px solid rgba(124,77,255,.1);transform:translateY(-110%);
    transition:transform .28s ease;box-shadow:0 8px 24px rgba(0,0,0,.1)}
  .drawer.open{transform:translateY(0)}
  .drawer-link{display:block;padding:12px 8px;font-weight:700;color:var(--ink);
    text-decoration:none;border-bottom:1px solid #f0f0f0;font-size:.95rem;
    background:none;border-right:none;border-left:none;border-top:none;cursor:pointer;
    text-align:left;width:100%;font-family:'Nunito',sans-serif}
  .drawer-link:last-child{border-bottom:none}

  /* ── BUTTONS ── */
  .btn-p{padding:14px 28px;border-radius:50px;background:linear-gradient(135deg,var(--pink),var(--purple));
    color:#fff;font-weight:800;font-size:1rem;text-decoration:none;border:none;cursor:pointer;
    box-shadow:0 8px 28px rgba(255,107,157,.38);transition:transform .2s,box-shadow .2s;display:inline-block;font-family:'Nunito',sans-serif}
  .btn-p:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(255,107,157,.48)}
  .btn-g{padding:13px 24px;border-radius:50px;border:2px solid rgba(124,77,255,.35);color:var(--purple);
    font-weight:800;font-size:1rem;text-decoration:none;background:transparent;cursor:pointer;
    transition:all .2s;display:inline-block;font-family:'Nunito',sans-serif}
  .btn-g:hover{background:rgba(124,77,255,.08)}
  .btn-game{padding:13px 24px;border-radius:50px;background:linear-gradient(135deg,var(--purple),#4A00E0);
    color:#fff;font-weight:800;font-size:.92rem;border:none;cursor:pointer;
    box-shadow:0 6px 22px rgba(124,77,255,.38);animation:gamePulse 2s ease-in-out infinite;
    display:inline-block;font-family:'Nunito',sans-serif}
  @keyframes gamePulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .btn-game:hover{animation-play-state:paused}
  .btn-wa{padding:13px 24px;border-radius:50px;background:#25D366;color:#fff;font-weight:800;
    font-size:1rem;text-decoration:none;display:inline-block;transition:transform .2s;font-family:'Nunito',sans-serif}
  .btn-wa:hover{transform:translateY(-3px)}
  .btn-white{padding:13px 24px;border-radius:50px;background:#fff;color:var(--purple);font-weight:800;
    font-size:1rem;text-decoration:none;border:none;cursor:pointer;
    box-shadow:0 4px 16px rgba(0,0,0,.12);transition:transform .2s;display:inline-block;font-family:'Nunito',sans-serif}
  .btn-white:hover{transform:translateY(-2px)}
  .btn-orange{padding:12px 26px;border-radius:50px;background:linear-gradient(135deg,var(--orange),#E65100);
    color:#fff;font-weight:800;font-size:.95rem;text-decoration:none;
    box-shadow:0 6px 20px rgba(255,152,0,.3);display:inline-block;transition:transform .2s;font-family:'Nunito',sans-serif}
  .btn-orange:hover{transform:translateY(-2px)}

  /* ── LAYOUT ── */
  .sec{padding:72px 20px;position:relative;overflow:hidden}
  .inner{max-width:1100px;margin:0 auto}
  .blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.16;pointer-events:none;z-index:0}
  .rel{position:relative;z-index:1}
  .sec-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(124,77,255,.08);
    border:1.5px solid rgba(124,77,255,.2);color:var(--purple);padding:4px 14px;
    border-radius:50px;font-size:.73rem;font-weight:800;letter-spacing:.06em;margin-bottom:12px}
  .sec-h2{font-family:'Baloo 2',cursive;font-size:clamp(1.7rem,4vw,2.5rem);color:var(--ink);
    line-height:1.2;margin-bottom:10px}
  .sec-p{color:#666;font-size:1rem;line-height:1.7;max-width:560px}

  /* ── HERO ── */
  .hero{min-height:100vh;padding:86px 20px 60px;display:flex;align-items:center;
    background:linear-gradient(160deg,#fff5fb 0%,#f0f4ff 50%,#f5fffc 100%)}
  .hero-tag{display:inline-flex;align-items:center;gap:6px;background:rgba(124,77,255,.1);
    border:1.5px solid rgba(124,77,255,.25);color:var(--purple);padding:5px 14px;
    border-radius:50px;font-size:.78rem;font-weight:800;letter-spacing:.05em;margin-bottom:20px}
  .hero-h1{font-family:'Baloo 2',cursive;font-size:clamp(2.2rem,7vw,3.8rem);line-height:1.1;
    color:var(--ink);margin-bottom:18px}
  .hero-h1 .grad{background:linear-gradient(135deg,var(--pink),var(--purple));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero-sub{font-size:1.05rem;color:#555;line-height:1.7;margin-bottom:28px;max-width:520px}
  .hero-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
  .stat-chip{background:#fff;border:1.5px solid rgba(124,77,255,.15);border-radius:14px;
    padding:10px 14px;text-align:center;flex:1;min-width:80px;box-shadow:0 4px 14px rgba(0,0,0,.06)}
  .stat-n{font-family:'Baloo 2',cursive;font-size:1.35rem;font-weight:800;color:var(--purple)}
  .stat-l{font-size:.62rem;font-weight:700;color:#777;line-height:1.3}
  .hero-btns{display:flex;flex-wrap:wrap;gap:12px}

  /* monkey gif — decorative, right side on desktop */
  .monkey-wrap{position:absolute;right:0;top:60px;width:clamp(180px,22vw,320px);
    pointer-events:none;opacity:.88;z-index:2}
  .monkey-wrap img{width:100%;height:auto;display:block}

  /* kid running gif — above "Why us" section */
  .kid-running-wrap{position:absolute;right:clamp(10px,4vw,60px);top:-20px;
    width:clamp(120px,16vw,200px);pointer-events:none;opacity:.9;z-index:2}
  .kid-running-wrap img{width:100%;height:auto;display:block}

  /* horse gif — gallery section corner */
  .horse-wrap{position:absolute;top:16px;right:16px;width:clamp(50px,8vw,100px);
    pointer-events:none;opacity:.85;z-index:2}
  .horse-wrap img{width:100%;height:auto;display:block}

  /* ── WHY US ── */
  .why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:40px}
  .why-card{background:#fff;border-radius:20px;padding:22px 18px;
    border:1.5px solid rgba(0,0,0,.05);transition:transform .25s,box-shadow .25s}
  .why-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.1)}
  .why-icon{font-size:2.2rem;margin-bottom:10px}
  .why-title{font-weight:800;font-size:1rem;color:var(--ink);margin-bottom:5px}
  .why-desc{font-size:.82rem;color:#777;line-height:1.55}

  /* ── SCHOOL PHOTO strip ── */
  .photo-strip{border-radius:22px;overflow:hidden;box-shadow:0 14px 44px rgba(0,0,0,.12);
    border:3px solid #fff;margin-top:40px}
  .photo-strip img{width:100%;max-height:300px;object-fit:cover;display:block}
  .photo-caption{background:#fff;padding:12px 18px;font-weight:700;font-size:.9rem;color:var(--ink);text-align:center}

  /* ── PRINCIPAL ── */
  .principal-card{background:#fff;border-radius:24px;padding:28px 24px;
    border-left:4px solid var(--pink);box-shadow:0 8px 32px rgba(0,0,0,.07);margin-bottom:28px}
  .principal-row{display:flex;align-items:center;gap:16px;margin-bottom:16px}
  .principal-photo{width:80px;height:80px;border-radius:50%;object-fit:cover;
    border:3px solid var(--pink);flex-shrink:0}
  .principal-photo-fallback{width:80px;height:80px;border-radius:50%;
    background:linear-gradient(135deg,var(--pink),var(--purple));
    display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0;
    border:3px solid var(--pink)}
  .principal-quote{font-size:1.05rem;color:#444;line-height:1.72;font-style:italic}
  .principal-by{font-weight:800;font-size:.9rem;color:var(--ink);margin-top:12px}

  /* about stats */
  .about-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
  .about-stat{background:linear-gradient(135deg,var(--pink),var(--purple));border-radius:18px;
    padding:22px 16px;text-align:center;color:#fff}
  .about-stat-n{font-family:'Baloo 2',cursive;font-size:2rem;font-weight:800}
  .about-stat-l{font-size:.72rem;font-weight:700;opacity:.88}

  /* ── GALLERY ── */
  .gal-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:36px}
  .gal-card{border-radius:18px;overflow:hidden;aspect-ratio:1;cursor:pointer;
    transition:transform .25s,box-shadow .25s;position:relative}
  .gal-card:hover{transform:scale(1.04);box-shadow:0 12px 36px rgba(0,0,0,.15)}
  .gal-card img{width:100%;height:100%;object-fit:cover;display:block}
  .gal-overlay{position:absolute;bottom:0;left:0;right:0;
    background:linear-gradient(transparent,rgba(0,0,0,.62));
    padding:24px 12px 12px;color:#fff;text-align:center}
  .gal-overlay-title{font-weight:800;font-size:.88rem}
  .gal-overlay-desc{font-size:.72rem;opacity:.85}

  /* lightbox */
  .lb-overlay{position:fixed;inset:0;z-index:1200;background:rgba(10,10,26,.88);
    display:flex;align-items:center;justify-content:center;padding:16px;
    animation:fadeIn .2s ease}
  .lb-img{max-width:min(96vw,820px);max-height:88vh;border-radius:16px;
    box-shadow:0 24px 60px rgba(0,0,0,.5);object-fit:contain}
  .lb-close{position:absolute;top:16px;right:16px;width:42px;height:42px;
    border-radius:50%;background:rgba(255,255,255,.15);border:none;color:#fff;
    font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .lb-btn{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;
    border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.35);
    color:#fff;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .lb-prev{left:16px}
  .lb-next{right:16px}

  /* ── ACADEMICS ── */
  .cls-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}
  .cls-chip{background:rgba(255,255,255,.18);border-radius:10px;padding:8px 10px;
    font-weight:800;font-size:.85rem;text-align:center}
  .approach-item{background:#fff;border-radius:16px;padding:16px 18px;
    display:flex;align-items:center;gap:14px;border:1.5px solid rgba(0,0,0,.05);
    margin-bottom:12px}
  .approach-icon{font-size:2rem;flex-shrink:0}
  .approach-title{font-weight:800;font-size:.97rem;color:var(--ink)}
  .approach-desc{font-size:.8rem;color:#777;margin-top:2px}

  /* ── SAFETY ── */
  .safety-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:36px}
  .safety-card{border-radius:18px;padding:22px 14px;text-align:center;
    border:1.5px solid rgba(0,0,0,.05)}
  .safety-icon{font-size:2.4rem;margin-bottom:8px}
  .safety-title{font-weight:800;font-size:.9rem;color:var(--ink)}

  /* ── TESTIMONIALS ── */
  .testi-grid{display:grid;grid-template-columns:1fr;gap:16px;margin-top:36px}
  .testi-card{border-radius:20px;padding:22px 18px;border:1.5px solid rgba(0,0,0,.05)}
  .testi-stars{display:flex;gap:2px;margin-bottom:10px}
  .testi-quote{font-size:.9rem;color:#444;line-height:1.65;font-style:italic;margin-bottom:12px}
  .testi-name{font-weight:800;font-size:.9rem;color:var(--ink)}

  /* ── ADMISSION ── */
  .steps-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:36px}
  .step-card{background:#fff;border-radius:20px;padding:24px 16px;text-align:center;
    border:1.5px solid rgba(0,0,0,.05)}
  .step-n{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;
    justify-content:center;font-weight:900;font-size:1.1rem;color:#fff;margin:0 auto 12px}
  .step-icon{font-size:2.2rem;margin-bottom:10px}
  .step-title{font-weight:800;font-size:.95rem;color:var(--ink)}
  .step-desc{font-size:.78rem;color:#777;margin-top:5px;line-height:1.5}

  /* ── CTA BAND ── */
  .cta-band{background:linear-gradient(135deg,#FF6B9D 0%,#7C4DFF 100%);border-radius:28px;
    padding:44px 28px;text-align:center;color:#fff;position:relative;overflow:hidden}
  .cta-band h2{font-family:'Baloo 2',cursive;font-size:clamp(1.6rem,4vw,2.4rem);margin-bottom:14px}
  .cta-band p{font-size:1rem;opacity:.9;margin-bottom:28px}
  .cta-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}

  /* ── FORM ── */
  .form-wrap{background:#fff;border-radius:24px;padding:32px 24px;margin-top:32px;
    box-shadow:0 12px 40px rgba(0,0,0,.08);border:1.5px solid rgba(124,77,255,.1)}
  .form-input{width:100%;padding:12px 16px;border-radius:12px;border:1.5px solid rgba(0,0,0,.1);
    font-size:.97rem;outline:none;font-family:'Nunito',sans-serif;margin-bottom:14px;
    background:#fafaf8;transition:border-color .2s}
  .form-input:focus{border-color:var(--purple)}

  /* ── MAP ── */
  .map-wrap{border-radius:22px;overflow:hidden;margin-top:32px;
    border:1.5px solid rgba(0,0,0,.08);box-shadow:0 8px 28px rgba(0,0,0,.08)}

  /* ── FAQ ── */
  .faq-item{background:#fff;border-radius:16px;margin-bottom:12px;overflow:hidden;
    box-shadow:0 3px 14px rgba(0,0,0,.06)}
  .faq-q{width:100%;padding:18px 20px;background:none;border:none;text-align:left;
    font-weight:800;font-size:.97rem;color:var(--ink);cursor:pointer;
    display:flex;justify-content:space-between;align-items:center;gap:12px;
    font-family:'Nunito',sans-serif}
  .faq-a{padding:0 20px 16px;color:#666;font-size:.9rem;line-height:1.65}
  .faq-chev{font-size:1.2rem;transition:transform .25s;flex-shrink:0}
  .faq-chev.open{transform:rotate(180deg)}

  /* ── QUIZ MODAL ── */
  .modal-ov{position:fixed;inset:0;z-index:1100;background:rgba(26,26,46,.5);
    backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;
    padding:16px;animation:fadeIn .2s ease}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal{width:min(100%,400px);background:#fff;border-radius:24px;padding:28px 22px 32px;
    position:relative;box-shadow:0 24px 64px rgba(0,0,0,.2);max-height:92vh;overflow-y:auto}
  .modal-close{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;
    background:rgba(0,0,0,.07);border:none;cursor:pointer;font-size:1.1rem;
    display:flex;align-items:center;justify-content:center}
  .quiz-prog{display:flex;gap:6px;margin-bottom:20px}
  .quiz-dot{flex:1;height:4px;border-radius:4px;background:rgba(124,77,255,.15);transition:background .3s}
  .quiz-dot.done{background:var(--purple)}
  .quiz-opt{display:flex;align-items:center;gap:14px;width:100%;padding:14px 16px;
    border-radius:14px;border:2px solid rgba(0,0,0,.08);background:#fff;
    font-size:.97rem;font-weight:700;color:var(--ink);cursor:pointer;text-align:left;
    transition:all .15s;font-family:'Nunito',sans-serif;margin-bottom:10px}
  .quiz-opt:hover{border-color:var(--purple);background:rgba(124,77,255,.06)}
  .quiz-opt-em{font-size:1.6rem}

  /* ── STICKY BAR ── */
  .sticky-bar{position:fixed;bottom:0;left:0;right:0;z-index:800;background:#fff;
    border-top:1.5px solid rgba(124,77,255,.15);padding:10px 16px;
    display:flex;gap:10px;box-shadow:0 -4px 20px rgba(0,0,0,.08)}
  .sticky-bar a,.sticky-bar button{flex:1;display:flex;align-items:center;justify-content:center;
    padding:12px 8px;border-radius:14px;font-weight:800;font-size:.82rem;
    text-decoration:none;gap:5px;border:none;cursor:pointer;font-family:'Nunito',sans-serif;
    transition:transform .15s}
  .sticky-bar a:hover,.sticky-bar button:hover{transform:scale(1.03)}
  .sb-call{background:linear-gradient(135deg,var(--pink),var(--purple));color:#fff!important}
  .sb-wa{background:#25D366;color:#fff!important}
  .sb-enq{border:2px solid rgba(124,77,255,.35)!important;color:var(--purple)!important;background:transparent!important}

  /* ── PAGE HERO (sub-pages) ── */
  .page-hero{padding:100px 20px 60px;background:linear-gradient(160deg,#fff5fb,#f0f4ff);text-align:center}
  .page-hero h1{font-family:'Baloo 2',cursive;font-size:clamp(1.8rem,5vw,2.8rem);color:var(--ink);margin-bottom:12px}
  .page-hero p{color:#666;font-size:1rem;max-width:520px;margin:0 auto}
  .breadcrumb{background:rgba(124,77,255,.07);padding:10px 20px;
    border-bottom:1.5px solid rgba(124,77,255,.12)}
  .breadcrumb-inner{max-width:1100px;margin:0 auto;font-size:.82rem;font-weight:700;color:var(--purple)}
  .breadcrumb button{color:var(--purple);background:none;border:none;cursor:pointer;
    font-weight:700;font-size:.82rem;font-family:'Nunito',sans-serif}

  /* notice board */
  .notice-card{background:#fff;border-radius:16px;padding:20px 22px;margin-bottom:14px;
    box-shadow:0 3px 14px rgba(0,0,0,.06);border-left:4px solid transparent}
  .notice-card.imp{border-left-color:var(--orange)}
  .notice-head{display:flex;justify-content:space-between;align-items:flex-start;
    gap:12px;flex-wrap:wrap;margin-bottom:8px}
  .notice-title{font-weight:800;font-size:1rem;color:var(--ink)}
  .notice-date{font-size:.73rem;color:#888;white-space:nowrap;padding-top:2px}
  .notice-body{font-size:.87rem;color:#555;line-height:1.65}
  .cat-pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:14px;
    font-size:.7rem;font-weight:800;margin-bottom:6px}
  .imp-badge{background:#FFF3E0;color:#a84e00;border:1.5px solid var(--orange);
    font-size:.7rem;font-weight:800;padding:2px 9px;border-radius:12px;
    display:inline-flex;align-items:center;gap:4px;margin-left:8px}
  .cat-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
  .cat-filter{padding:6px 14px;border-radius:20px;border:2px solid rgba(124,77,255,.2);
    background:#fff;font-family:'Nunito',sans-serif;font-size:.78rem;font-weight:700;
    cursor:pointer;color:#666;transition:all .18s}
  .cat-filter:hover,.cat-filter.active{background:var(--purple);border-color:var(--purple);color:#fff}

  /* mandatory disclosure */
  .disc-section{background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;
    box-shadow:0 3px 14px rgba(0,0,0,.06)}
  .disc-section-head{padding:16px 20px;background:linear-gradient(135deg,var(--pink),var(--purple));
    color:#fff;font-weight:800;font-size:.97rem}
  .disc-table{width:100%;border-collapse:collapse}
  .disc-table td{padding:10px 20px;font-size:.88rem;border-bottom:1px solid #f0f0f0}
  .disc-table td:first-child{font-weight:700;color:#555;width:45%}
  .disc-table td:last-child{color:var(--ink)}
  .disc-table tr:last-child td{border-bottom:none}

  /* ── FOOTER ── */
  .footer{background:var(--ink);color:#ccc;padding:52px 20px 100px}
  .footer h3{font-family:'Baloo 2',cursive;color:#fff;margin-bottom:12px;font-size:1.05rem}
  .footer p,.footer a{font-size:.88rem;color:#aaa;line-height:1.8;text-decoration:none}
  .footer a:hover{color:var(--pink)}
  .footer-grid{display:grid;grid-template-columns:1fr;gap:32px;max-width:1100px;margin:0 auto}
  .footer-bottom{text-align:center;margin-top:36px;padding-top:20px;
    border-top:1px solid rgba(255,255,255,.08);font-size:.8rem;color:#555}

  /* ── RESPONSIVE ── */
  @media(min-width:640px){
    .why-grid{grid-template-columns:repeat(3,1fr)}
    .gal-grid{grid-template-columns:repeat(3,1fr)}
    .about-stats{grid-template-columns:repeat(4,1fr)}
    .steps-grid{grid-template-columns:repeat(4,1fr)}
    .safety-grid{grid-template-columns:repeat(3,1fr)}
    .testi-grid{grid-template-columns:repeat(2,1fr)}
    .footer-grid{grid-template-columns:repeat(3,1fr)}
  }
  @media(min-width:768px){
    .hamburger{display:none!important}
    .nav-links{display:flex!important}
    .drawer{display:none!important}
    .hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
    .monkey-wrap{display:block}
    .principal-inner{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
    .academics-inner{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
    .testi-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:767px){
    .nav-links{display:none}
    .hamburger{display:flex!important}
    .monkey-wrap{width:clamp(140px,38vw,200px);top:72px}
    .kid-running-wrap{width:clamp(90px,24vw,140px)}
    .hero-photo-half{display:none}
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// TINY HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const CAT_STYLE = {
  Admission:{ bg:"#E4F8FD", color:"#1A5E7A" },
  Exam:     { bg:"#FFF0F5", color:"#9B1A5A" },
  Holiday:  { bg:"#FFFBEA", color:"#7a5800" },
  Event:    { bg:"#E8FBF5", color:"#1a6e54" },
  General:  { bg:"#F0EEFF", color:"#4A1A8A" },
  Fee:      { bg:"#FFF3E0", color:"#a84e00" },
};

type NoticeCategory = keyof typeof CAT_STYLE;

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className={`faq-chev${open?" open":""}`}>⌄</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

function Quiz({ onClose, goTo }: { onClose: () => void; goTo: (id: string) => void }) {
  const [phase, setPhase] = useState("intro");
  const [picks, setPicks] = useState<QuizTrait[]>([]);
  const qi = picks.length;
  const result = phase==="result" ? (() => {
    const c: Record<QuizTrait, number> = { creative:0, analytical:0, communicator:0, builder:0 };
    picks.forEach(t=>c[t]++);
    return Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0] as QuizTrait;
  })() : null;
  const pick = (trait: QuizTrait) => {
    const next=[...picks,trait];
    setPicks(next);
    if(next.length>=QUIZ_Q.length) setPhase("result");
  };
  return (
    <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {phase==="intro"&&(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:12}}>🎯</div>
            <h2 className="brand" style={{fontSize:"1.4rem",color:"var(--ink)",marginBottom:10}}>Know Your Child's Strength</h2>
            <p style={{color:"#777",fontSize:".93rem",lineHeight:1.6,marginBottom:24}}>3 quick questions — see how Nandini Kids nurtures your child's unique talent!</p>
            <button className="btn-p" style={{width:"100%"}} onClick={()=>setPhase("quiz")}>Start the Quiz →</button>
          </div>
        )}
        {phase==="quiz"&&(
          <>
            <div className="quiz-prog">{QUIZ_Q.map((_,i)=><div key={i} className={`quiz-dot${i<qi?" done":""}`}/>)}</div>
            <p style={{fontSize:".72rem",fontWeight:800,color:"var(--purple)",letterSpacing:".06em",marginBottom:8}}>QUESTION {qi+1} OF {QUIZ_Q.length}</p>
            <h3 className="brand" style={{fontSize:"1.2rem",color:"var(--ink)",marginBottom:18}}>{QUIZ_Q[qi].prompt}</h3>
            {QUIZ_Q[qi].opts.map(opt=>(
              <button key={opt.label} className="quiz-opt" onClick={()=>pick(opt.trait as QuizTrait)}>
                <span className="quiz-opt-em">{opt.emoji}</span><span>{opt.label}</span>
              </button>
            ))}
          </>
        )}
        {phase==="result"&&result&&(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"3.5rem",marginBottom:10}}>{QUIZ_RESULTS[result].emoji}</div>
            <h3 className="brand" style={{fontSize:"1.35rem",color:"var(--ink)",marginBottom:10}}>{QUIZ_RESULTS[result].title}</h3>
            <p style={{fontSize:".92rem",color:"#555",lineHeight:1.65,marginBottom:22}}>{QUIZ_RESULTS[result].blurb}</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button className="btn-p" style={{width:"100%"}} onClick={()=>{onClose();goTo("gallery")}}>👉 See how we build this skill</button>
              <button className="btn-g" style={{width:"100%"}} onClick={()=>{onClose();goTo("admission")}}>👉 Book a free school visit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EnquiryForm() {
  const [form,setForm]=useState({name:"",phone:"",cls:""});
  const [sent,setSent]=useState(false);
  const set = (k: "name" | "phone" | "cls") => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  if(sent) return(
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:"3rem",marginBottom:10}}>🎉</div>
      <h3 className="brand" style={{color:"var(--purple)",marginBottom:8}}>Thank you, {form.name||"Dear Parent"}!</h3>
      <p style={{color:"#666"}}>Hum aapko jald hi call karenge.</p>
    </div>
  );
  return(
    <form onSubmit={e=>{e.preventDefault();setSent(true)}}>
      <input className="form-input" type="text" placeholder="Parent Name *" required value={form.name} onChange={set("name")}/>
      <input className="form-input" type="tel" placeholder="Phone Number *" required value={form.phone} onChange={set("phone")}/>
      <select className="form-input" value={form.cls} onChange={set("cls")}>
        <option value="">Select Class</option>
        {["Nursery","LKG","UKG","Class 1","Class 2","Class 3","Class 4","Class 5"].map(c=><option key={c}>{c}</option>)}
      </select>
      <button type="submit" className="btn-p" style={{width:"100%",textAlign:"center"}}>Submit & Get Call Back 🎉</button>
    </form>
  );
}

// Gallery lightbox viewer
function GalleryLightbox({
  album, index, onClose, onPrev, onNext,
}: {
  album: GalleryAlbum;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const src = lp(album.images[index]);
  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose}>×</button>
      {album.images.length>1&&<button className="lb-btn lb-prev" onClick={e=>{e.stopPropagation();onPrev()}}>‹</button>}
      <img className="lb-img" src={src} alt={`${album.title} ${index+1}`} onClick={e=>e.stopPropagation()}/>
      {album.images.length>1&&<button className="lb-btn lb-next" onClick={e=>{e.stopPropagation();onNext()}}>›</button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV (shared)
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, scrollTo }: { page: PageId; setPage: SetPage; scrollTo: (id: string) => void }) {
  const [scrolled,setScrolled]=useState(false);
  const [menu,setMenu]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>10);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  useEffect(()=>setMenu(false),[page]);
  const go = (id: string) => { setPage("home"); setMenu(false); requestAnimationFrame(() => setTimeout(() => scrollTo(id), 80)); };
  const NAV=[
    {label:"About",    action:()=>go("about")},
    {label:"Gallery",  action:()=>setPage("gallery")},
    {label:"Academics",action:()=>go("academics")},
    {label:"Safety",   action:()=>go("safety")},
    {label:"Notices",  action:()=>setPage("notices")},
    {label:"Disclosure",action:()=>setPage("disclosure")},
    {label:"Contact",  action:()=>go("contact")},
  ];
  return(
    <>
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={()=>setPage("home")}>
            <div className="nav-logo-ring" style={{ padding: 0, overflow: "hidden", background: "#fff" }}>
              <img src={lp(SITE_LOGO_FILE)} alt="Nandini Kids 'N' Academy" width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div className="nav-logo-name">Nandini Kids 'N' Academy</div>
              <div className="nav-logo-sub">Dalmiyanagar, Rohtas, Bihar · Est. 2019</div>
            </div>
          </button>
          <div className="nav-links">
            {NAV.map(n=><button key={n.label} className={`nav-link${page===n.label.toLowerCase()?" active":""}`} onClick={n.action}>{n.label}</button>)}
            <button className="nav-cta" onClick={()=>go("admission")}>Admission →</button>
          </div>
          <button className={`hamburger${menu?" open":""}`} onClick={()=>setMenu(o=>!o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>
      <div className={`drawer${menu?" open":""}`}>
        {NAV.map(n=><button key={n.label} className="drawer-link" onClick={n.action}>{n.label}</button>)}
        <button className="drawer-link" style={{color:"var(--purple)",fontWeight:900}} onClick={()=>go("admission")}>🎒 Admission</button>
      </div>
      {menu&&<div onClick={()=>setMenu(false)} style={{position:"fixed",inset:0,zIndex:888,background:"rgba(0,0,0,.2)"}}/>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER (shared)
// ─────────────────────────────────────────────────────────────────────────────
function Footer({ setPage, scrollTo }: { setPage: SetPage; scrollTo: (id: string) => void }) {
  const go = (id: string) => { setPage("home"); requestAnimationFrame(() => setTimeout(() => scrollTo(id), 80)); };
  return(
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", background: "#fff", flexShrink: 0 }}>
              <img src={lp(SITE_LOGO_FILE)} alt="" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{fontFamily:"'Baloo 2',cursive",color:"#fff",fontWeight:800}}>Nandini Kids 'N' Academy</div>
              <div style={{fontSize:".6rem",color:"#777"}}>Dalmiyanagar, Rohtas, Bihar · Est. 2019</div>
            </div>
          </div>
          <p>"Every child is special. Every child is a star!" ✨</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:14}}>
            {["Since 2019","1000+ Students","100% Safe","20+ Teachers"].map(b=>(
              <span key={b} style={{background:"rgba(255,255,255,.1)",color:"#ccc",padding:"4px 10px",borderRadius:50,fontSize:".68rem",fontWeight:700}}>{b}</span>
            ))}
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          {[["About Us","about"],["Gallery","gallery"],["Admission","admission"],["Notices","notices"],["Disclosure","disclosure"],["Contact","contact"]].map(([l,id])=>(
            <button key={l} onClick={()=>["gallery","notices","disclosure"].includes(id)?setPage(id as PageId):go(id)}
              style={{display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",fontSize:".88rem",color:"#aaa",lineHeight:1.8,textAlign:"left",padding:0}}>
              {l}
            </button>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>📍 Dalmiyanagar, Rohtas, Bihar</p>
          <p>📞 <a href={TEL}>{PHONE_DISP}</a></p>
          <p>🎓 Nursery to Class 5 · English Medium</p>
          <a href={WA_DEFAULT} className="btn-wa" style={{marginTop:14,padding:"10px 20px",fontSize:".85rem",display:"inline-block"}}>💬 WhatsApp Us</a>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Nandini Kids 'N' Academy · Made with 💜 for little stars</div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function HomePage({ setPage, scrollTo, openQuiz }: { setPage: SetPage; scrollTo: (id: string) => void; openQuiz: () => void }) {
  const [lb, setLb] = useState<LightboxState | null>(null);
  const openAlbum = (album: GalleryAlbum) => setLb({ album, index: 0 });
  const lbPrev = () => setLb(s => s ? { ...s, index: (s.index - 1 + s.album.images.length) % s.album.images.length } : s);
  const lbNext = () => setLb(s => s ? { ...s, index: (s.index + 1) % s.album.images.length } : s);

  return(
    <>
      {/* ── HERO ── */}
      <section id="hero" className="hero" style={{position:"relative",overflow:"hidden"}}>
        {/* Colour blobs */}
        <div className="blob" style={{background:"var(--pink)",width:380,height:380,top:-100,left:-100}}/>
        <div className="blob" style={{background:"var(--purple)",width:280,height:280,top:"30%",right:-80}}/>
        <div className="blob" style={{background:"var(--teal)",width:220,height:220,bottom:-60,left:"35%"}}/>

        {/* Monkey GIF — swings on the right, half-peeking from edge */}
        <div className="monkey-wrap" style={{position:"absolute",right:0,top:20,width:"clamp(160px,20vw,300px)",pointerEvents:"none",opacity:.88,zIndex:2}}>
          <img src={lp(MONKEY_GIF)} alt="" aria-hidden style={{width:"100%",height:"auto",display:"block"}}/>
        </div>

        <div className="inner rel" style={{width:"100%"}}>
          <div className="hero-inner">
            <div>
              <div className="hero-tag">🏫 Dalmiyanagar's Most Trusted School</div>
              <h1 className="hero-h1">
                Where Every Child<br/>is a <span className="grad">Star ✨</span>
              </h1>
              <p className="hero-sub">English medium school from Nursery to Class 5 — safe, caring, and designed to make your child <strong>love learning</strong>. <em>Admissions Open!</em></p>
              <div className="hero-stats">
                {[{n:"1000+",l:"Happy Students"},{n:"15+",l:"Years Experience"},{n:"100%",l:"Parent Trust"},{n:"20+",l:"Expert Teachers"}].map(s=>(
                  <div key={s.l} className="stat-chip"><div className="stat-n">{s.n}</div><div className="stat-l">{s.l}</div></div>
                ))}
              </div>
              <div className="hero-btns">
                <button className="btn-p" onClick={()=>scrollTo("admission")}>Book a School Visit</button>
                <a href={TEL} className="btn-g">📞Call Now</a>
                <button className="btn-game" onClick={openQuiz}>Know Your Child's Talent</button>
              </div>
            </div>
            {/* School photo on desktop right column */}
            <div className="hero-photo-half" style={{borderRadius:24,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.14)",border:"3px solid #fff"}}>
              <img src={lp(SCHOOL_PHOTO)} alt="Nandini Kids Academy campus" style={{width:"100%",height:320,objectFit:"cover",display:"block"}}
                onError={e=>{e.currentTarget.style.display="none"}}/>
            </div>
          </div>
          {/* School photo below on mobile */}
          <div style={{marginTop:32,borderRadius:22,overflow:"hidden",boxShadow:"0 14px 44px rgba(0,0,0,.12)",border:"3px solid #fff",display:"block"}} className="hero-photo-half-mob">
            <img src={lp(SCHOOL_PHOTO)} alt="Nandini Kids Academy" style={{width:"100%",maxHeight:240,objectFit:"cover",display:"block"}}
              onError={e=>{e.currentTarget.parentElement!.style.display="none"}}/>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="sec" style={{background:"#fff",position:"relative",overflow:"hidden"}}>
        {/* Kid running GIF — runs into the section from right, above the heading */}
        <div className="kid-running-wrap">
          <img src={lp(KID_RUNNING_GIF)} alt="" aria-hidden style={{width:"100%",height:"auto",display:"block"}}/>
        </div>
        <div className="inner rel">
          <div className="sec-tag">👩‍🏫 Why Parents Choose Us</div>
          <h2 className="sec-h2">School jahan bache khud<br/>daur ke aana chahe! 🎉</h2>
          <p className="sec-p">From safety to spoken English — we've thought of everything so you don't have to.</p>
          <div className="why-grid">
            {[
              {icon:"👩‍🏫",title:"Caring Teachers",    desc:"20+ dedicated teachers jo bachon ko samjhate hain pyaar se",     color:"#FFE0F7"},
              {icon:"🛡️", title:"CCTV 24/7 Security", desc:"Full campus surveillance — every corner is watched",              color:"#E0F4FF"},
              {icon:"🚌", title:"Safe Transport",      desc:"Door-to-door GPS-tracked pickup & drop",                          color:"#FFF3E0"},
              {icon:"🗣️", title:"Spoken English",      desc:"Confident communication — har baccha bolega fluently",            color:"#E8F5E9"},
              {icon:"🎨", title:"Activity Learning",   desc:"Khel khel mein sikhaate hain — padhai bojh nahi, khel hai!",     color:"#F3E5F5"},
              {icon:"💧", title:"Hygiene & Safety",    desc:"RO water, clean separate toilets, female staff for small kids",  color:"#E0F7FA"},
            ].map(f=>(
              <div key={f.title} className="why-card" style={{background:f.color}}>
                <div className="why-icon">{f.icon}</div>
                <div className="why-title">{f.title}</div>
                <div className="why-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT (Principal + Teachers) ── */}
      <section id="about" className="sec" style={{background:"linear-gradient(160deg,#fff5fb,#f4f0ff)"}}>
        <div className="blob" style={{background:"var(--pink)",width:300,height:300,top:-80,right:-60}}/>
        <div className="inner rel">
          <div className="sec-tag">🏫 About the School</div>
          <h2 className="sec-h2">Every child is special.<br/>Every child is a star. 🌟</h2>
          <div className="principal-inner" style={{marginTop:36}}>
            <div>
              {/* Principal quote card */}
              <div className="principal-card">
                <div className="principal-row">
                  <img className="principal-photo" src={lp(PRINCIPAL_FILE)} alt="Principal, Nandini Kids Academy"
                    onError={e=>{
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const next = img.nextElementSibling as HTMLElement | null;
                      if (next) next.style.display = "flex";
                    }}/>
                  <div className="principal-photo-fallback" style={{display:"none"}}>👩‍💼</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:"1.05rem",color:"var(--ink)"}}>Principal & Director</div>
                    <div style={{fontSize:".82rem",color:"#888"}}>Nandini Kids 'N' Academy</div>
                  </div>
                </div>
                <p className="principal-quote">
                  "We don't just teach — we install values in children. Here, every child is special, every child is a star. Along with quality education and meaningful academic outcomes, we also teach Indian values."
                </p>
                <div className="principal-by">— Principal & Director, Nandini Kids Academy</div>
              </div>
              {/* Teacher group photo */}
              <div className="photo-strip">
                <img src={lp(TEACHERS_PHOTO)} alt="Nandini Kids Academy teachers and staff"
                  style={{width:"100%",maxHeight:220,objectFit:"cover",display:"block"}}
                  onError={e=>{e.currentTarget.parentElement!.style.display="none"}}/>
                <div className="photo-caption">Hamari dedicated teacher community — bachon ka dusra parivaar 💛</div>
              </div>
            </div>
            <div>
              <div className="about-stats">
                {[{n:"Since 2019",l:"Established"},{n:"1000+",l:"Students"},{n:"20+",l:"Teachers"},{n:"100%",l:"Safe Campus"}].map(s=>(
                  <div key={s.l} className="about-stat"><div className="about-stat-n">{s.n}</div><div className="about-stat-l">{s.l}</div></div>
                ))}
              </div>
              <div style={{marginTop:24,background:"linear-gradient(135deg,var(--yellow),var(--orange))",borderRadius:22,padding:"28px 22px",color:"#1a1a2e"}}>
                <div style={{fontSize:"3rem",marginBottom:12,textAlign:"center"}} >🎓</div>
                <h3 className="brand" style={{fontSize:"1.4rem",marginBottom:10,textAlign:"center"}}>Our Achievements</h3>
                <p style={{fontSize:".95rem",lineHeight:1.7,textAlign:"center",opacity:.88}}>Since 2019, we have successfully transformed thousands of children into confident, successful individuals with strong English and Indian values.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="sec" style={{background:"#fff",position:"relative",overflow:"hidden"}}>
        {/* Horse GIF — top right corner of gallery section */}
        <div className="horse-wrap">
          <img src={lp(HORSE_GIF)} alt="" aria-hidden style={{width:"100%",height:"auto",display:"block"}}/>
        </div>
        <div className="inner rel">
          <div className="sec-tag">📸 School Life</div>
          <h2 className="sec-h2">Celebrations & Moments 🎊</h2>
          <p className="sec-p">Har celebration ke photos — kyunki padhai ke saath khushi bhi zaroori hai!</p>
          <div className="gal-grid">
            {GALLERY_ALBUMS.map(a=>(
              <div key={a.id} className="gal-card" onClick={()=>openAlbum(a)}
                style={{background:`${a.color}22`}}>
                <img src={lp(a.images[0])} alt={a.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                  onError={e=>{
                    e.currentTarget.style.display="none";
                    e.currentTarget.parentElement!.style.background=`${a.color}33`;
                    e.currentTarget.parentElement!.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;"><div style="font-size:3rem">${a.emoji}</div><div style="font-weight:800;color:${a.color};font-size:.88rem">${a.title}</div></div>`;
                  }}/>
                <div className="gal-overlay">
                  <div className="gal-overlay-title">{a.title}</div>
                  <div className="gal-overlay-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:28}}>
            <button className="btn-orange" onClick={()=>setPage("gallery")}>Explore Full Gallery →</button>
            <p style={{marginTop:12,fontSize:".85rem",color:"#888"}}>Activity-wise albums — har celebration ke saari photos ek jagah</p>
          </div>
        </div>
        {lb&&<GalleryLightbox album={lb.album} index={lb.index} onClose={()=>setLb(null)} onPrev={lbPrev} onNext={lbNext}/>}
      </section>

      {/* ── ACADEMICS ── */}
      <section id="academics" className="sec" style={{background:"linear-gradient(160deg,#f0fff4,#f0f4ff)"}}>
        <div className="inner">
          <div className="sec-tag">📚 Academics</div>
          <h2 className="sec-h2">English Medium, Strong Foundation 🎓</h2>
          <p className="sec-p">Nursery to Class 5 — quality education aur holistic development at every step.</p>
          <div className="academics-inner" style={{marginTop:36}}>
            <div style={{background:"linear-gradient(135deg,var(--teal),#006064)",borderRadius:22,padding:"28px 22px",color:"#fff"}}>
              <h3 className="brand" style={{marginBottom:16,fontSize:"1.3rem"}}>Classes Available</h3>
              <div className="cls-grid">
                {["Nursery","LKG","UKG","Class 1","Class 2","Class 3","Class 4","Class 5"].map(c=>(
                  <div key={c} className="cls-chip">{c}</div>
                ))}
              </div>
            </div>
            <div>
              {[
                {icon:"🎨",title:"Activity-Based Learning",desc:"Khel khel mein — no boring lectures. Fun is the method!",bg:"#FFE4F7"},
                {icon:"📝",title:"Regular Tests & Feedback", desc:"Monthly progress tracking so parents always know",        bg:"#E4F0FF"},
                {icon:"👥",title:"Personal Attention",       desc:"Small batches — every child is a star, always!",          bg:"#E8FFE4"},
                {icon:"💻",title:"Computer Lab",             desc:"Updated computers + CAL software from early classes",     bg:"#FFF3E0"},
              ].map(t=>(
                <div key={t.title} className="approach-item" style={{background:t.bg}}>
                  <div className="approach-icon">{t.icon}</div>
                  <div>
                    <div className="approach-title">{t.title}</div>
                    <div className="approach-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFETY / INFRASTRUCTURE ── */}
      <section id="safety" className="sec" style={{background:"#fff"}}>
        <div className="inner">
          {/* Campus photo */}
          <div className="photo-strip" style={{marginBottom:40}}>
            <img src={lp(SCHOOL_PHOTO)} alt="Nandini Kids Academy campus and facilities"
              style={{width:"100%",maxHeight:300,objectFit:"cover",display:"block"}}
              onError={e=>{e.currentTarget.parentElement!.style.display="none"}}/>
            <div className="photo-caption">A campus designed with safety, cleanliness, and full of life 🏗️</div>
          </div>
          <div className="sec-tag">🛡️ Safety & Facilities</div>
          <h2 className="sec-h2">Our Facilities — Built for Your Child</h2>
          <div className="safety-grid">
            {[
              {icon:"📹",title:"24/7 CCTV",         desc:"Every corner monitored",      color:"#FFE4E1"},
              {icon:"👩‍🏫",title:"Female Staff",      desc:"For small kids, always",      color:"#FFE4F7"},
              {icon:"🚽",title:"Clean Toilets",      desc:"Separate boys & girls",       color:"#E4F0FF"},
              {icon:"💧",title:"RO Drinking Water",  desc:"Hygienic & safe",             color:"#E4FFF5"},
              {icon:"🚌",title:"GPS Transport",      desc:"Trained, sincere drivers",    color:"#FFF3E0"},
              {icon:"🏗️",title:"Secured Walls",      desc:"Strong boundary protection",  color:"#F3E5F5"},
            ].map(f=>(
              <div key={f.title} className="safety-card" style={{background:f.color}}>
                <div className="safety-icon">{f.icon}</div>
                <div className="safety-title">{f.title}</div>
                <div style={{fontSize:".78rem",color:"#777",marginTop:4}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec" style={{background:"linear-gradient(160deg,#fff5fb,#f4f0ff,#f0fff8)"}}>
        <div className="blob" style={{background:"var(--teal)",width:250,height:250,bottom:-60,left:-60}}/>
        <div className="inner rel">
          <div className="sec-tag">🗣️ Parents Say</div>
          <h2 className="sec-h2">Real Words from Real Parents ❤️</h2>
          <div className="testi-grid">
            {[
              {name:"Sunita Devi",  stars:5, quote:"Mere bacche ki padhai 6 mahine mein bahut improve hui. Teacher bahut caring hain aur daily update dete hain.",             color:"#FFE4F7"},
              {name:"Rajesh Kumar", stars:5, quote:"Transport facility bahut achhi hai. Ghar se school tak safe delivery — bilkul sahi school hai!",                        color:"#E4F0FF"},
              {name:"Priya Singh",  stars:5, quote:"Computer lab dekh ke khushi hui. Principal sir khud itna dhyan dete hain ki har baccha advance ho jaata hai.",           color:"#E4FFF5"},
              {name:"Kavita Kumari",stars:5, quote:"Meri beti pehle shy thi, ab confident ho gayi. Speaking skills bahut develop hui hain — parents as parents we say thanks!",color:"#FFF3E0"},
            ].map(t=>(
              <div key={t.name} className="testi-card" style={{background:t.color}}>
                <div className="testi-stars">{"⭐".repeat(t.stars).split("").map((_,i)=><span key={i}>⭐</span>)}</div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-name">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMISSION ── */}
      <section id="admission" className="sec" style={{background:"#fff"}}>
        <div className="inner">
          <div className="sec-tag">🎯 Admission Process</div>
          <h2 className="sec-h2">Join in 4 Simple Steps ✅</h2>
          <p className="sec-p">No scary exams. Just a friendly interaction — and your child's journey begins!</p>
          <div className="steps-grid">
            {STEPS.map(s=>(
              <div key={s.n} className="step-card">
                <div className="step-n" style={{background:s.color}}>{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:32,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
            <a href={TEL} className="btn-p">Start Today — Seats Filling Fast!</a>
            <button className="btn-g" onClick={()=>scrollTo("contact")}>📋 Online Enquiry Form</button>
          </div>
        </div>
      </section>

      {/* ── CTA + FORM + MAP ── */}
      <section id="contact" className="sec" style={{background:"linear-gradient(160deg,#fff5fb,#f4f0ff)"}}>
        <div className="inner">
          <div className="cta-band">
            <div className="blob" style={{background:"rgba(255,255,255,.15)",width:300,height:300,top:-80,left:-80,filter:"blur(40px)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"2.5rem",marginBottom:10}}>🚨</div>
              <h2>Admissions Open! Limited Seats</h2>
              <p>Call or WhatsApp now — seats are filling fast for 2025–26!</p>
              <div className="cta-btns">
                <a href={TEL} className="btn-white">📞 Call Now — {PHONE_DISP}</a>
                <a href={WA_ADMIT} className="btn-wa">💬 WhatsApp Kijiye</a>
              </div>
            </div>
          </div>
          <div className="form-wrap">
            <h3 className="brand" style={{fontSize:"1.4rem",color:"var(--ink)",marginBottom:22,textAlign:"center"}}>📋 Quick Enquiry Form</h3>
            <EnquiryForm/>
          </div>
          <div className="map-wrap">
            <iframe title="Nandini Kids Academy Location"
              src="https://www.google.com/maps?q=Dalmiyanagar+Rohtas+Bihar&output=embed"
              width="100%" height="320" style={{border:0,display:"block"}}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:16}}>
            <a href="https://maps.google.com/?q=Dalmiyanagar+Rohtas+Bihar" target="_blank" rel="noreferrer" className="btn-p">🗺️ Get Directions</a>
            <a href={TEL} className="btn-g">📞 Call for Directions</a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec" style={{background:"#fff"}}>
        <div className="inner" style={{maxWidth:720}}>
          <div className="sec-tag">❓ FAQ</div>
          <h2 className="sec-h2">Parents Ke Common Sawal 🤔</h2>
          <div style={{marginTop:32}}>
            {FAQS.map(f=><FAQ key={f.q} q={f.q} a={f.a}/>)}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY PAGE
// ─────────────────────────────────────────────────────────────────────────────
function GalleryPage({ setPage }: { setPage: SetPage }) {
  const [lb, setLb] = useState<LightboxState | null>(null);
  const lbPrev = () => setLb(s => s ? { ...s, index: (s.index - 1 + s.album.images.length) % s.album.images.length } : s);
  const lbNext = () => setLb(s => s ? { ...s, index: (s.index + 1) % s.album.images.length } : s);
  useEffect(()=>{window.scrollTo(0,0)},[]);
  return(
    <main>
      <Breadcrumb label="Gallery" setPage={setPage}/>
      <div className="page-hero">
        <div className="sec-tag" style={{margin:"0 auto 12px"}}>📸 Photo Gallery</div>
        <h1>Activities & Celebrations</h1>
        <p>Har activity ke photos alag album mein hain. Tap karo aur saari memories dekhein!</p>
      </div>
      <section className="sec" style={{background:"#fff"}}>
        <div className="inner">
          <div className="gal-grid">
            {GALLERY_ALBUMS.map(a=>(
              <div key={a.id} className="gal-card" onClick={()=>setLb({album:a,index:0})} style={{background:`${a.color}22`}}>
                <img src={lp(a.images[0])} alt={a.title}
                  style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                  onError={e=>{
                    e.currentTarget.style.display="none";
                    e.currentTarget.parentElement!.innerHTML=`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;background:${a.color}22"><div style="font-size:3.5rem">${a.emoji}</div><div style="font-weight:800;color:${a.color};font-size:.95rem">${a.title}</div><div style="font-size:.75rem;color:#888">${a.desc}</div></div>`;
                  }}/>
                <div className="gal-overlay">
                  <div className="gal-overlay-title">{a.title}</div>
                  <div className="gal-overlay-desc">{a.desc} · {a.images.length} photo{a.images.length!==1?"s":""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {lb&&<GalleryLightbox album={lb.album} index={lb.index} onClose={()=>setLb(null)} onPrev={lbPrev} onNext={lbNext}/>}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTICE BOARD PAGE
// ─────────────────────────────────────────────────────────────────────────────
function NoticesPage({ setPage }: { setPage: SetPage }) {
  const [filter,setFilter]=useState("All");
  useEffect(()=>{window.scrollTo(0,0)},[]);
  const cats=["All","Admission","Exam","Holiday","Event","General","Fee"];
  const shown=filter==="All"?NOTICES:NOTICES.filter(n=>n.category===filter);
  return(
    <main>
      <Breadcrumb label="Notice Board" setPage={setPage}/>
      <div className="page-hero">
        <div className="sec-tag" style={{margin:"0 auto 12px"}}>📢 Notice Board</div>
        <h1>Latest Notices & Announcements</h1>
        <p>School ke saare updates ek jagah — admissions, exams, events aur zyaada!</p>
      </div>
      <section className="sec" style={{background:"#fff"}}>
        <div className="inner" style={{maxWidth:820}}>
          <div style={{background:"#E8FBF5",border:"2px solid #52C9A8",borderRadius:12,padding:"10px 18px",marginBottom:24,display:"inline-block",fontSize:".82rem",color:"#1a6e54",fontWeight:700}}>
            ✅ Showing {shown.length} notices · Last updated: March 2025
          </div>
          <div className="cat-filters">
            {cats.map(c=>(
              <button key={c} className={`cat-filter${filter===c?" active":""}`} onClick={()=>setFilter(c)}>{c}</button>
            ))}
          </div>
          {shown.map((n,i)=>{
            const cs=CAT_STYLE[n.category as NoticeCategory]||{bg:"#f0f0f0",color:"#555"};
            return(
              <div key={i} className={`notice-card${n.important?" imp":""}`}>
                <div className="notice-head">
                  <div>
                    <span className="cat-pill" style={{background:cs.bg,color:cs.color,border:`1.5px solid ${cs.color}33`}}>{n.category}</span>
                    {n.important&&<span className="imp-badge">⚡ Important</span>}
                    <div className="notice-title" style={{marginTop:4}}>{n.title}</div>
                  </div>
                  <div className="notice-date">📅 {n.date}</div>
                </div>
                <p className="notice-body">{n.body}</p>
              </div>
            );
          })}
          <div style={{background:"linear-gradient(135deg,#E8FBF5,#E4F8FD)",border:"2px solid #52C9A8",borderRadius:16,padding:"20px 24px",textAlign:"center",marginTop:24}}>
            <p style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.05rem",color:"#1A5E7A",fontWeight:700,marginBottom:12}}>📲 Get Notices on WhatsApp!</p>
            <p style={{fontSize:".87rem",color:"#555",marginBottom:16}}>School updates seedhe aapke phone pe.</p>
            <a href={WA("Namaste! Mujhe school notices WhatsApp pe chahiye.")} className="btn-wa" style={{padding:"12px 26px"}}>💬 Join WhatsApp Group</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MANDATORY DISCLOSURE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function DisclosurePage({ setPage }: { setPage: SetPage }) {
  useEffect(()=>{window.scrollTo(0,0)},[]);
  return(
    <main>
      <Breadcrumb label="Mandatory Disclosure" setPage={setPage}/>
      <div className="page-hero">
        <div className="sec-tag" style={{margin:"0 auto 12px"}}>📄 Mandatory Disclosure</div>
        <h1>Mandatory Disclosure</h1>
        <p>School ki official information as per regulatory requirements.</p>
      </div>
      <section className="sec" style={{background:"#fff"}}>
        <div className="inner" style={{maxWidth:820}}>
          {MANDATORY_DISCLOSURE.map(sec=>(
            <div key={sec.section} className="disc-section">
              <div className="disc-section-head">{sec.section}</div>
              <table className="disc-table">
                <tbody>
                  {sec.items.map(([k,v])=>(
                    <tr key={k}><td>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <div style={{background:"rgba(124,77,255,.06)",borderRadius:16,padding:"20px 22px",border:"1.5px solid rgba(124,77,255,.2)",marginTop:8}}>
            <p style={{fontSize:".85rem",color:"#666",lineHeight:1.7}}>
              📌 <strong>Note:</strong> For certified copies of any documents, please visit the school office during working hours (Monday–Saturday, 9 AM–3 PM) or contact us at {PHONE_DISP}.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ label, setPage }: { label: string; setPage: SetPage }) {
  return(
    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        <button onClick={()=>setPage("home")}>🏫 Home</button>
        <span style={{margin:"0 8px",opacity:.4}}>›</span>
        <span style={{color:"var(--ink)"}}>{label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP — client-side router + shared Nav/Footer
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<PageId>("home");
  const [quiz, setQuiz] = useState(false);

  // Smooth scroll to section on home page
  const scrollTo = useCallback((id: string) => {
    const el=document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
  },[]);

  // Lock body scroll when quiz/modal open
  useEffect(()=>{document.body.style.overflow=quiz?"hidden":""},[quiz]);

  // Keyboard ESC closes quiz
  useEffect(()=>{
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setQuiz(false); };
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[]);

  return(
    <>
      <style>{GLOBAL_CSS}</style>
      {/* extra inline style for mobile hero photo */}
      <style>{`
        .hero-photo-half-mob{display:block}
        @media(min-width:768px){.hero-photo-half-mob{display:none!important}.hero-photo-half{display:block!important}}
        .hero-photo-half{display:none}
      `}</style>

      <Nav page={page} setPage={setPage} scrollTo={scrollTo}/>

      {page==="home"     && <HomePage    setPage={setPage} scrollTo={scrollTo} openQuiz={()=>setQuiz(true)}/>}
      {page==="gallery"  && <GalleryPage setPage={setPage}/>}
      {page==="notices"  && <NoticesPage setPage={setPage}/>}
      {page==="disclosure"&&<DisclosurePage setPage={setPage}/>}

      <Footer setPage={setPage} scrollTo={scrollTo}/>

      {/* Sticky bottom bar */}
      <div className="sticky-bar">
        <a href={TEL} className="sb-call">📞 Call</a>
        <a href={WA_DEFAULT} className="sb-wa">💬 WhatsApp</a>
        <button className="sb-enq" onClick={()=>{setPage("home");requestAnimationFrame(()=>setTimeout(()=>scrollTo("contact"),80))}}>📋 Enquire</button>
      </div>

      {quiz&&<Quiz onClose={()=>setQuiz(false)} goTo={(id: string)=>{setPage("home");requestAnimationFrame(()=>setTimeout(()=>scrollTo(id),80))}}/>}
    </>
  );
}