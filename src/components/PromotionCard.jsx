import { ArrowRight } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL;

function getImageUrl(image) {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${BASE_URL}${image.replace(/^\/+/, "")}`;
}

export default function PromotionCard({ promotion }) {
  const imageUrl = getImageUrl(promotion.image);

  return (
    <main
      className="promotion"
      style={{
        backgroundImage: imageUrl
          ? `url("${imageUrl}")`
          : "none",
      }}
    >
      <div className="photo-overlay" />
      <div className="photo-bottom" />

      {/* Decorative lights */}
      <div className="yellow-glow" />
      <div className="red-glow" />

      {/* HEADER */}
      <header className="tv-header">

        <img
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
          className="header-logo"
        />

        <div className="header-promo">
          <span />
          SPECIAL OFFER
        </div>

      </header>


      {/* CONTENT */}
      <section className="promotion-content">

        {promotion.badge && (
          <div className="promo-badge">
            {promotion.badge}
          </div>
        )}

        <div className="accent" />

        {promotion.title && (
          <h1>
            {promotion.title}
          </h1>
        )}

        {promotion.subtitle && (
          <h2>
            {promotion.subtitle}
          </h2>
        )}

        {promotion.description && (
          <p className="description">
            {promotion.description}
          </p>
        )}

        <div className="offer">

          {promotion.price && (
            <div className="price">
              <small>ONLY</small>
              <strong>{promotion.price}</strong>
            </div>
          )}

          {promotion.buttonText && (
            <div className="cta">
              <span>{promotion.buttonText}</span>
              <ArrowRight size={23} />
            </div>
          )}

        </div>

      </section>


      {/* BOTTOM */}
      <footer className="tv-footer">

        <div className="footer-line" />

        <span>
          FRESH • DELICIOUS • MADE WITH CARE
        </span>

        <div className="footer-line" />

      </footer>

      <div className="shine" />

    </main>
  );
}