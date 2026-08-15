import {
  Sparkles,
  ArrowRight,
  Star
} from "lucide-react";

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
        backgroundImage: `url("${imageUrl}")`
      }}
    >
      {/* Background layers */}
      <div className="photo-overlay" />
      <div className="photo-gradient" />
      <div className="photo-vignette" />

      {/* Brand atmosphere */}
      <div className="yellow-light" />
      <div className="red-light" />

      {/* HEADER */}
      <header className="tv-header">

        <div className="brand-container">
          <img
            src={`${BASE_URL}logo.png`}
            alt="Tabsway Kitchen"
            className="header-logo"
          />
        </div>

        <div className="header-tag">
          <span className="live-dot" />
          <span>TABSWAY KITCHEN</span>
        </div>

      </header>

      {/* MAIN PROMOTION */}
      <section className="promotion-content">

        {promotion.badge && (
          <div className="promo-badge">
            <Sparkles size={18} />
            <span>{promotion.badge}</span>
          </div>
        )}

        <div className="red-accent-line" />

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

        <div className="offer-row">

          {promotion.price && (
            <div className="price-box">

              <span className="price-label">
                ONLY
              </span>

              <span className="price">
                {promotion.price}
              </span>

            </div>
          )}

          {promotion.buttonText && (
            <div className="cta-button">

              <span>
                {promotion.buttonText}
              </span>

              <ArrowRight size={25} />

            </div>
          )}

        </div>

        <div className="quality-row">

          <div className="quality-item">
            <Star
              size={18}
              fill="currentColor"
            />
            <span>
              Freshly Prepared
            </span>
          </div>

          <div className="quality-item">
            <Star
              size={18}
              fill="currentColor"
            />
            <span>
              Made With Care
            </span>
          </div>

        </div>

      </section>

      {/* FOOD LABEL */}
      <div className="food-label">
        TASTE THE DIFFERENCE
      </div>

      {/* BOTTOM BRAND */}
      <div className="bottom-brand">

        <div className="brand-line" />

        <img
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
        />

        <div className="brand-line" />

      </div>

      <div className="screen-shine" />

    </main>
  );
}