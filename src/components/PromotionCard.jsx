import {
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function PromotionCard({
  promotion
}) {

  return (

    <main
      className="promotion"
      style={{
        backgroundImage:
          `url("${promotion.image}")`
      }}
    >

      <div className="image-overlay"></div>

      <div className="ambient-light"></div>

      <div className="promotion-content">

        <div className="badge">

          <Sparkles
            size={18}
          />

          {promotion.badge}

        </div>

        <h1>
          {promotion.title}
        </h1>

        <h2>
          {promotion.subtitle}
        </h2>

        <p>
          {promotion.description}
        </p>

        <div className="bottom-row">

          {promotion.price && (

            <div className="price">
              {promotion.price}
            </div>

          )}

          {promotion.buttonText && (

            <div className="cta">

              {promotion.buttonText}

              <ArrowRight
                size={22}
              />

            </div>

          )}

        </div>

      </div>

      <div className="bottom-brand">

        <span>
          TABS WAY KITCHEN
        </span>

      </div>

    </main>

  );
}