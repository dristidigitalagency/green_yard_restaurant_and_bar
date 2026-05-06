"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Image catalogue ──────────────────────────────────────────────────────────
// Images from public/images/gallery
const GALLERY_IMAGES = [
  // Occasions & Events
  { src: "/images/gallery/audience-watching-at-occassion.jpeg",    alt: "Audience at an occasion",              category: "Events"      },
  { src: "/images/gallery/stage-decorated-in-some-occassion.jpeg", alt: "Decorated stage at an occasion",       category: "Events"      },
  { src: "/images/gallery/family-and-relative-eating-in-occassion.jpeg", alt: "Family eating at occasion",      category: "Events"      },
  { src: "/images/gallery/girls-dancing-at-night.jpeg",            alt: "Girls dancing at night event",         category: "Events"      },
  { src: "/images/gallery/customer-eating-in-party-at-night.jpeg", alt: "Customer dining at a night party",     category: "Events"      },

  // Teej Special
  { src: "/images/gallery/teej-group-sitting-photo.jpeg",          alt: "Teej group sitting photo",             category: "Teej"        },
  { src: "/images/gallery/women-in-teej-group-photo.jpeg",         alt: "Women in Teej group photo",            category: "Teej"        },
  { src: "/images/gallery/women-eating-in-row-in-teej.jpeg",       alt: "Women eating in a row at Teej",        category: "Teej"        },

  // Birthdays
  { src: "/images/gallery/birthday-decoration.jpeg",               alt: "Birthday decoration setup",            category: "Birthdays"   },
  { src: "/images/gallery/birthday-decoration1.jpeg",              alt: "Birthday decoration 2",                category: "Birthdays"   },
  { src: "/images/gallery/birthday-decoration2.jpeg",              alt: "Birthday decoration 3",                category: "Birthdays"   },
  { src: "/images/gallery/birthday-girls-group-photo.jpeg",        alt: "Birthday girls group photo",           category: "Birthdays"   },

  // Baby & Birth Ceremonies
  { src: "/images/gallery/baby-birthceremonial.jpeg",              alt: "Baby birth ceremony",                  category: "Ceremonies"  },
  { src: "/images/gallery/baby-shower-baloon-deocation.jpeg",      alt: "Baby shower balloon decoration",       category: "Ceremonies"  },
  { src: "/images/gallery/birth-ceremonial-baby-photo-with-mother.jpeg", alt: "Baby with mother at ceremony",   category: "Ceremonies"  },
  { src: "/images/gallery/birth-ceremonial-baby-photo-with-mother-and-relative-wider-view.jpeg", alt: "Baby ceremony wide shot", category: "Ceremonies" },
  { src: "/images/gallery/birth-ceremonial-baby-photo-with-mother_and_relative.jpeg", alt: "Baby with family",  category: "Ceremonies"  },

  // Food & Dining
  { src: "/images/gallery/breakfast-plate.jpeg",                   alt: "Breakfast plate",                      category: "Food"        },
  { src: "/images/gallery/customers-eating.mp4",                   alt: "Customers eating",                     category: "Food",        isVideo: true },
  { src: "/images/gallery/customers-self-service-in-line.jpeg",    alt: "Customers in self-service line",       category: "Food"        },
  { src: "/images/gallery/customers-self-service-in-line1.jpeg",   alt: "Customers self-service 2",             category: "Food"        },
  { src: "/images/gallery/customers-eating-at-night-in-beautiful-greenary-environment.jpeg", alt: "Dining at night in greenery", category: "Food" },

  // Venue & Ambiance
  { src: "/images/gallery/restaurant-decorated.jpeg",              alt: "Decorated restaurant interior",        category: "Venue"       },
  { src: "/images/gallery/restaurant-night-view.jpeg",             alt: "Restaurant at night",                  category: "Venue"       },
  { src: "/images/gallery/restaurent-room.jpeg",                   alt: "Restaurant indoor room",               category: "Venue"       },
  { src: "/images/gallery/bars-decorated-at-restaurant.jpeg",      alt: "Decorated bar at the restaurant",      category: "Venue"       },
  { src: "/images/gallery/baloon-decoration.jpeg",                 alt: "Balloon decoration",                   category: "Venue"       },
  { src: "/images/gallery/veranda.jpeg",                           alt: "Restaurant veranda",                   category: "Venue"       },
  { src: "/images/gallery/garden-and-building.jpeg",               alt: "Garden and building exterior",         category: "Venue"       },

  // Garden & Nature
  { src: "/images/gallery/flower.jpeg",                            alt: "Beautiful flower in garden",           category: "Garden"      },
  { src: "/images/gallery/garden-flower.jpeg",                     alt: "Garden flowers",                       category: "Garden"      },
  { src: "/images/gallery/garden-flower.mp4",                      alt: "Garden flowers video",                 category: "Garden",     isVideo: true },
  { src: "/images/gallery/customers-warmin-with-night-fire.jpeg",  alt: "Guests warming by night fire",         category: "Garden"      },

  // People & Groups
  { src: "/images/gallery/group-photo-infront-of-restaurant.jpeg", alt: "Group photo in front of restaurant",  category: "People"      },
  { src: "/images/gallery/young-girls-group-photo.jpeg",           alt: "Young girls group photo",              category: "People"      },
  { src: "/images/gallery/children-group-photo.jpeg",              alt: "Children group photo",                 category: "People"      },
  { src: "/images/gallery/children-group-photo1.jpeg",             alt: "Children group photo 2",               category: "People"      },
  { src: "/images/gallery/women-photoshooting-in-front-of-building.jpeg", alt: "Women photoshooting outside",  category: "People"      },

  // Videos
  { src: "/images/gallery/dancing.mp4",                            alt: "Dancing at celebration",               category: "Events",     isVideo: true },
  { src: "/images/gallery/teej-dance.mp4",                         alt: "Teej dance performance",               category: "Teej",       isVideo: true },
  { src: "/images/gallery/WhatsApp Video 2026-05-05 at 8.16.46 PM.mp4", alt: "Recent event highlights",        category: "Events",     isVideo: true },

  // WhatsApp Recent Photos
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.47 PM (1).jpeg", alt: "Recent event photo 1",      category: "Events"      },
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.47 PM.jpeg",     alt: "Recent event photo 2",      category: "Events"      },
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.48 PM (1).jpeg", alt: "Recent event photo 3",      category: "Events"      },
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.48 PM.jpeg",     alt: "Recent event photo 4",      category: "Events"      },
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.49 PM.jpeg",     alt: "Recent event photo 5",      category: "Events"      },
  { src: "/images/gallery/WhatsApp Image 2026-05-05 at 8.16.49 PM1.jpeg",    alt: "Recent event photo 6",      category: "Events"      },
];

const CATEGORIES = ["All", "Events", "Teej", "Birthdays", "Ceremonies", "Food", "Venue", "Garden", "People"];

const CATEGORY_ICONS: Record<string, string> = {
  All: "🌿", Events: "🎉", Teej: "🪷", Birthdays: "🎂",
  Ceremonies: "👶", Food: "🍽️", Venue: "🏡", Garden: "🌸", People: "👥",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const filtered = GALLERY_IMAGES.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setLightboxIndex(null);
      setIsClosing(false);
      document.body.style.overflow = "";
    }, 250);
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox, goNext, goPrev]);

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <Header />

      <main style={{ background: "linear-gradient(175deg,#0d2414 0%,#0a1f0d 50%,#0e2318 100%)", minHeight: "100vh", paddingTop: "70px" }}>

        {/* ── Hero Banner ──────────────────────────── */}
        <section style={{ padding: "5rem 1.5rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(82,183,136,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--gold)", marginBottom: "0.5rem" }}>
            Memories in Every Frame
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", color: "white", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Our Gallery
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.75)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            From intimate dinners to grand celebrations — every corner of Green Yard tells a story. Browse through our collection of moments.
          </p>

          {/* Breadcrumb */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(183,228,199,0.5)" }}>
            <Link href="/" style={{ color: "rgba(183,228,199,0.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "white")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(183,228,199,0.5)")}>Home</Link>
            <span>›</span>
            <span style={{ color: "var(--gold-light)" }}>Gallery</span>
          </div>
        </section>

        {/* ── Category Filter ───────────────────────── */}
        <section style={{ padding: "0 1.5rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "0.5rem" }}>
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    padding: "0.5rem 1.2rem", borderRadius: "100px",
                    border: isActive ? "1.5px solid var(--green-light)" : "1.5px solid rgba(82,183,136,0.3)",
                    background: isActive ? "var(--green-mid)" : "transparent",
                    color: isActive ? "#fff" : "rgba(183,228,199,0.75)",
                    fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", fontWeight: 700,
                    cursor: "pointer", transition: "all 0.22s ease", whiteSpace: "nowrap",
                    boxShadow: isActive ? "0 4px 20px rgba(45,106,79,0.45)" : "none",
                  }}
                  onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-light)"; (e.currentTarget as HTMLElement).style.color = "var(--green-light)"; } }}
                  onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(82,183,136,0.3)"; (e.currentTarget as HTMLElement).style.color = "rgba(183,228,199,0.75)"; } }}
                >
                  <span>{CATEGORY_ICONS[cat]}</span> {cat}
                </button>
              );
            })}
          </div>
          <p style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "rgba(183,228,199,0.4)", marginTop: "1rem" }}>
            {filtered.length} {filtered.length === 1 ? "item" : "items"} in {activeCategory}
          </p>
        </section>

        {/* ── Masonry Grid ──────────────────────────── */}
        <section style={{ padding: "0 1.5rem 6rem", maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            columns: "4 220px", columnGap: "14px",
          }}>
            {filtered.map((item, idx) => (
              <div
                key={item.src}
                onClick={() => !item.isVideo && openLightbox(idx)}
                style={{
                  breakInside: "avoid", marginBottom: "14px",
                  borderRadius: "14px", overflow: "hidden",
                  cursor: item.isVideo ? "default" : "pointer",
                  position: "relative",
                  border: "1px solid rgba(82,183,136,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "block",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.015)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
                }}
              >
                {item.isVideo ? (
                  <video
                    src={item.src}
                    muted autoPlay loop playsInline
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={500}
                    height={400}
                    style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                {/* Overlay on hover */}
                {!item.isVideo && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(10,31,13,0.7) 0%, transparent 60%)",
                    opacity: 0, transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "flex-end", padding: "1rem",
                  }}
                    className="gallery-hover-overlay"
                  >
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "0.35rem",
                      padding: "0.3rem 0.75rem", borderRadius: "100px",
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                      fontFamily: "'Lato', sans-serif", fontSize: "0.72rem",
                      color: "white", letterSpacing: "0.06em", fontWeight: 700,
                    }}>
                      {CATEGORY_ICONS[item.category]} {item.category}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section style={{ textAlign: "center", padding: "4rem 1.5rem 6rem" }}>
          <p style={{ fontFamily: "'Great Vibes', cursive", color: "var(--gold)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Create Your Own</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: "1rem" }}>Unforgettable Memories</h2>
          <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.7)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.8 }}>Book your next celebration at Green Yard and let us capture the magic.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#booking" className="btn-primary">📅 Book a Table</Link>
            <Link href="/photo-shoot" className="btn-outline" style={{ border: "2px solid rgba(82,183,136,0.5)", color: "rgba(183,228,199,0.9)" }}>📸 View Photo Shoots</Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Lightbox ─────────────────────────────────── */}
      {lightboxIndex !== null && currentItem && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            animation: isClosing ? "lbFadeOut 0.25s ease forwards" : "lbFadeIn 0.25s ease forwards",
          }}
        >
          {/* Close */}
          <button onClick={closeLightbox} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1.2rem", cursor: "pointer", zIndex: 10 }}>✕</button>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); goPrev(); }} style={{ position: "absolute", left: "1rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.4rem", cursor: "pointer", zIndex: 10 }}>‹</button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "88vh", borderRadius: "16px", overflow: "hidden", boxShadow: "0 32px 100px rgba(0,0,0,0.8)" }}>
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              width={1200}
              height={900}
              style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); goNext(); }} style={{ position: "absolute", right: "1rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", borderRadius: "50%", width: "48px", height: "48px", fontSize: "1.4rem", cursor: "pointer", zIndex: 10 }}>›</button>

          {/* Caption */}
          <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{currentItem.alt}</p>
            <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(183,228,199,0.5)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{lightboxIndex + 1} / {filtered.length}</p>
          </div>
        </div>
      )}

      {/* Hover overlay CSS + lightbox animations */}
      <style>{`
        .gallery-hover-overlay { opacity: 0; }
        div:hover > .gallery-hover-overlay { opacity: 1; }
        @keyframes lbFadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes lbFadeOut { from { opacity:1; } to { opacity:0; } }
      `}</style>
    </>
  );
}
