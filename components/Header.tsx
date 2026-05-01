"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Occasions", href: "#occasions" },
  { label: "Book a Table", href: "#booking" },
  { label: "Find Us", href: "#footer" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 1.5rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(26,61,31,0.72)"
            : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(82,183,136,0.25)"
            : "1px solid rgba(255,255,255,0.18)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.25)" : "none",
        }}
      >
        {/* Hamburger (left) */}
        <button
          id="menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: i === 1 ? "20px" : "26px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "width 0.3s",
              }}
            />
          ))}
        </button>

        {/* Logo (center) */}
        <a
          href="#hero"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          <div className="flex gap-1">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>

              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "1.75rem",
                  color: "white",
                  lineHeight: 1,
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
              >
                Green Yard
              </div>
              <div
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  color: "rgba(183,228,199,0.9)",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Restaurant &amp; Bar
              </div>
            </div>
          </div>
        </a>

        {/* Book CTA (right) */}
        <a
          href="#booking"
          id="header-book-btn"
          style={{
            padding: "0.5rem 1.25rem",
            background: "linear-gradient(135deg,#c9a84c,#8a6220)",
            color: "white",
            borderRadius: "100px",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 700,
            fontFamily: "'Lato',sans-serif",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "0 4px 16px rgba(201,168,76,0.4)",
            transition: "transform 0.2s,box-shadow 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 8px 24px rgba(201,168,76,0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 16px rgba(201,168,76,0.4)";
          }}
          className="cta"
        >
          <span className=" hidden sm:block ">Book Table</span>
          <span className="sm:hidden ">
            <div>Book</div>
            <div>Table</div>
          </span>
        </a>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.5)",
          }}
          onClick={close}
        />
      )}

      {/* Mobile Drawer */}
      <nav
        id="mobile-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(85vw, 320px)",
          zIndex: 300,
          background: "linear-gradient(160deg,#0f2813 0%,#1a3d1f 60%,#2d6a4f 100%)",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: menuOpen ? "6px 0 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo inside drawer */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "2.2rem",
              color: "white",
            }}
          >
            Green Yard
          </div>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(183,228,199,0.7)",
              textTransform: "uppercase",
              fontFamily: "'Lato',sans-serif",
            }}
          >
            Restaurant &amp; Bar
          </div>
        </div>

        {/* Nav links */}
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={close}
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.3rem",
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              padding: "0.65rem 0",
              borderBottom: "1px solid rgba(82,183,136,0.15)",
              transition: "color 0.2s,padding-left 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#b7e4c7";
              (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.88)";
              (e.currentTarget as HTMLElement).style.paddingLeft = "0";
            }}
          >
            {l.label}
          </a>
        ))}

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            marginTop: "2rem",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "8px",
            padding: "0.6rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontFamily: "'Lato',sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          ✕ Close Menu
        </button>

        {/* Bottom contact */}
        <div
          style={{
            marginTop: "auto",
            color: "rgba(183,228,199,0.7)",
            fontSize: "0.8rem",
            fontFamily: "'Lato',sans-serif",
            lineHeight: 1.8,
          }}
        >
          <div>📍 Kathmandu, Nepal</div>
          <div>📞 +977 9764595174</div>
        </div>
      </nav>
    </>
  );
}
