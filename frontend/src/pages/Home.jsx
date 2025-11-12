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

      console.log(`🌍 Enviando solicitud al backend para la ciudad: ${city}`);

      const response = await fetch(`http://localhost:3000/api/clima?city=${city}`);
      console.log("📡 Respuesta recibida del backend:", response.status);

      if (!response.ok) throw new Error("Error al obtener datos del clima");

      const data = await response.json();
      console.log("✅ Datos del clima recibidos:", data);

      setWeather(data);
      setError("");
    } catch (err) {
      console.error("❌ Error en fetchWeather:", err);
      setError("No se pudo obtener la información del clima.");
    }
  };

  const forecastDays = [
    { day: "Tuesday", icon: "icon-3.svg" },
    { day: "Wednesday", icon: "icon-5.svg" },
    { day: "Thursday", icon: "icon-7.svg" },
    { day: "Friday", icon: "icon-12.svg" },
    { day: "Saturday", icon: "icon-13.svg" },
    { day: "Sunday", icon: "icon-14.svg" },
  ];

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
      <div className="forecast-table">
        <div className="container">
          <div className="forecast-container">
            <div className="today forecast">
              <div className="forecast-header">
                <div className="day">Monday</div>
                <div className="date">6 Oct</div>
              </div>
              <div className="forecast-content">
                <div className="location">New York</div>
                <div className="degree">
                  <div className="num">
                    23<sup>°</sup>C
                  </div>
                  <div className="forecast-icon">
                    <img src="/images/icons/icon-1.svg" alt="" width="90" />
                  </div>
                </div>
                <span>
                  <img src="/images/icon-umberella.png" alt="" />20%
                </span>
                <span>
                  <img src="/images/icon-wind.png" alt="" />18km/h
                </span>
                <span>
                  <img src="/images/icon-compass.png" alt="" />East
                </span>
              </div>
            </div>

            {forecastDays.map((item) => (
              <div className="forecast" key={item.day}>
                <div className="forecast-header">
                  <div className="day">{item.day}</div>
                </div>
                <div className="forecast-content">
                  <div className="forecast-icon">
                    <img src={`/images/icons/${item.icon}`} alt={item.day} width="48" />
                  </div>
                  <div className="degree">
                    23<sup>°</sup>C
                  </div>
                  <small>
                    18<sup>°</sup>
                  </small>
                </div>
              </div>
            ))}
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
