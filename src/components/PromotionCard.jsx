import { ArrowRight } from "lucide-react";

const BASE_URL =
  import.meta.env.BASE_URL || "/";


/* =====================================================
   ASSET URL
===================================================== */

function getAssetUrl(path) {

  if (!path) {
    return "";
  }

  const value =
    String(path).trim();

  if (!value) {
    return "";
  }

  /* External URL */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  /*
   * Remove any old paths from the JSON.
   *
   * Examples:
   *
   * family.jpg
   * /images/family.jpg
   * /tabsway-tv/images/family.jpg
   */

  const filename =
    value
      .split("/")
      .pop()
      .trim();


  const base =
    BASE_URL.endsWith("/")
      ? BASE_URL
      : `${BASE_URL}/`;


  return `${base}images/${filename}`;
}


/* =====================================================
   PROMOTION CARD
===================================================== */

export default function PromotionCard({
  promotion = {}
}) {

  const imageUrl =
    getAssetUrl(
      promotion.image
    );


  const logoUrl =
    `${BASE_URL}images/logo_2.png`;


  return (

    <main className="promotion">


      {/* =================================================
          FOOD IMAGE
      ================================================= */}

      {imageUrl && (

        <div
          className="promotion-background"
          style={{
            backgroundImage:
              `url("${imageUrl}")`
          }}
        />

      )}


      {/* =================================================
          OVERLAYS
      ================================================= */}

      <div className="photo-overlay" />

      <div className="photo-bottom" />


      {/* =================================================
          DECORATIVE LIGHTS
      ================================================= */}

      <div
        className="yellow-glow"
      />

      <div
        className="red-glow"
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="tv-header">


        {/* LOGO */}

        <img
          src={logoUrl}
          alt="TabsWay Kitchen"
          className="header-logo"
          draggable="false"
        />


        {/* SPECIAL OFFER */}

        <div className="header-promo">

          <span
            className="header-promo-dot"
          />

          <span
            className="header-promo-label"
          >
            {promotion.headerText ||
              "SPECIAL OFFER"}
          </span>

        </div>


      </header>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section
        className="promotion-content"
      >


        {/* BADGE */}

        {promotion.badge && (

          <div className="promo-badge">

            {promotion.badge}

          </div>

        )}


        {/* ACCENT */}

        <div
          className="accent"
        />


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

        {(promotion.price ||
          promotion.buttonText) && (

          <div className="offer">


            {/* PRICE */}

            {promotion.price && (

              <div className="price">

                <small>
                  {promotion.priceLabel ||
                    "ONLY"}
                </small>

                <strong>
                  {promotion.price}
                </strong>

              </div>

            )}


            {/* BUTTON */}

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