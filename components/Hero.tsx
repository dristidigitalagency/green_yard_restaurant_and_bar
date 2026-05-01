"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <Image
        // src="/hero.png"
        // src="/images/building.jpg"
        src="/images/teej.jpg"
        alt="Green Yard Restaurant outdoor garden"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
        className="zoom-out"
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,30,12,0.45) 0%, rgba(10,30,12,0.2) 40%, rgba(10,30,12,0.7) 100%)",
        }}
      />

      {/* Floating leaf particles */}
      {[
        { left: "12%", delay: "0s", dur: "8s", size: 18 },
        { left: "28%", delay: "2s", dur: "10s", size: 14 },
        { left: "60%", delay: "1s", dur: "9s", size: 20 },
        { left: "80%", delay: "3.5s", dur: "7s", size: 16 },
      ].map((l, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "-30px",
            left: l.left,
            fontSize: l.size,
            opacity: 0.7,
            animation: `leafFall ${l.dur} ${l.delay} linear infinite`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          🍃
        </span>
      ))}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "780px",
        }}
      >
        {/* Script tagline */}
        <p
          className="font-script fade-up"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            color: "rgba(232,201,106,0.92)",
            marginBottom: "0.5rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          Where Nature Meets Flavour
        </p>

        {/* Main heading */}
        <h1
          className="fade-up-delay-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.05,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            marginBottom: "1.5rem",
          }}
        >
          Green Yard
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "0.65em" }}>
            Restaurant &amp; Bar
          </span>
        </h1>

        {/* Sub-description */}
        <p
          className="fade-up-delay-2"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "540px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          Kathmandu&apos;s most peaceful garden escape — lush greenery, soul-warming cuisine &amp; the perfect setting for every occasion.
        </p>

        {/* CTAs */}
        <div
          className="fade-up-delay-3"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="#booking" className="btn-gold">
            🌿 Book a Table
          </a>
          <a href="#menu" className="btn-outline">
            View Our Menu
          </a>
        </div>
      </div>

      {/* Scroll arrow */}
      <a
        href="#about"
        aria-label="Scroll down"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.7)",
          fontSize: "1.6rem",
          textDecoration: "none",
        }}
        className="bounce-down"
      >
        ↓
      </a>
    </section>
  );
}
