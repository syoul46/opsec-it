import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "OPSEC-IT — Sylvestre MIGNOT, AIS | Sécurité & Infra pour Asso et PME";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fontRegular, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0F172A",
          padding: "60px 70px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* Blob décoratif bleu */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 52 }}>
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 14 }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ color: "white", fontSize: 34, fontWeight: 700 }}>OPSEC</span>
          <span style={{ color: "#2563EB", fontSize: 34, fontWeight: 700 }}>-IT</span>
        </div>

        {/* Nom */}
        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 18,
            letterSpacing: "-1px",
          }}
        >
          Sylvestre MIGNOT
        </div>

        {/* Titre */}
        <div
          style={{
            color: "#2563EB",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Administrateur d&apos;Infrastructures Sécurisées
        </div>
        <div
          style={{
            color: "#64748B",
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 44,
          }}
        >
          AIS · IPSSI Paris
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#CBD5E1",
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          Sécurité, administration d&apos;infrastructures et création web
          pour les associations et les PME.
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            {["Audit sécurité", "Administration", "Création web"].map((tag, i) => (
              <div
                key={tag}
                style={{
                  background: "rgba(37,99,235,0.15)",
                  border: "1px solid rgba(37,99,235,0.35)",
                  borderRadius: 24,
                  padding: "9px 22px",
                  color: "#93C5FD",
                  fontSize: 17,
                  fontWeight: 700,
                  marginRight: i < 2 ? 12 : 0,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: "#334155", fontSize: 20, fontWeight: 400 }}>
            opsec-it.fr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: fontRegular, style: "normal", weight: 400 },
        { name: "Geist", data: fontBold, style: "normal", weight: 700 },
      ],
    }
  );
}
