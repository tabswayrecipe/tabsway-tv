import { ArrowRight } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL || "/";

/* =====================================================
   IMAGE URL HELPER
===================================================== */

function getImageUrl(image) {
  if (!image) return "";

  const value = String(image).trim();

  if (!value) return "";

  // External image
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  // Remove leading slashes so GitHub Pages base path
  // is preserved correctly.
  const cleanPath = value.replace(/^\/+/, "");

  return `${BASE_URL}${cleanPath}`;
}


/* =====================================================
   LOGO URL
===================================================== */

function getLogoUrl() {
  return `${BASE_URL}logo_2.png`;
}


/* =====================================================
   PROMOTION CARD
===================================================== */

export default function PromotionCard({ promotion = {} }) {
  const imageUrl = getImageUrl(promotion.image);
  const logoUrl = getLogoUrl();

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
          BACKGROUND OVERLAYS
      ================================================= */}

      <div className="photo-overlay" />

      <div className="photo-bottom" />


      {/* =================================================
          DECORATIVE LIGHT EFFECTS
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
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />


        {/* SPECIAL OFFER */}

        <div className="header-promo">

          <span />

          <span className="header-promo-text">
            {promotion.headerText || "SPECIAL OFFER"}
          </span>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="promotion-content">


        {/* =================================================
            BADGE
        ================================================= */}

        {promotion.badge && (
          <div className="promo-badge">
            {promotion.badge}
          </div>
        )}


        {/* =================================================
            ACCENT
        ================================================= */}

        <div className="accent" />


        {/* =================================================
            TITLE
        ================================================= */}

        {promotion.title && (
          <h1>
            {promotion.title}
          </h1>
        )}


        {/* =================================================
            SUBTITLE
        ================================================= */}

        {promotion.subtitle && (
          <h2>
            {promotion.subtitle}
          </h2>
        )}


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        {promotion.description && (
          <p className="description">
            {promotion.description}
          </p>
        )}


        {/* =================================================
            OFFER
        ================================================= */}

        {(promotion.price || promotion.buttonText) && (
          <div className="offer">


            {/* =================================================
                PRICE
            ================================================= */}

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


            {/* =================================================
                CTA
            ================================================= */}

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
          FOOD IMAGE INDICATOR
          Only appears when an image exists
      ================================================= */}

      {imageUrl && (
        <div className="image-indicator">
          <span />
          <span>FRESHLY PREPARED</span>
        </div>
      )}


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
          SHINE ANIMATION
      ================================================= */}

      <div className="shine" />

    </main>
  );
}