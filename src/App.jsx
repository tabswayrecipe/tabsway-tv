import {
  useEffect,
  useState
} from "react";

import PromotionCard
  from "./components/PromotionCard";

import Loading
  from "./components/Loading";


const DATA_URL =
  "/tabsway-tv/data/promotions.json";


function getCurrentMinutes() {

  const now =
    new Date();

  return (
    now.getHours() * 60 +
    now.getMinutes()
  );
}


function timeToMinutes(time) {

  const [
    hours,
    minutes
  ] = time
    .split(":")
    .map(Number);

  return (
    hours * 60 +
    minutes
  );
}


function isPromotionActive(
  promotion
) {

  if (!promotion.enabled) {
    return false;
  }

  if (
    !promotion.schedule ||
    !promotion.schedule.enabled
  ) {
    return true;
  }

  const now =
    getCurrentMinutes();

  const start =
    timeToMinutes(
      promotion.schedule.start
    );

  const end =
    timeToMinutes(
      promotion.schedule.end
    );

  if (start <= end) {

    return (
      now >= start &&
      now <= end
    );

  }

  return (
    now >= start ||
    now <= end
  );
}


export default function App() {

  const [
    promotions,
    setPromotions
  ] = useState([]);

  const [
    settings,
    setSettings
  ] = useState(null);

  const [
    currentIndex,
    setCurrentIndex
  ] = useState(0);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState(false);


  async function loadPromotions() {

    try {

      setError(false);

      const response =
        await fetch(
          `${DATA_URL}?t=${Date.now()}`
        );

      if (!response.ok) {
        throw new Error(
          "Failed to load promotions"
        );
      }

      const data =
        await response.json();

      const activePromotions =
        data.promotions
          .filter(
            isPromotionActive
          )
          .sort(
            (a, b) =>
              a.priority -
              b.priority
          );

      setPromotions(
        activePromotions
      );

      setSettings(
        data.settings
      );

      setCurrentIndex(0);

      setLoading(false);

    } catch (err) {

      console.error(err);

      setError(true);

      setLoading(false);

    }

  }


  useEffect(() => {

    loadPromotions();

    /*
      Refresh JSON every 5 minutes.
    */

    const refresh =
      setInterval(
        loadPromotions,
        5 * 60 * 1000
      );

    return () =>
      clearInterval(refresh);

  }, []);


  useEffect(() => {

    if (
      promotions.length <= 1
    ) {
      return;
    }

    const promotion =
      promotions[currentIndex];

    const seconds =
      promotion?.displaySeconds ||
      settings?.rotationSeconds ||
      8;

    const timer =
      setTimeout(() => {

        setCurrentIndex(
          previous => {

            if (
              previous + 1 >=
              promotions.length
            ) {

              return 0;

            }

            return previous + 1;

          }
        );

      }, seconds * 1000);

    return () =>
      clearTimeout(timer);

  }, [
    currentIndex,
    promotions,
    settings
  ]);


  /*
    Reload the page if the TV
    has been running for a long time.
  */

  useEffect(() => {

    const healthCheck =
      setInterval(() => {

        if (
          document.visibilityState ===
          "visible"
        ) {

          loadPromotions();

        }

      }, 30 * 60 * 1000);

    return () =>
      clearInterval(
        healthCheck
      );

  }, []);


  if (loading) {
    return <Loading />;
  }


  if (error) {

    return (

      <div className="error-screen">

        <div className="error-logo">
          TABS WAY
        </div>

        <h1>
          Unable to load promotions
        </h1>

        <p>
          Checking connection...
        </p>

        <button
          onClick={
            loadPromotions
          }
        >
          TRY AGAIN
        </button>

      </div>

    );

  }


  if (
    !settings?.enabled ||
    promotions.length === 0
  ) {

    return (

      <div className="idle-screen">

        <div className="idle-logo">
          TABS WAY KITCHEN
        </div>

        <div>
          Fresh food. Great moments.
        </div>

      </div>

    );

  }


  return (

    <div className="app">

      <PromotionCard
        promotion={
          promotions[currentIndex]
        }
      />

      <div className="progress">

        {promotions.map(
          (promotion, index) => (

            <div
              key={promotion.id}
              className={
                index === currentIndex
                  ? "progress-dot active"
                  : "progress-dot"
              }
            />

          )
        )}

      </div>

    </div>

  );

}