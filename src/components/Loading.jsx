const BASE_URL =
  import.meta.env.BASE_URL;

export default function Loading() {

  return (

    <div className="loading-screen">

      <div className="loading-center">

        <img
          className="loading-logo"
          src={`${BASE_URL}logo.png`}
          alt="Tabsway Kitchen"
        />

        <div className="loader"></div>

        <div className="loading-text">
          Loading Tabsway Kitchen...
        </div>

      </div>

    </div>

  );
}