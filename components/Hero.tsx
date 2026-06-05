"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

const heroSlides = [
  {
    src: "/images/homepage/teej.jpg",
    alt: "Guests celebrating in the Green Yard garden",
    position: "center",
  },
  {
    src: "/images/homepage/garden.jpeg",
    alt: "Green Yard rooftop open space seating",
    position: "center 40%",
  },
  {
    src: "/images/homepage/restaurant-night-view.jpeg",
    alt: "Green Yard rooftop and open space exterior",
    position: "center",
  },
  {
    src: "/images/homepage/customers-eating-at-night-in-beautiful-greenary-environment.jpeg",
    alt: "Live fire service in the Green Yard garden",
    position: "center",
  },
  {
    src: "/images/homepage/comfortable-seats.jpeg",
    alt: "Comfortable lounge seating at Green Yard",
    position: "center",
  },
  {
    src: "/images/homepage/garden-seats1.jpeg",
    alt: "Garden seating surrounded by greenery",
    position: "center",
  },
  {
    src: "/images/homepage/garden1.jpeg",
    alt: "Green Yard garden dining area",
    position: "center",
  },
  {
    src: "/images/homepage/ground-flour.jpeg",
    alt: "Ground floor dining space at Green Yard",
    position: "center",
  },
  {
    src: "/images/homepage/upper-flour.jpeg",
    alt: "Upper floor dining space at Green Yard",
    position: "center",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

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
      {/* Background carousel */}
      <div style={{ position: "absolute", inset: 0 }}>
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.04)",
                transition: "opacity 900ms ease, transform 6500ms ease",
              }}
            >
              <ExportedImage
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: slide.position }}
              />
            </div>
          );
        })}
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,30,12,0.45) 0%, rgba(10,30,12,0.2) 40%, rgba(10,30,12,0.7) 100%)",
        }}
      />

      {/* Carousel controls */}
      <button
        type="button"
        aria-label="Previous hero image"
        onClick={() => goToSlide(activeSlide - 1)}
        style={{
          position: "absolute",
          left: "clamp(1rem, 3vw, 2rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.38)",
          background: "rgba(10,30,12,0.28)",
          color: "white",
          fontSize: "1.35rem",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next hero image"
        onClick={() => goToSlide(activeSlide + 1)}
        style={{
          position: "absolute",
          right: "clamp(1rem, 3vw, 2rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.38)",
          background: "rgba(10,30,12,0.28)",
          color: "white",
          fontSize: "1.35rem",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        ›
      </button>

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
          width: "100%",
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
          Kathmandu&apos;s peaceful garden and rooftop escape — open greenery, multi-cuisine flavours &amp; the perfect setting for every occasion.
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
        <div
          className="fade-up-delay-3"
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "0.9rem",
          }}
        >
          <Link
            href="/gallery"
            className="btn-outline"
            style={{
              minWidth: "136px",
              padding: "0.65rem 1.35rem",
              background: "rgba(10,30,12,0.42)",
              borderColor: "rgba(232,201,106,0.68)",
              fontSize: "0.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            View Gallery
          </Link>
          <Link
            href="/photo-shoot"
            className="btn-outline"
            style={{
              minWidth: "136px",
              padding: "0.65rem 1.35rem",
              background: "rgba(10,30,12,0.42)",
              borderColor: "rgba(232,201,106,0.68)",
              fontSize: "0.75rem",
              backdropFilter: "blur(12px)",
            }}
          >
            Photo Shoots
          </Link>
        </div>
      </div>

      <div
        aria-label="Hero image carousel"
        style={{
          position: "absolute",
          bottom: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          gap: "0.55rem",
        }}
      >
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeSlide}
            onClick={() => goToSlide(index)}
            style={{
              width: index === activeSlide ? "28px" : "9px",
              height: "9px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.65)",
              background: index === activeSlide ? "var(--gold-light)" : "rgba(255,255,255,0.38)",
              cursor: "pointer",
              transition: "width 220ms ease, background 220ms ease",
            }}
          />
        ))}
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
