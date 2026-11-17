import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview image (LinkedIn, WhatsApp, X…) generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #020617 0%, #0F172A 55%, #1E3A8A 100%)",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2563EB, #38BDF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 26, color: "#94A3B8" }}>Portfolio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: "#CBD5E1", marginTop: 16, maxWidth: 1000 }}>
            Informatics Engineering Student · IT Project Management · System Analysis · Data & AI
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#38BDF8" }}>
          {profile.education.university} · {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
