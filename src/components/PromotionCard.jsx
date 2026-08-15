import { ArrowRight } from "lucide-react";

import downloadImage from "../assets/download.jpeg";
//import familyImage from "../assets/family.jpg";
//import lunchImage from "../assets/lunch.jpg";
import logoImage from "../assets/logo_2.png";


/* =====================================================
   PROMOTION IMAGE MAP
===================================================== */

const PROMOTION_IMAGES = {
  "download.jpeg": downloadImage,
  "family.jpg": familyImage,
  "lunch.jpg": lunchImage,
};


/* =====================================================
   GET PROMOTION IMAGE
===================================================== */

function getPromotionImage(image) {

  if (!image) {
    return "";
  }

  const value = String(image).trim();

  if (!value) {
    return "";
  }


  /* External image */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }


  /*
   * Handles:
   *
   * download.jpeg
   * /download.jpeg
   * images/download.jpeg
   * /tabsway-tv/images/download.jpeg
   */

  const filename = value
    .split("/")
    .pop()
    .trim();


  return PROMOTION_IMAGES[filename] || "";
}


/* =====================================================
   PROMOTION CARD
===================================================== */

export default function PromotionCard({
  promotion = {},
}) {

  const imageUrl = getPromotionImage(
    promotion.image
  );


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
              `url("${imageUrl}")`,
          }}
          aria-hidden="true"
        />
      )}


      {/* =================================================
          NO IMAGE FALLBACK
      ================================================= */}

      {!imageUrl && (
        <div
          className="promotion-background promotion-background-fallback"
          aria-hidden="true"
        />
      )}


      {/* =================================================
          PHOTO OVERLAY
      ================================================= */}

      <div
        className="photo-overlay"
        aria-hidden="true"
      />


      {/* =================================================
          BOTTOM OVERLAY
      ================================================= */}

      <div
        className="photo-bottom"
        aria-hidden="true"
      />


      {/* =================================================
          DECORATIVE LIGHTS
      ================================================= */}

      <div
        className="yellow-glow"
        aria-hidden="true"
      />

      <div
        className="red-glow"
        aria-hidden="true"
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="tv-header">


        {/* =================================================
            LOGO
        ================================================= */}

        <img
          src={logoImage}
          alt="TabsWay Kitchen"
          className="header-logo"
          draggable="false"
        />


        {/* =================================================
            SPECIAL OFFER
        ================================================= */}

        <div
          className="header-promo"
          role="status"
          aria-label={
            promotion.headerText ||
            "Special Offer"
          }
        >

          <span
            className="header-promo-dot"
            aria-hidden="true"
          />

          <span className="header-promo-label">
            {promotion.headerText ||
              "SPECIAL OFFER"}
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

        <div
          className="accent"
          aria-hidden="true"
        />


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

        {(promotion.price ||
          promotion.buttonText) && (

          <div className="offer">


            {/* =================================================
                PRICE
            ================================================= */}

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


            {/* =================================================
                CTA
            ================================================= */}

            {promotion.buttonText && (
              <div
                className="cta"
                role="presentation"
              >

                <span>
                  {promotion.buttonText}
                </span>

                <ArrowRight
                  size={23}
                  strokeWidth={3}
                  aria-hidden="true"
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

        <div
          className="footer-line"
          aria-hidden="true"
        />

        <span>
          {promotion.footerText ||
            "FRESH • DELICIOUS • MADE WITH CARE"}
        </span>

        <div
          className="footer-line"
          aria-hidden="true"
        />

      </footer>


      {/* =================================================
          SHINE EFFECT
      ================================================= */}

      <div
        className="shine"
        aria-hidden="true"
      />


    </main>
  );
}