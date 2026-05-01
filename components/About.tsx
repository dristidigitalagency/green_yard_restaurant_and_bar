"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "🌿", label: "Open Garden Dining" },
  { icon: "🎵", label: "Live Music Evenings" },
  { icon: "🍃", label: "Fresh Organic Ingredients" },
  { icon: "🔥", label: "Bonfire Nights" },
  { icon: "🅿️", label: "Ample Parking" },
  { icon: "🌄", label: "Mountain Views" },
];

const occasions = [
  {
    id: "birthday",
    label: "Birthdays",
    icon: "🎂",
    image: "/images/customer_birthday1.jpg",
    tagline: "Make it unforgettable",
    desc: "Celebrate life's big moments surrounded by nature. Our lush garden sets the perfect stage for birthday parties of every size.",
  },
  {
    id: "family",
    label: "Family Gatherings",
    icon: "👨‍👩‍👧‍👦",
    image: "/images/customer_family1.jpg",
    tagline: "Together under the trees",
    desc: "A peaceful retreat for the whole family. Spacious seating, kid-friendly ambiance, and a menu that pleases everyone.",
  },
  {
    id: "couple",
    label: "Romantic Evenings",
    icon: "💑",
    image: "/images/customer_couple.jpg",
    tagline: "Romance in bloom",
    desc: "Candle-lit tables, soft music, and garden breezes — the perfect atmosphere for a date night or anniversary dinner.",
  },
  {
    id: "events",
    label: "Celebrations & Events",
    icon: "🥂",
    image: "/images/customer_spray1.jpg",
    tagline: "Pop the champagne",
    desc: "From promotions to milestones, our venue accommodates private events with custom menus and full-service hospitality.",
  },
];

export default function About() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  // Auto-cycle every 4 s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % occasions.length);
        setAnimating(false);
      }, 350);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = occasions[active];

  return (
    <section id="about" style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── Top grid: story text + image ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Left: Text */}
        <div>
          <p className="section-subtitle">Our Story</p>
          <h2 className="section-title" style={{ marginTop: "0.25rem" }}>
            A Garden of Peace<br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>in the Heart of KTM</span>
          </h2>

          <div
            className="divider-ornament"
            style={{ marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "280px" }}
          >
            <span style={{ fontSize: "1rem" }}>✦</span>
          </div>

          <p
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--text-mid)",
              marginBottom: "1.25rem",
            }}
          >
            Nestled in the heart of Kathmandu, Green Yard is more than a restaurant — it&apos;s a living sanctuary where nature welcomes you with open arms. Every corner is a canvas of lush greenery, wooden warmth, and gentle breezes.
          </p>
          <p
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: "var(--text-mid)",
              marginBottom: "2rem",
            }}
          >
            From contemplative morning coffee to vibrant evening cocktails beneath the stars — with crackling bonfires and soulful live music — we&apos;ve crafted the perfect setting for every mood and every milestone.
          </p>

          {/* Feature pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {features.map((f) => (
              <span
                key={f.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.9rem",
                  background: "rgba(82,183,136,0.1)",
                  border: "1px solid rgba(82,183,136,0.25)",
                  borderRadius: "100px",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--green-mid)",
                  fontWeight: 600,
                }}
              >
                {f.icon} {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "-16px",
              right: "-16px",
              width: "100%",
              height: "100%",
              border: "2px solid var(--gold)",
              borderRadius: "24px",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
            }}
          >
            <Image
              src="/images/building.jpg"
              alt="Green Yard garden restaurant interior"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay badge */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                background: "rgba(26,61,31,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(82,183,136,0.3)",
                borderRadius: "14px",
                padding: "1rem 1.25rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--gold-light)",
                  lineHeight: 1,
                }}
              >
                5★
              </div>
              <div
                style={{
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(183,228,199,0.85)",
                  marginTop: "0.25rem",
                  letterSpacing: "0.05em",
                }}
              >
                Top Rated in Kathmandu
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Occasions Spotlight ── */}
      <div style={{ marginTop: "6rem" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-subtitle">Perfect For Every Occasion</p>
          <h2 className="section-title" style={{ marginTop: "0.25rem" }}>
            Your Moments,{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Our Setting</span>
          </h2>
          <div
            className="divider-ornament"
            style={{ marginTop: "1.25rem", maxWidth: "320px", margin: "1.25rem auto 0" }}
          >
            <span style={{ fontSize: "1rem" }}>✦</span>
          </div>
        </div>

        {/* Spotlight card */}
        <div className="occasion-spotlight">
          {/* Tabs */}
          <div className="occasion-tabs">
            {occasions.map((occ, i) => (
              <button
                key={occ.id}
                id={`occasion-tab-${occ.id}`}
                className={`occasion-tab${active === i ? " active" : ""}`}
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  goTo(i);
                  // restart auto-cycle
                  timerRef.current = setInterval(() => {
                    setAnimating(true);
                    setTimeout(() => {
                      setActive((prev) => (prev + 1) % occasions.length);
                      setAnimating(false);
                    }, 350);
                  }, 4000);
                }}
              >
                <span className="occasion-tab-icon">{occ.icon}</span>
                <span className="occasion-tab-label">{occ.label}</span>
                {active === i && <span className="occasion-tab-bar" />}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={`occasion-content${animating ? " fading" : ""}`}>
            {/* Image */}
            <div className="occasion-image-wrap">
              <Image
                src={current.image}
                alt={current.label}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 55vw"
                priority={active === 0}
              />
              {/* Gradient overlay */}
              <div className="occasion-image-overlay" />
              {/* Icon badge */}
              <div className="occasion-icon-badge">
                <span style={{ fontSize: "2rem" }}>{current.icon}</span>
              </div>
              {/* Progress bar */}
              <div className="occasion-progress-bar">
                <div
                  key={active}
                  className="occasion-progress-fill"
                />
              </div>
            </div>

            {/* Text panel */}
            <div className="occasion-text-panel">
              <p className="occasion-eyebrow">{current.icon} {current.label}</p>
              <h3 className="occasion-tagline">{current.tagline}</h3>
              <p className="occasion-desc">{current.desc}</p>

              {/* Dot indicators */}
              <div className="occasion-dots">
                {occasions.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to ${occasions[i].label}`}
                    className={`occasion-dot${active === i ? " active" : ""}`}
                    onClick={() => {
                      if (timerRef.current) clearInterval(timerRef.current);
                      goTo(i);
                    }}
                  />
                ))}
              </div>

              <a href="#booking" className="btn-gold" style={{ marginTop: "2rem", display: "inline-flex" }}>
                🌿 Book for This Occasion
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="paper-card"
        style={{
          borderRadius: "20px",
          marginTop: "4rem",
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        {[
          { num: "500+", label: "Happy Guests / Month" },
          { num: "50+", label: "Menu Items" },
          { num: "5★", label: "Google Rating" },
          { num: "10+", label: "Years of Joy" },
        ].map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "2.2rem",
                fontWeight: 700,
                color: "var(--green-mid)",
                lineHeight: 1,
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: "'Lato',sans-serif",
                fontSize: "0.82rem",
                color: "var(--text-light)",
                marginTop: "0.4rem",
                letterSpacing: "0.05em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
