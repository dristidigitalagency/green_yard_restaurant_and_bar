"use client";
import Image from "next/image";

const features = [
  { icon: "🌿", label: "Open Garden Dining" },
  { icon: "🎵", label: "Live Music Evenings" },
  { icon: "🍃", label: "Fresh Organic Ingredients" },
  { icon: "🔥", label: "Bonfire Nights" },
  { icon: "🅿️", label: "Ample Parking" },
  { icon: "🌄", label: "Mountain Views" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
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
          {/* Decorative box offset */}
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
              src="/hero.png"
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
