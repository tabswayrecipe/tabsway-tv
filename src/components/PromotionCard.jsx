import { ArrowRight } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL || "/";

/* =====================================================
   BUILD ASSET URL
===================================================== */

function getAssetUrl(path) {
  if (!path) return "";

  const value = String(path).trim();

  if (!value) return "";

  // Already an absolute URL
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  // Remove leading slash
  const cleanPath = value.replace(/^\/+/, "");

  // Make sure BASE_URL ends with /
  const base = BASE_URL.endsWith("/")
    ? BASE_URL
    : `${BASE_URL}/`;

  return `${base}${cleanPath}`;
}


/* =====================================================
   PROMOTION CARD
===================================================== */

export default function PromotionCard({ promotion = {} }) {

  const imageUrl = getAssetUrl(promotion.image);

  const logoUrl = getAssetUrl("logo_2.png");


  return (
    <main
      className="promotion"
      style={{
        backgroundImage: imageUrl
          ? `url("${imageUrl}")`
          : "none",
      }}
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="photo-overlay" />

      <div className="photo-bottom" />


      {/* =================================================
          DECORATIVE LIGHTS
      ================================================= */}

      <div className="yellow-glow" />

      <div className="red-glow" />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="tv-header">

        {/* LOGO */}

        <img
          src={logoUrl}
          alt="Tabsway Kitchen"
          className="header-logo"
          draggable="false"
        />


        {/* SPECIAL OFFER */}

        <div className="header-promo">

          <span className="header-promo-dot" />

          <span className="header-promo-label">
            {promotion.headerText || "SPECIAL OFFER"}
          </span>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="promotion-content">


        {/* BADGE */}

        {promotion.badge && (
          <div className="promo-badge">
            {promotion.badge}
          </div>
        )}


        {/* ACCENT */}

        <div className="accent" />


        {/* TITLE */}

        {promotion.title && (
          <h1>
            {promotion.title}
          </h1>
        )}


        {/* SUBTITLE */}

        {promotion.subtitle && (
          <h2>
            {promotion.subtitle}
          </h2>
        )}


        {/* DESCRIPTION */}

        {promotion.description && (
          <p className="description">
            {promotion.description}
          </p>
        )}


        {/* OFFER */}

        {(promotion.price || promotion.buttonText) && (
          <div className="offer">

            {/* PRICE */}

            {promotion.price && (
              <div className="price">

                <small>
                  {promotion.priceLabel || "ONLY"}
                </small>

                <strong>
                  {promotion.price}
                </strong>

              </div>
            )}


            {/* CTA */}

            {promotion.buttonText && (
              <div className="cta">

                <span>
                  {promotion.buttonText}
                </span>

                <ArrowRight
                  size={23}
                  strokeWidth={3}
                />

              </div>
            )}

          </div>
        )}

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="tv-footer">

        <div className="footer-line" />

        <span>
          {promotion.footerText ||
            "FRESH • DELICIOUS • MADE WITH CARE"}
        </span>

        <div className="footer-line" />

      </footer>


      {/* =================================================
          SHINE
      ================================================= */}

      <div className="shine" />

    </main>
  );
}