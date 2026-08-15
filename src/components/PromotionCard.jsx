import { ArrowRight } from "lucide-react";

const BASE_URL =
  import.meta.env.BASE_URL || "/";


/* =====================================================
   IMAGE URL
===================================================== */

function getImageUrl(image) {

  if (!image) {
    return "";
  }

  const value =
    String(image).trim();

  if (!value) {
    return "";
  }


  /* External image */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }


  /*
   * Get only the filename.
   *
   * This means all of these work:
   *
   * download.jpeg
   *
   * /images/download.jpeg
   *
   * /tabsway-tv/images/download.jpeg
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
    getImageUrl(
      promotion.image
    );


  const logoUrl =
    `${BASE_URL}images/logo_2.png`;


  return (

    <main className="promotion">


      {/* =================================================
          FOOD BACKGROUND
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
          HEADER
      ================================================= */}

      <header className="tv-header">

        <img
          src={logoUrl}
          alt="TabsWay Kitchen"
          className="header-logo"
          draggable="false"

          onError={(event) => {

            console.error(
              "Logo failed to load:",
              logoUrl
            );

            event.currentTarget.style.display =
              "none";

          }}

        />


        <div className="header-promo">

          <span className="header-promo-dot" />

          <span className="header-promo-label">
            {promotion.headerText ||
              "SPECIAL OFFER"}
          </span>

        </div>

      </header>


      {/* =================================================
          CONTENT
      ================================================= */}

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


        {(promotion.price ||
          promotion.buttonText) && (

          <div className="offer">


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


      <div className="shine" />

    </main>

  );
}