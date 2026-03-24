import Link from "next/link";
import type { Metadata } from "next";
import { phoneDisplay, waWithText } from "@/config/contact";

export const metadata: Metadata = {
  title: "Notice Board | Nandini Kids 'N' Academy",
  description: "Latest notices, circulars, and announcements from Nandini Kids 'N' Academy, Dehri, Rohtas, Bihar.",
};

type Category = "Admission" | "Exam" | "Holiday" | "Event" | "General" | "Fee";

const CATEGORY_STYLE: Record<Category, { bg: string; color: string }> = {
  Admission: { bg: "#E4F8FD", color: "#1A5E7A" },
  Exam:      { bg: "#FFF0F5", color: "#9B1A5A" },
  Holiday:   { bg: "#FFFBEA", color: "#7a5800" },
  Event:     { bg: "#E8FBF5", color: "#1a6e54" },
  General:   { bg: "#F0EEFF", color: "#4A1A8A" },
  Fee:       { bg: "#FFF3E6", color: "#a84e00" },
};

const notices: { date: string; title: string; body: string; category: Category; important?: boolean }[] = [
  {
    date: "20 Mar 2025",
    title: "Admissions Open for Session 2025–26",
    body: `Nandini Kids 'N' Academy mein Nursery se Class V tak ke liye admissions shuru ho gaye hain. Limited seats available. Jaldi contact karein — 📞 ${phoneDisplay}. No entrance test, just a friendly interaction!`,
    category: "Admission",
    important: true,
  },
  {
    date: "15 Mar 2025",
    title: "Annual Day Celebration — 28 March 2025",
    body: "Hamare school ka Annual Day function 28 March 2025 ko hoga. Saare parents ko invite kiya jaata hai. Bacche songs, dances aur skits perform karenge. Time: 10:00 AM onwards. Venue: School Campus.",
    category: "Event",
    important: true,
  },
  {
    date: "10 Mar 2025",
    title: "Unit Test 1 Schedule — March 2025",
    body: "Class I se Class V ke liye Unit Test 1 ka schedule jari kiya gaya hai. Test dates: 24 Mar (English), 25 Mar (Maths), 26 Mar (EVS/Hindi). Parents please bacchon ko prepare karein.",
    category: "Exam",
  },
  {
    date: "05 Mar 2025",
    title: "Holi Holiday Notice",
    body: "School will remain closed on 13th & 14th March 2025 on account of Holi festival. Sabko Holi ki hardik shubhkaamnaayein! 🌈 School reopens 17th March (Monday).",
    category: "Holiday",
  },
  {
    date: "01 Mar 2025",
    title: "Parent-Teacher Meeting — 8 March 2025",
    body: "Class I se V ke liye Parent-Teacher Meeting 8 March 2025 (Saturday) ko hogi. Timing: 9:00 AM – 12:00 PM. Please apne bacche ki progress card lene zaroor aayein. Bina appointment ke bhi welcome hain!",
    category: "General",
    important: true,
  },
  {
    date: "22 Feb 2025",
    title: "Fee Payment Reminder — Last Date 28 Feb",
    body: "February month ki fees ka last date 28 February 2025 hai. Late fine from 1st March. Payment modes: cash at school office (Mon–Sat, 9 AM – 3 PM). Kisi bhi samasya ke liye office se sampark karein.",
    category: "Fee",
  },
  {
    date: "14 Feb 2025",
    title: "Republic Day Celebration Photos",
    body: "26 January Republic Day celebration ke photos school notice board pe laga diye gaye hain. Jald hi website/WhatsApp group pe bhi share kiye jayenge. Bacchon ne bahut achha perform kiya! 🇮🇳",
    category: "Event",
  },
  {
    date: "10 Feb 2025",
    title: "New Books Distribution — Session 2025–26",
    body: "New session ke liye books ki list jari ki ja rahi hai. Books school se hi milenge — bahar se khareedne ki zarurat nahi. Distribution date alag se bataya jayega. List ke liye office se contact karein.",
    category: "General",
  },
  {
    date: "01 Feb 2025",
    title: "Computer Lab Upgraded",
    body: "Humne apna Computer Lab upgrade kar diya hai. Ab 8 naye functional PCs hain aur updated CAL software. Bacchon ko ab aur better digital learning experience milegi. 💻",
    category: "General",
  },
  {
    date: "20 Jan 2025",
    title: "Sports Day — 5 February 2025",
    body: "Annual Sports Day 5 February 2025 ko school campus mein hoga. Saare students participate karenge. Parents ko bhi invite kiya jaata hai. Events include: 50m race, sack race, tug of war aur aur bahut kuch!",
    category: "Event",
  },
];

export default function NoticeBoard() {
  const cats = ["All", "Admission", "Exam", "Holiday", "Event", "General", "Fee"] as const;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700;800&family=Poppins:wght@400;500;600&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        h1,h2,h3 { font-family: 'Baloo 2', cursive; }
        .nb-wrap { max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }
        .notice-card {
          background: #fff; border-radius: 16px; padding: 22px 24px;
          box-shadow: 0 3px 18px rgba(0,0,0,.07); margin-bottom: 16px;
          border-left: 5px solid transparent;
          transition: box-shadow .22s, transform .22s;
        }
        .notice-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,.12); transform: translateY(-2px); }
        .notice-card.important { border-left-color: #FF9944; }
        .notice-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
        .notice-title { font-family: 'Baloo 2', cursive; font-size: 1.05rem; color: #1A3A4A; font-weight: 700; }
        .notice-date  { font-size: .75rem; color: #888; white-space: nowrap; padding-top: 3px; }
        .notice-body  { font-size: .87rem; color: #555; line-height: 1.7; }
        .cat-pill { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 14px; font-size: .72rem; font-weight: 700; margin-bottom: 8px; }
        .imp-badge { background: #FFF3E6; color: #a84e00; border: 1.5px solid #FF9944; font-size: .7rem; font-weight: 700; padding: 2px 9px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px; }
        .cat-filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .cat-filter { padding: 6px 14px; border-radius: 20px; border: 2px solid #E4F8FD; background: #fff; font-family: 'Poppins', sans-serif; font-size: .78rem; font-weight: 600; cursor: pointer; color: #444; transition: all .18s; }
        .cat-filter:hover, .cat-filter.active { background: #4FC3D8; border-color: #4FC3D8; color: #fff; }
        @media(max-width:600px){
          .nb-wrap { padding: 20px 14px 60px; }
          .notice-card { padding: 16px 18px; }
          .notice-title { font-size: .97rem; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ background: "#E4F8FD", padding: "12px 20px", borderBottom: "2px solid #B8E8F5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: ".82rem", color: "#1A5E7A", fontWeight: 600 }}>
          <Link href="/" style={{ color: "#1A5E7A", textDecoration: "none" }}>🏫 Home</Link>
          <span style={{ margin: "0 8px", opacity: .5 }}>›</span>
          Notice Board
        </div>
      </div>

      <div className="nb-wrap">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ color: "#1A5E7A", fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>📢 Notice Board</h1>
          <p style={{ color: "#6A6A6A", marginTop: 8, fontSize: ".92rem" }}>
            Latest announcements from Nandini Kids &apos;N&apos; Academy
          </p>
          <div style={{ background: "#E8FBF5", border: "2px solid #52C9A8", borderRadius: 12, padding: "9px 18px", marginTop: 14, display: "inline-block", fontSize: ".82rem", color: "#1a6e54", fontWeight: 600 }}>
            ✅ Showing {notices.length} notices · Last updated: March 2025
          </div>
        </div>

        {/* Category filter chips — visual only (static render) */}
        <div className="cat-filter-row">
          {cats.map((cat) => (
            <span key={cat} className={`cat-filter${cat === "All" ? " active" : ""}`}>{cat}</span>
          ))}
          <span style={{ fontSize: ".76rem", color: "#999", alignSelf: "center", marginLeft: 4 }}>
            (Add JS filtering as needed)
          </span>
        </div>

        {/* Notices list */}
        {notices.map((n, i) => {
          const cs = CATEGORY_STYLE[n.category];
          return (
            <div key={i} className={`notice-card${n.important ? " important" : ""}`}>
              <div className="notice-head">
                <div>
                  <span className="cat-pill" style={{ background: cs.bg, color: cs.color, border: `1.5px solid ${cs.color}33` }}>
                    {n.category}
                  </span>
                  {n.important && (
                    <span className="imp-badge" style={{ marginLeft: 8 }}>⚡ Important</span>
                  )}
                  <div className="notice-title">{n.title}</div>
                </div>
                <div className="notice-date">📅 {n.date}</div>
              </div>
              <p className="notice-body">{n.body}</p>
            </div>
          );
        })}

        {/* Placeholder for more notices */}
        <div style={{ textAlign: "center", padding: "24px", background: "#F8F8F8", borderRadius: 16, border: "2px dashed #ddd", marginBottom: 32 }}>
          <p style={{ color: "#aaa", fontSize: ".88rem", fontWeight: 600 }}>
            📝 Add more notices here as needed<br />
            <span style={{ fontWeight: 400, fontSize: ".82rem" }}>Connect this to a CMS or Google Sheets for easy updating</span>
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div style={{ background: "linear-gradient(135deg,#E8FBF5,#E4F8FD)", border: "2px solid #52C9A8", borderRadius: 16, padding: "20px 24px", textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: "'Baloo 2',cursive", fontSize: "1.05rem", color: "#1A5E7A", fontWeight: 700, marginBottom: 12 }}>
            📲 Get Notices Directly on WhatsApp!
          </p>
          <p style={{ fontSize: ".87rem", color: "#555", marginBottom: 16 }}>
            School updates seedhe aapke phone pe. Join our WhatsApp group or save our number.
          </p>
          <a href={waWithText("Namaste! Mujhe school notices WhatsApp pe chahiye.")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#25D366", color: "#fff", padding: "12px 26px",
              borderRadius: 50, fontFamily: "'Baloo 2',cursive", fontWeight: 700,
              fontSize: ".95rem", textDecoration: "none",
              boxShadow: "0 4px 14px rgba(37,211,102,.3)",
            }}>
            💬 Join WhatsApp Group
          </a>
        </div>

        {/* Back button */}
        <div style={{ textAlign: "center" }}>
          <Link href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg,#4BBFE3,#2888A8)", color: "#fff",
              padding: "13px 28px", borderRadius: 50, fontFamily: "'Baloo 2',cursive",
              fontWeight: 700, fontSize: "1rem", boxShadow: "0 4px 16px rgba(75,191,227,.35)",
              textDecoration: "none",
            }}>
            ← Back to School Website
          </Link>
        </div>
      </div>
    </>
  );
}
