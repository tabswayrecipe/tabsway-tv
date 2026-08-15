import {
  Sparkles,
  ArrowRight
} from "lucide-react";

const BASE_URL =
  import.meta.env.BASE_URL;


function getImageUrl(
  image
) {

  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${BASE_URL}${image}`;
}


export default function PromotionCard({
  promotion
}) {

  const imageUrl =
    getImageUrl(
      promotion.image
    );


  return (

    <main
      className="promotion"
      style={{
        backgroundImage:
          `url("${imageUrl}")`
      }}
    >

      <div className="image-overlay"></div>

      <div className="image-vignette"></div>

      <div className="ambient-light"></div>

      <div className="food-glow"></div>


      <div className="promotion-content">

        <div className="badge">

          <Sparkles
            size={18}
            strokeWidth={2.5}
          />

          <span>
            {promotion.badge}
          </span>

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

              <span>
                {promotion.buttonText}
              </span>

              <ArrowRight
                size={22}
                strokeWidth={3}
              />

            </div>

          )}

        </div>

      </div>


      <div className="bottom-brand">

        <img
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
        />

      </div>


      <div className="screen-shine"></div>

    </main>

  );
}