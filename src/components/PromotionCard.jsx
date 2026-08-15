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

  return `${BASE_URL}${image}`;
}

export default function PromotionCard({ promotion }) {
  const imageUrl = getImageUrl(promotion.image);

  return (
    <main
      className="promotion"
      style={{
        backgroundImage: `url("${imageUrl}")`,
      }}
    >
      {/* Background */}
      <div className="photo-overlay" />
      <div className="photo-bottom" />

      {/* Header */}
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


      {/* Main content */}
      <section className="promotion-content">

        {promotion.badge && (
          <div className="promo-badge">
            {promotion.badge}
          </div>
        )}

        <div className="accent" />

        <h1>
          {promotion.title}
        </h1>

        {promotion.subtitle && (
          <h2>
            {promotion.subtitle}
          </h2>
        )}

        {promotion.description && (
          <p>
            {promotion.description}
          </p>
        )}

        <div className="offer">

          {promotion.price && (
            <div className="price">
              <small>ONLY</small>
              {promotion.price}
            </div>
          )}

          {promotion.buttonText && (
            <div className="cta">
              {promotion.buttonText}
              <ArrowRight size={24} />
            </div>
          )}

        </div>

      </section>


      {/* Bottom branding */}
      <footer className="tv-footer">

        <div className="footer-line" />

        <span>
          FRESH • DELICIOUS • MADE WITH CARE
        </span>

        <div className="footer-line" />

      </footer>


      {/* Screen shine */}
      <div className="shine" />

    </main>
  );
}