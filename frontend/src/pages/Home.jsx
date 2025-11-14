import React, { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      if (!city.trim()) {
        setError("Por favor ingresa una ciudad.");
        return;
      }

      console.log(`🌍 Consultando resumen diario para: ${city}`);

      const response = await fetch(
        `http://localhost:3000/api/clima/resumen-diario?city=${city}`
      );

      if (!response.ok) throw new Error("Error al obtener el resumen del clima");

      const data = await response.json();
      console.log("📊 Resumen diario recibido:", data);

      setWeather(data); // <-- ahora guardarás { city, resumen: [...] }
      setError("");
    } catch (err) {
      console.error("❌ Error en fetchWeather:", err);
      setError("No se pudo obtener la información del clima.");
    }
  };

  const cameras = [
    { city: "New York", img: "live-camera-1.jpg" },
    { city: "Los Angeles", img: "live-camera-2.jpg" },
    { city: "Chicago", img: "live-camera-3.jpg" },
    { city: "London", img: "live-camera-4.jpg" },
  ];

  const features = [
    {
      title: "Natus error sit voluptatem accusantium",
      desc: "Doloremque laudantium totam rem aperiam inventore veritatis et quasi architecto beatae vitae.",
    },
    {
      title: "Sed ut perspiciatis unde omnis",
      desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
    {
      title: "Neque porro quisquam est",
      desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
    },
  ];

  const analysis = [
    "Accusantium doloremque laudantium rem aperiam",
    "Eaque ipsa quae ab illo inventore veritatis quasi",
    "Architecto beatae vitae dicta sunt explicabo",
    "Nemo enim ipsam voluptatem quia voluptas",
    "Aspernatur aut odit aut fugit, sed quia consequuntur",
    "Magni dolores eos qui ratione voluptatem sequi",
    "Neque porro quisquam est qui dolorem ipsum quia",
  ];

  return (
    <>

      {/* Hero Section */}
      <div
        className="hero"
        style={{
          backgroundImage: "url('/images/banner.png')",
        }}
      >
        <div className="container">
          <form
            className="find-location"
            onSubmit={(e) => {
              e.preventDefault();
              fetchWeather();
            }}
          >
            <input
              type="text"
              placeholder="Find your location..."
              value={city}
              onChange={(e) => {
                console.log(e.target.value)
                setCity(e.target.value)
              }}
            />
            <input type="submit" value="Find" />
          </form>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="fullwidth-block">
        <div className="container"> {/* <-- limita el ancho y centra */}
          <div className="forecast-container">
            {weather && weather.resumen.length > 0 ? (
              <>
                {/* Hoy */}
                <div className="today forecast">
                  <div className="forecast-header">
                    <div className="day">
                      {new Date(weather.resumen[0].fecha).toLocaleDateString("es-EC", { weekday: "long" })}
                    </div>
                    <div className="date">
                      {new Date(weather.resumen[0].fecha).toLocaleDateString("es-EC", { day: "numeric", month: "short" })}
                    </div>
                  </div>
                  <div className="forecast-content">
                    <div className="location">{weather.city}</div>
                    <div className="degree">
                      <div className="num">
                        {weather.resumen[0].temperatura_promedio}<sup>°</sup>C
                      </div>
                      <div className="forecast-icon">
                        <img src="/images/icons/icon-1.svg" alt="" width="90" />
                      </div>
                    </div>
                    <span>
                      <img src="/images/icon-umberella.png" alt="" />{weather.resumen[0].humedad_promedio}%
                    </span>
                    <span>
                      <img src="/images/icon-wind.png" alt="" />{weather.resumen[0].viento_promedio} km/h
                    </span>
                    <span>
                      <img src="/images/icon-compass.png" alt="" />{weather.resumen[0].clima_predominante}
                    </span>
                  </div>
                </div>

                {/* Días siguientes */}
                {weather.resumen.slice(1).map((item, idx) => (
                  <div className="forecast" key={idx}>
                    <div className="forecast-header">
                      <div className="day">
                        {new Date(item.fecha).toLocaleDateString("es-EC", { weekday: "short" })}
                      </div>
                      <div className="date">
                        {new Date(item.fecha).toLocaleDateString("es-EC", { day: "numeric", month: "short" })}
                      </div>
                    </div>
                    <div className="forecast-content">
                      <div className="forecast-icon">
                        <img src="/images/icons/icon-1.svg" alt={item.clima_predominante} width="48" />
                      </div>
                      <div className="degree">
                        {item.temperatura_promedio}<sup>°</sup>C
                      </div>
                      <small>
                        {item.humedad_promedio}<sup>%</sup>
                      </small>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Cargando resumen diario...</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Live Cameras Section */}
        <div className="fullwidth-block">
          <div className="container">
            <h2 className="section-title">Live cameras</h2>
            <div className="row">
              {cameras.map((cam) => (
                <div className="col-md-3 col-sm-6" key={cam.city}>
                  <div className="live-camera">
                    <figure className="live-camera-cover">
                      <img src={`/images/${cam.img}`} alt={cam.city} />
                    </figure>
                    <h3 className="location">{cam.city}</h3>
                    <small className="date">8 Oct, 8:00 AM</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="fullwidth-block" style={{ backgroundColor: "#262936" }}>
          <div className="container">
            <div className="row">
              {[1, 2, 3].map((n) => (
                <div className="col-md-4" key={n}>
                  <div className="news">
                    <div className="date">06.10</div>
                    <h3>
                      <a href="#">Doloremque laudantium totam sequi</a>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo saepe assumenda dolorem modi, expedita voluptatum ducimus necessitatibus.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="fullwidth-block">
          <div className="container">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-4">
                <h2 className="section-title">Application features</h2>
                <ul className="arrow-feature">
                  {features.map((f, i) => (
                    <li key={i}>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Middle Column */}
              <div className="col-md-4">
                <h2 className="section-title">Weather analysis</h2>
                <ul className="arrow-list">
                  {analysis.map((txt) => (
                    <li key={txt}>
                      <a href="#">{txt}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column */}
              <div className="col-md-4">
                <h2 className="section-title">Awesome Photos</h2>
                <div className="photo-grid">
                  {[...Array(9)].map((_, i) => (
                    <a href="#" key={i}>
                      <img src={`/images/thumb-${i + 1}.jpg`} alt={`thumb-${i + 1}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
