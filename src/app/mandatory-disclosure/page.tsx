import Link from "next/link";
import type { Metadata } from "next";
import { phoneDisplay } from "@/config/contact";

export const metadata: Metadata = {
  title: "Mandatory Disclosure | Nandini Kids 'N' Academy",
  description: "Mandatory public disclosure as per CBSE norms for Nandini Kids 'N' Academy, Dehri, Rohtas, Bihar.",
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <tr style={{ borderBottom: "1px solid #EEF8FF" }}>
    <td style={{ padding: "12px 16px", fontWeight: 600, color: "#444", width: "42%", fontSize: ".88rem", verticalAlign: "top" }}>
      {label}
    </td>
    <td style={{ padding: "12px 16px", color: highlight ? "#1A5E7A" : "#555", fontWeight: highlight ? 700 : 400, fontSize: ".88rem" }}>
      {value}
    </td>
  </tr>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: "linear-gradient(135deg,#4FC3D8,#52C9A8)",
    color: "#fff", fontFamily: "'Baloo 2', cursive",
    fontSize: "1.05rem", fontWeight: 700,
    padding: "12px 18px", borderRadius: "12px 12px 0 0",
    marginTop: 28,
  }}>
    {children}
  </div>
);

const DocRow = ({ name, status }: { name: string; status: "Available" | "Pending" | "N/A" }) => {
  const color = status === "Available" ? "#1a6e54" : status === "Pending" ? "#b85a00" : "#888";
  const bg    = status === "Available" ? "#E8FBF5"  : status === "Pending" ? "#FFF3E6"  : "#F5F5F5";
  return (
    <tr style={{ borderBottom: "1px solid #EEF8FF" }}>
      <td style={{ padding: "12px 16px", fontSize: ".87rem", color: "#444", width: "70%" }}>{name}</td>
      <td style={{ padding: "12px 16px" }}>
        <span style={{ background: bg, color, fontWeight: 700, fontSize: ".78rem", padding: "3px 10px", borderRadius: 20, border: `1.5px solid ${color}` }}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default function MandatoryDisclosure() {
  const tableStyle: React.CSSProperties = {
    width: "100%", borderCollapse: "collapse",
    background: "#fff", borderRadius: "0 0 12px 12px",
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,.07)",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700;800&family=Poppins:wght@400;500;600&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        h1,h2,h3 { font-family: 'Baloo 2', cursive; }
        tr:hover td { background: #FAFFFE; }
        .md-wrap { max-width: 860px; margin: 0 auto; padding: 40px 20px 80px; }
        @media(max-width:600px){
          .md-wrap { padding: 24px 14px 60px; }
          td { font-size: .82rem !important; padding: 10px 12px !important; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ background: "#E4F8FD", padding: "12px 20px", borderBottom: "2px solid #B8E8F5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", fontSize: ".82rem", color: "#1A5E7A", fontWeight: 600 }}>
          <Link href="/" style={{ color: "#1A5E7A", textDecoration: "none" }}>🏫 Home</Link>
          <span style={{ margin: "0 8px", opacity: .5 }}>›</span>
          Mandatory Disclosure
        </div>
      </div>

      <div className="md-wrap">
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ color: "#1A5E7A", fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>📋 Mandatory Public Disclosure</h1>
          <p style={{ color: "#6A6A6A", marginTop: 8, fontSize: ".92rem" }}>
            As per CBSE Affiliation Bye-Laws — Nandini Kids &apos;N&apos; Academy, Dehri, Rohtas, Bihar
          </p>
          <div style={{ background: "#FFFBEA", border: "2px solid #FFD166", borderRadius: 12, padding: "10px 18px", marginTop: 14, display: "inline-block", fontSize: ".82rem", color: "#7a5800", fontWeight: 600 }}>
            ⚠️ Replace all [placeholder] values with actual school data before publishing
          </div>
        </div>

       {/* A. General Information */}
<SectionTitle>A. General Information</SectionTitle>
<table style={tableStyle}>
  <tbody>
    <Row label="School Name" value="Nandini Kids 'N' Academy" highlight />
    <Row label="School Code" value="893439" highlight />
    <Row label="Address" value="Rajwarwa Bigha, Dalmianagar, Rohtas, Bihar — 821307" />
    <Row label="Contact Number" value={phoneDisplay} />
    <Row label="Email" value="school@email.com" />
    <Row label="Year of Establishment" value="2010" />
    <Row label="Classes Offered" value="Pre-Nursery to Class V" />
    <Row label="Affiliation No." value="[Update if available]" />
  </tbody>
</table>

{/* B. Documents */}
<SectionTitle>B. Documents</SectionTitle>
<table style={tableStyle}>
  <tbody>
    <DocRow name="Trust / Society Registration Certificate" status="Available" />
    <DocRow name="NOC from State Govt." status="Pending" />
    <DocRow name="Recognition Certificate (RTE)" status="Available" />
    <DocRow name="Fire Safety Certificate" status="Pending" />
    <DocRow name="Building Safety Certificate" status="Pending" />
  </tbody>
</table>

{/* C. Staff */}
<SectionTitle>C. Staff Information</SectionTitle>
<table style={tableStyle}>
  <tbody>
    <Row label="Total Teachers" value="13" highlight />
    <Row label="Non-Teaching Staff" value="[Update]" />
  </tbody>
</table>

{/* D. Infrastructure */}
<SectionTitle>D. Infrastructure</SectionTitle>
<table style={tableStyle}>
  <tbody>
    <Row label="Classrooms" value="10" highlight />
    <Row label="Library" value="Available" />
    <Row label="Playground" value="Available" />
    <Row label="Boys Toilets" value="Available" />
    <Row label="Girls Toilets" value="Available" />
    <Row label="Drinking Water" value="Available" />
  </tbody>
</table>

        {/* Back button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
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
