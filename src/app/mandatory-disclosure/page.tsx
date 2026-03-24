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

        {/* A: GENERAL INFORMATION */}
        <SectionTitle>A. General Information</SectionTitle>
        <table style={tableStyle}>
          <tbody>
            <Row label="School Name"            value="Nandini Kids 'N' Academy" highlight />
            <Row label="Affiliation No."         value="[To be updated — check CBSE affiliation certificate]" />
            <Row label="School Code"             value="[To be updated]" />
            <Row label="Complete Address"        value="Ward No. 5, Dehri Block, Rohtas District, Bihar — 821307" />
            <Row label="Principal / Manager"     value="[Principal Name] — Replace with actual name" />
            <Row label="Contact Number"          value={phoneDisplay} />
            <Row label="Email Address"           value="[school@email.com] — Replace with actual email" />
            <Row label="Website"                 value="[www.yourwebsite.com] — Replace with actual URL" />
            <Row label="Year of Establishment"   value="2010" highlight />
            <Row label="School Status"           value="Private Unaided" />
            <Row label="Type"                    value="Co-Educational (Boys & Girls)" />
            <Row label="Medium of Instruction"   value="English" />
            <Row label="Classes Offered"         value="Pre-Nursery, Nursery, LKG, UKG, Class I to Class V" highlight />
            <Row label="Affiliation Period"       value="[From Date] to [To Date] — check certificate" />
          </tbody>
        </table>

        {/* B: DOCUMENTS AND CERTIFICATES */}
        <SectionTitle>B. Documents &amp; Certificates</SectionTitle>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#F0FDFA" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: ".82rem", color: "#1a6e54", fontWeight: 700 }}>Document Name</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: ".82rem", color: "#1a6e54", fontWeight: 700 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <DocRow name="Copies of Society/Trust/Company Registration Certificate" status="Available" />
            <DocRow name="Copy of No Objection Certificate (NOC) from State Govt." status="Pending" />
            <DocRow name="Copy of Recognition Certificate under RTE Act, 2009" status="Available" />
            <DocRow name="Copy of Valid Building Safety Certificate from competent authority" status="Pending" />
            <DocRow name="Copy of Valid Fire Safety Certificate from competent authority" status="Pending" />
            <DocRow name="Copy of Self-Certification by School Principal" status="Available" />
            <DocRow name="Copy of Valid Water, Health and Sanitation Certificate" status="Pending" />
            <DocRow name="Copy of CBSE Affiliation / Extension of Affiliation Letter" status="Pending" />
          </tbody>
        </table>
        <p style={{ fontSize: ".78rem", color: "#888", marginTop: 8, paddingLeft: 4 }}>
          * &quot;Pending&quot; documents should be obtained and uploaded before CBSE affiliation application.
        </p>

        {/* C: STAFF INFORMATION */}
        <SectionTitle>C. Staff (Teaching) Information</SectionTitle>
        <table style={tableStyle}>
          <tbody>
            <Row label="Total No. of Teachers (Including PRT)"  value="13" highlight />
            <Row label="PGT (Post Graduate Teacher)"            value="[To be updated]" />
            <Row label="TGT (Trained Graduate Teacher)"         value="[To be updated]" />
            <Row label="PRT (Primary Teacher)"                  value="[To be updated]" />
            <Row label="Computer Instructor"                    value="1" />
            <Row label="Counsellor / Special Educator"          value="[To be updated]" />
            <Row label="No. of Administrative Staff"            value="[To be updated]" />
            <Row label="No. of Non-Teaching Staff"              value="[To be updated]" />
          </tbody>
        </table>

        {/* D: SCHOOL INFRASTRUCTURE */}
        <SectionTitle>D. School Infrastructure</SectionTitle>
        <table style={tableStyle}>
          <tbody>
            <Row label="Total Campus Area (in sq. mtrs.)"       value="[To be updated]" />
            <Row label="No. of Classrooms"                      value="10 (in good condition)" highlight />
            <Row label="No. of Labs — Computer"                 value="1 (with 8 functional PCs)" highlight />
            <Row label="No. of Labs — Science"                  value="[To be updated]" />
            <Row label="Library"                                value="Available (200+ books)" highlight />
            <Row label="Playground / Sports Area"               value="Available — outdoor playground" />
            <Row label="Boys' Toilets"                          value="Available" />
            <Row label="Girls' Toilets"                         value="Available" />
            <Row label="Drinking Water"                         value="Tap Water — Safe & Clean" />
            <Row label="Electricity"                            value="Available — Fully electrified" />
            <Row label="Boundary Wall"                          value="Pucca — Full boundary" />
            <Row label="Ramp for disabled"                      value="[To be updated]" />
          </tbody>
        </table>

        {/* E: RESULTS AND ACADEMICS */}
        <SectionTitle>E. Results &amp; Academics</SectionTitle>
        <table style={tableStyle}>
          <tbody>
            <Row label="Board / Pattern"                        value="CBSE Pattern" highlight />
            <Row label="Year of First Batch"                    value="2010" />
            <Row label="Pass Percentage (Last Academic Year)"   value="[To be updated with actual result]" />
            <Row label="No. of Students Appeared"               value="[To be updated]" />
            <Row label="No. of Students Passed"                 value="[To be updated]" />
          </tbody>
        </table>

        {/* F: FEE STRUCTURE */}
        <SectionTitle>F. Fee Structure</SectionTitle>
        <table style={tableStyle}>
          <tbody>
            <Row label="Nursery / LKG / UKG"    value="[To be updated — add actual fee]" />
            <Row label="Class I – Class III"     value="[To be updated — add actual fee]" />
            <Row label="Class IV – Class V"      value="[To be updated — add actual fee]" />
            <Row label="Transport Fee"           value="[To be updated — varies by area]" />
            <Row label="Admission Fee (One-time)" value="[To be updated]" />
            <Row label="Other Charges"           value="Nil — No hidden charges" highlight />
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
