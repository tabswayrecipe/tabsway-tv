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

import logoImage
  from "./assets/logo_2.png";


/* =====================================================
   DATA URL
===================================================== */

const BASE_URL =
  import.meta.env.BASE_URL || "/";

const DATA_URL =
  `${BASE_URL}data/promotions.json`;


/* =====================================================
   TIME HELPERS
===================================================== */

function getCurrentMinutes() {

  const now = new Date();

  return (
    now.getHours() * 60 +
    now.getMinutes()
  );
}


function timeToMinutes(time) {

  if (!time) {
    return 0;
  }

  const parts =
    String(time).split(":");

  const hours =
    Number(parts[0]) || 0;

  const minutes =
    Number(parts[1]) || 0;

  return (
    hours * 60 +
    minutes
  );
}


/* =====================================================
   PROMOTION SCHEDULE
===================================================== */

function isPromotionActive(promotion) {

  if (!promotion) {
    return false;
  }


  /*
   * Explicitly disabled promotion
   */

  if (
    promotion.enabled === false
  ) {
    return false;
  }


  /*
   * No schedule means
   * promotion is always active.
   */

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


  /*
   * Normal schedule
   *
   * Example:
   * 11:00 → 15:00
   */

  if (start <= end) {

    return (
      current >= start &&
      current <= end
    );

  }


  /*
   * Overnight schedule
   *
   * Example:
   * 22:00 → 02:00
   */

  return (
    current >= start ||
    current <= end
  );
}


/* =====================================================
   SORT PROMOTIONS
===================================================== */

function sortPromotions(promotions) {

  return promotions
    .filter(isPromotionActive)
    .sort(
      (a, b) =>
        Number(a.priority ?? 999) -
        Number(b.priority ?? 999)
    );
}


/* =====================================================
   APP
===================================================== */

export default function App() {


  /* ===================================================
     PROMOTIONS
  =================================================== */

  const [
    promotions,
    setPromotions
  ] = useState([]);


  /* ===================================================
     SETTINGS
  =================================================== */

  const [
    settings,
    setSettings
  ] = useState({

    enabled: true,

    rotationSeconds: 8,

    refreshMinutes: 5

  });


  /* ===================================================
     CURRENT PROMOTION
  =================================================== */

  const [
    currentIndex,
    setCurrentIndex
  ] = useState(0);


  /* ===================================================
     LOADING
  =================================================== */

  const [
    loading,
    setLoading
  ] = useState(true);


  /* ===================================================
     ERROR
  =================================================== */

  const [
    error,
    setError
  ] = useState(false);


  /* ===================================================
     LAST UPDATED
  =================================================== */

  const [
    lastUpdated,
    setLastUpdated
  ] = useState(null);


  /* ===================================================
     LOAD PROMOTIONS
  =================================================== */

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


          /*
           * Your JSON structure is:
           *
           * {
           *   restaurant: "...",
           *   settings: {...},
           *   promotions: [...]
           * }
           */


          const allPromotions =
            Array.isArray(
              data?.promotions
            )
              ? data.promotions
              : [];


          /*
           * Filter and sort
           */

          const activePromotions =
            sortPromotions(
              allPromotions
            );


          /*
           * Settings
           */

          const newSettings = {

            enabled:
              data?.settings?.enabled !== false,

            rotationSeconds:
              Number(
                data?.settings?.rotationSeconds
              ) || 8,

            refreshMinutes:
              Number(
                data?.settings?.refreshMinutes
              ) || 5

          };


          /*
           * Save data
           */

          setPromotions(
            activePromotions
          );


          setSettings(
            newSettings
          );


          /*
           * Always start at
           * first promotion
           */

          setCurrentIndex(0);


          /*
           * Update timestamp
           */

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


  /* ===================================================
     INITIAL LOAD
  =================================================== */

  useEffect(() => {

    loadPromotions();

  }, [
    loadPromotions
  ]);


  /* ===================================================
     AUTOMATIC JSON REFRESH
  =================================================== */

  useEffect(() => {

    const minutes =
      Number(
        settings.refreshMinutes
      ) || 5;


    const interval =
      setInterval(
        loadPromotions,
        minutes * 60 * 1000
      );


    return () =>
      clearInterval(
        interval
      );

  }, [
    settings.refreshMinutes,
    loadPromotions
  ]);


  /* ===================================================
     PROMOTION ROTATION
  =================================================== */

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
      Number(
        settings.rotationSeconds
      ) ||
      8;


    const timer =
      setTimeout(
        () => {

          setCurrentIndex(
            previous => {

              const next =
                previous + 1;

              return (
                next %
                promotions.length
              );

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


  /* ===================================================
     RECHECK SCHEDULES
  =================================================== */

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


  /* ===================================================
     FULLSCREEN
  =================================================== */

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
           * Android TV WebView may
           * already be fullscreen.
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


  /* ===================================================
     CURRENT PROMOTION
  =================================================== */

  const currentPromotion =
    useMemo(
      () => {

        if (
          promotions.length === 0
        ) {
          return null;
        }


        return (
          promotions[currentIndex] ||
          promotions[0]
        );

      },
      [
        promotions,
        currentIndex
      ]
    );


  /* ===================================================
     LOADING SCREEN
  =================================================== */

  if (loading) {

    return (
      <Loading />
    );

  }


  /* ===================================================
     ERROR SCREEN
  =================================================== */

  if (error) {

    return (

      <div className="error-screen">

        <img
          className="error-logo"
          src={logoImage}
          alt="TabsWay Kitchen"
        />


        <h1>
          Connection unavailable
        </h1>


        <p>
          Checking for the latest
          TabsWay Kitchen promotions...
        </p>


        <button
          type="button"
          onClick={
            loadPromotions
          }
        >
          TRY AGAIN
        </button>

      </div>

    );

  }


  /* ===================================================
     IDLE SCREEN
  =================================================== */

  if (
    settings.enabled === false ||
    promotions.length === 0
  ) {

    return (

      <div className="idle-screen">

        <img
          className="idle-logo-image"
          src={logoImage}
          alt="TabsWay Kitchen"
        />


        <div className="idle-message">

          Fresh food.
          Great moments.

        </div>

      </div>

    );

  }


  /* ===================================================
     MAIN SCREEN
  =================================================== */

  return (

    <div className="app">


      {/* =================================================
          CURRENT PROMOTION
      ================================================= */}

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


      {/* =================================================
          PROMOTION NAVIGATION
      ================================================= */}

      {promotions.length > 1 && (

        <div className="progress">

          {promotions.map(
            (promotion, index) => (

              <button
                key={
                  promotion.id
                }

                type="button"

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

                aria-current={
                  index === currentIndex
                    ? "true"
                    : undefined
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

      )}


      {/* =================================================
          LIVE STATUS
      ================================================= */}

      <div className="connection-status">

        <span
          className="status-dot"
        />

        LIVE

      </div>


      {/* =================================================
          UPDATED STATUS
      ================================================= */}

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