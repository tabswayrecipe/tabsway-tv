import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import PromotionCard
  from "./components/PromotionCard";

import Loading
  from "./components/Loading";


const BASE_URL =
  import.meta.env.BASE_URL;


const DATA_URL =
  `${BASE_URL}data/promotions.json`;


function getCurrentMinutes() {

  const now =
    new Date();

  return (
    now.getHours() * 60 +
    now.getMinutes()
  );
}


function timeToMinutes(
  time
) {

  if (!time) {
    return 0;
  }

  const parts =
    time.split(":");

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  return (
    hours * 60 +
    minutes
  );
}


function isPromotionActive(
  promotion
) {

  if (
    promotion.enabled === false
  ) {
    return false;
  }


  if (
    !promotion.schedule ||
    promotion.schedule.enabled !== true
  ) {

    return true;

  }


  const current =
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
      current >= start &&
      current <= end
    );

  }


  /*
    Handles schedules crossing
    midnight, for example:

    22:00 → 02:00
  */

  return (
    current >= start ||
    current <= end
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
  ] = useState({
    enabled: true,
    rotationSeconds: 8,
    refreshMinutes: 5
  });


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


  const [
    lastUpdated,
    setLastUpdated
  ] = useState(null);


  const loadPromotions =
    useCallback(
      async () => {

        try {

          setError(false);


          const response =
            await fetch(
              `${DATA_URL}?t=${Date.now()}`,
              {
                cache: "no-store"
              }
            );


          if (!response.ok) {

            throw new Error(
              `HTTP ${response.status}`
            );

          }


          const data =
            await response.json();


          const allPromotions =
            Array.isArray(
              data.promotions
            )
              ? data.promotions
              : [];


          const activePromotions =
            allPromotions
              .filter(
                isPromotionActive
              )
              .sort(
                (a, b) =>
                  Number(
                    a.priority || 999
                  ) -
                  Number(
                    b.priority || 999
                  )
              );


          setPromotions(
            activePromotions
          );


          setSettings({

            enabled:
              data.settings?.enabled !== false,

            rotationSeconds:
              Number(
                data.settings
                  ?.rotationSeconds
              ) || 8,

            refreshMinutes:
              Number(
                data.settings
                  ?.refreshMinutes
              ) || 5

          });


          setCurrentIndex(0);

          setLastUpdated(
            new Date()
          );

          setLoading(false);

        } catch (err) {

          console.error(
            "Promotion loading error:",
            err
          );

          setError(true);

          setLoading(false);

        }

      },
      []
    );


  /*
    Initial download
  */

  useEffect(() => {

    loadPromotions();

  }, [
    loadPromotions
  ]);


  /*
    Refresh promotions
    automatically.
  */

  useEffect(() => {

    const minutes =
      settings.refreshMinutes || 5;


    const interval =
      setInterval(
        loadPromotions,
        minutes *
        60 *
        1000
      );


    return () =>
      clearInterval(
        interval
      );

  }, [
    settings.refreshMinutes,
    loadPromotions
  ]);


  /*
    Rotate promotions.
  */

  useEffect(() => {

    if (
      promotions.length <= 1
    ) {
      return;
    }


    const promotion =
      promotions[currentIndex];


    const seconds =
      Number(
        promotion?.displaySeconds
      ) ||
      settings.rotationSeconds ||
      8;


    const timer =
      setTimeout(
        () => {

          setCurrentIndex(
            previous => {

              return (
                previous + 1
              ) %
              promotions.length;

            }
          );

        },
        seconds * 1000
      );


    return () =>
      clearTimeout(
        timer
      );

  }, [
    currentIndex,
    promotions,
    settings.rotationSeconds
  ]);


  /*
    Re-check schedules
    every minute.

    This allows a lunch
    promotion to disappear
    automatically when its
    scheduled time ends.
  */

  useEffect(() => {

    const scheduleTimer =
      setInterval(
        loadPromotions,
        60 * 1000
      );


    return () =>
      clearInterval(
        scheduleTimer
      );

  }, [
    loadPromotions
  ]);


  /*
    Fullscreen attempt.

    Useful when running inside
    a browser or WebView.
  */

  useEffect(() => {

    const enableFullscreen =
      async () => {

        try {

          if (
            document.fullscreenElement
          ) {
            return;
          }


          if (
            document.documentElement
              .requestFullscreen
          ) {

            await document
              .documentElement
              .requestFullscreen();

          }

        } catch {

          /*
            Android TV WebView may
            already be fullscreen.
          */

        }

      };


    const handleInteraction =
      () => {

        enableFullscreen();

      };


    window.addEventListener(
      "click",
      handleInteraction,
      {
        once: true
      }
    );


    return () => {

      window.removeEventListener(
        "click",
        handleInteraction
      );

    };

  }, []);


  /*
    Memoized current promotion.
  */

  const currentPromotion =
    useMemo(
      () =>
        promotions[
          currentIndex
        ],
      [
        promotions,
        currentIndex
      ]
    );


  if (loading) {

    return (
      <Loading />
    );

  }


  if (error) {

    return (

      <div className="error-screen">

        <img
          className="error-logo"
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
        />


        <h1>
          Connection unavailable
        </h1>


        <p>
          Checking for the latest
          Tabsway Kitchen promotions...
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
    settings.enabled === false ||
    promotions.length === 0
  ) {

    return (

      <div className="idle-screen">

        <img
          className="idle-logo-image"
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
        />


        <div className="idle-message">

          Fresh food.
          Great moments.

        </div>

      </div>

    );

  }


  return (

    <div className="app">


      {currentPromotion && (

        <PromotionCard
          key={
            currentPromotion.id
          }
          promotion={
            currentPromotion
          }
        />

      )}


      <div className="progress">

        {promotions.map(
          (promotion, index) => (

            <button
              key={
                promotion.id
              }
              className={
                index === currentIndex
                  ? "progress-dot active"
                  : "progress-dot"
              }
              aria-label={
                `Show promotion ${
                  index + 1
                }`
              }
              onClick={() =>
                setCurrentIndex(
                  index
                )
              }
            />

          )
        )}

      </div>


      <div className="connection-status">

        <span className="status-dot"></span>

        LIVE

      </div>


      {lastUpdated && (

        <div className="updated-status">

          Updated{" "}
          {lastUpdated.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          )}

        </div>

      )}

    </div>

  );

}