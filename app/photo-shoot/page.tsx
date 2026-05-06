"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { photoShootSessions, type PhotoShootSession } from "@/data/photoshoot-database";

// ─── Occasion colour mapping ───────────────────────────────────────────────────
const OCCASION_COLORS: Record<string, string> = {
  "Teej Celebration":       "#c9485b",
  "Private Gathering":      "#5b8fa8",
  "Birthday Celebration":   "#e8a838",
  "Anniversary Dinner":     "#9b59b6",
  "Corporate Lunch":        "#2ecc71",
  "Engagement Party":       "#e8567a",
  "Baby Shower":            "#f39c12",
  "Weekend Brunch":         "#52b788",
  "Family Day Out":         "#27ae60",
  "Professional Photo Shoot": "#c9a84c",
};

const OCCASION_ICONS: Record<string, string> = {
  "Teej Celebration":       "🪷",
  "Private Gathering":      "🍽️",
  "Birthday Celebration":   "🎂",
  "Anniversary Dinner":     "💑",
  "Corporate Lunch":        "💼",
  "Engagement Party":       "💍",
  "Baby Shower":            "🍼",
  "Weekend Brunch":         "☀️",
  "Family Day Out":         "👨‍👩‍👧‍👦",
  "Professional Photo Shoot": "📸",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PhotoShootPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [lightboxSession, setLightboxSession] = useState<PhotoShootSession | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lbClosing, setLbClosing] = useState(false);

  // Sort sessions newest-first
  const sessions = [...photoShootSessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const openLightbox = (session: PhotoShootSession, idx: number) => {
    setLightboxSession(session);
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLbClosing(true);
    setTimeout(() => {
      setLightboxSession(null);
      setLbClosing(false);
      document.body.style.overflow = "";
    }, 250);
  }, []);

  const goNext = useCallback(() => {
    if (!lightboxSession) return;
    setLightboxIndex((i) => (i + 1) % lightboxSession.images.length);
  }, [lightboxSession]);

  const goPrev = useCallback(() => {
    if (!lightboxSession) return;
    setLightboxIndex((i) => (i - 1 + lightboxSession.images.length) % lightboxSession.images.length);
  }, [lightboxSession]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, goNext, goPrev]);

  return (
    <>
      <Header />

      <main style={{ background: "linear-gradient(175deg,#0d2414 0%,#0a1f0d 50%,#0e2318 100%)", minHeight: "100vh", paddingTop: "70px" }}>

        {/* ── Hero Banner ──────────────────────────────────────────── */}
        <section style={{ padding: "5rem 1.5rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--gold)", marginBottom: "0.5rem" }}>
            Your Moments, Our Story
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Customer Photo Shoots
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.75)", fontSize: "1.05rem", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            A curated timeline of every special occasion celebrated at Green Yard — scroll through and relive the magic.
          </p>
          {/* Breadcrumb */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(183,228,199,0.5)" }}>
            <Link href="/" style={{ color: "rgba(183,228,199,0.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(183,228,199,0.5)")}>Home</Link>
            <span>›</span>
            <span style={{ color: "var(--gold-light)" }}>Photo Shoots</span>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
            {[
              { label: "Sessions", value: sessions.length },
              { label: "Photos", value: sessions.reduce((s, sess) => s + sess.images.length, 0) + "+" },
              { label: "Occasions", value: new Set(sessions.map(s => s.occasion)).size },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--gold-light)", lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: "rgba(183,228,199,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.3rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────────── */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>

          {/* Central spine */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: "2px", transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, rgba(82,183,136,0.4) 5%, rgba(82,183,136,0.4) 95%, transparent)",
              display: "none", // hidden on small screens via CSS
            }} className="timeline-spine" />

            {sessions.map((session, sIdx) => {
              const isLeft = sIdx % 2 === 0;
              const color = OCCASION_COLORS[session.occasion] ?? "#52b788";
              const icon  = OCCASION_ICONS[session.occasion]  ?? "📷";
              const isExpanded = activeSessionId === session.id;

              return (
                <div
                  key={session.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "3.5rem",
                    position: "relative",
                  }}
                  className="timeline-row"
                >
                  {/* ── Date label (above) ── */}
                  <div style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: color,
                    marginBottom: "0.75rem", fontWeight: 700,
                  }}>
                    {session.displayDate}
                  </div>

                  {/* ── Dot node on spine ── */}
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${color}33, ${color}66)`,
                    border: `2px solid ${color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", marginBottom: "1.25rem",
                    boxShadow: `0 0 24px ${color}55`,
                    flexShrink: 0, zIndex: 2,
                  }}>
                    {icon}
                  </div>

                  {/* ── Session Card ── */}
                  <div
                    style={{
                      width: "100%", maxWidth: "720px",
                      borderRadius: "20px", overflow: "hidden",
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${isExpanded ? color + "55" : "rgba(82,183,136,0.12)"}`,
                      boxShadow: isExpanded ? `0 12px 60px ${color}22` : "0 4px 30px rgba(0,0,0,0.3)",
                      transition: "all 0.35s ease",
                    }}
                  >
                    {/* Card header */}
                    <button
                      onClick={() => setActiveSessionId(isExpanded ? null : session.id)}
                      style={{
                        width: "100%", background: "none", border: "none",
                        cursor: "pointer", padding: 0, textAlign: "left",
                      }}
                    >
                      <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                        <Image
                          src={session.coverImage}
                          alt={session.occasion}
                          fill
                          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                          className="session-cover"
                          sizes="(max-width: 768px) 100vw, 720px"
                        />
                        {/* Overlay */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,13,0.85) 0%, rgba(10,31,13,0.2) 60%, transparent 100%)" }} />
                        {/* Occasion badge */}
                        <div style={{
                          position: "absolute", top: "1rem", left: "1rem",
                          display: "inline-flex", alignItems: "center", gap: "0.4rem",
                          padding: "0.35rem 0.9rem", borderRadius: "100px",
                          background: `${color}cc`, backdropFilter: "blur(8px)",
                          fontFamily: "'Lato', sans-serif", fontSize: "0.75rem",
                          fontWeight: 700, color: "white", letterSpacing: "0.06em",
                        }}>
                          {icon} {session.occasion}
                        </div>
                        {/* Photo count badge */}
                        <div style={{
                          position: "absolute", top: "1rem", right: "1rem",
                          padding: "0.35rem 0.8rem", borderRadius: "100px",
                          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                          fontFamily: "'Lato', sans-serif", fontSize: "0.72rem",
                          color: "rgba(255,255,255,0.8)",
                        }}>
                          📷 {session.images.length} photos
                        </div>
                        {/* Title on card */}
                        <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", right: "4rem" }}>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(1.2rem,3vw,1.6rem)", lineHeight: 1.2 }}>
                            {session.occasion}
                          </h2>
                        </div>
                        {/* Expand arrow */}
                        <div style={{
                          position: "absolute", bottom: "1rem", right: "1.25rem",
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontSize: "1rem",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}>
                          ↓
                        </div>
                      </div>

                      {/* Description strip */}
                      <div style={{ padding: "1.25rem 1.5rem", borderTop: `1px solid ${color}22` }}>
                        <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.7)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                          {session.description}
                        </p>
                      </div>
                    </button>

                    {/* ── Expanded photo grid ── */}
                    {isExpanded && (
                      <div style={{ padding: "0 1.25rem 1.5rem" }}>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
                          gap: "8px",
                        }}>
                          {session.images.map((img, imgIdx) => (
                            <div
                              key={imgIdx}
                              onClick={() => openLightbox(session, imgIdx)}
                              style={{
                                borderRadius: "10px", overflow: "hidden",
                                aspectRatio: "1 / 1", cursor: "pointer",
                                border: "1px solid rgba(82,183,136,0.1)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                position: "relative",
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}44`;
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                              }}
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="160px"
                              />
                            </div>
                          ))}
                        </div>

                        {/* View all btn */}
                        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
                          <button
                            onClick={() => openLightbox(session, 0)}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "0.5rem",
                              padding: "0.6rem 1.5rem", borderRadius: "100px",
                              background: `linear-gradient(135deg, ${color}99, ${color}55)`,
                              border: `1px solid ${color}66`,
                              color: "white", fontFamily: "'Lato', sans-serif",
                              fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                              letterSpacing: "0.06em",
                            }}
                          >
                            🖼️ Slideshow View
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* End of timeline */}
            <div style={{ textAlign: "center", paddingTop: "1rem" }}>
              <div style={{ display: "inline-block", padding: "0.75rem 2rem", borderRadius: "100px", background: "rgba(82,183,136,0.08)", border: "1px solid rgba(82,183,136,0.2)", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(183,228,199,0.5)", letterSpacing: "0.1em" }}>
                🌿 More moments being captured every day…
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section style={{ textAlign: "center", padding: "4rem 1.5rem 6rem", borderTop: "1px solid rgba(82,183,136,0.1)" }}>
          <p style={{ fontFamily: "'Great Vibes', cursive", color: "var(--gold)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Be Part of the Story</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: "1rem" }}>Book Your Celebration</h2>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.7)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Whether it's a birthday, anniversary, corporate event or just a beautiful day out — Green Yard is ready to make it unforgettable.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#booking" className="btn-primary">📅 Book a Table</Link>
            <Link href="/gallery" className="btn-outline" style={{ border: "2px solid rgba(82,183,136,0.5)", color: "rgba(183,228,199,0.9)" }}>🖼️ View Gallery</Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      {lightboxSession && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            animation: lbClosing ? "lbFadeOut 0.25s ease forwards" : "lbFadeIn 0.25s ease forwards",
          }}
        >
          <button onClick={closeLightbox} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1.1rem", cursor: "pointer", zIndex: 10 }}>✕</button>
          <button onClick={e => { e.stopPropagation(); goPrev(); }} style={{ position: "absolute", left: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10 }}>‹</button>

          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "88vh", borderRadius: "16px", overflow: "hidden", boxShadow: "0 32px 100px rgba(0,0,0,0.85)" }}>
            <Image
              src={lightboxSession.images[lightboxIndex].src}
              alt={lightboxSession.images[lightboxIndex].alt}
              width={1200}
              height={900}
              style={{ maxWidth: "90vw", maxHeight: "84vh", objectFit: "contain", display: "block" }}
            />
          </div>

          <button onClick={e => { e.stopPropagation(); goNext(); }} style={{ position: "absolute", right: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.5rem", cursor: "pointer", zIndex: 10 }}>›</button>

          <div style={{ position: "absolute", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
              {OCCASION_ICONS[lightboxSession.occasion]} {lightboxSession.occasion} · {lightboxSession.displayDate}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.5)", fontSize: "0.75rem" }}>
              {lightboxIndex + 1} / {lightboxSession.images.length}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes lbFadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes lbFadeOut { from { opacity:1; } to { opacity:0; } }
        .session-cover { transition: transform 0.5s ease !important; }
        button:hover .session-cover { transform: scale(1.03) !important; }
        @media (min-width: 768px) {
          .timeline-spine { display: block !important; }
        }
      `}</style>
    </>
  );
}
