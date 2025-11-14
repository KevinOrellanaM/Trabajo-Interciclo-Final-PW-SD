import React, { useState, useEffect } from "react";
import Map from "../components/Map";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Cargar última ciudad consultada
  useEffect(() => {
    const ultima = localStorage.getItem("ultimaCiudad");
    if (ultima) {
      setCity(ultima);
      fetchWeather(ultima);
    }
  }, []);

  const fetchWeather = async (ciudadParam) => {
    try {
      const ciudadAConsultar = ciudadParam || city;

      if (!ciudadAConsultar.trim()) {
        setError("Por favor ingresa una ciudad.");
        return;
      }

      console.log(`Consultando resumen diario para: ${ciudadAConsultar}`);

      // Guardar en LocalStorage
      localStorage.setItem("ultimaCiudad", ciudadAConsultar);

      const response = await fetch(
        `http://localhost:3000/api/clima/resumen-diario?city=${ciudadAConsultar}`
      );

      if (!response.ok) throw new Error("Error al obtener el resumen del clima");

      const data = await response.json();
      console.log("Resumen diario recibido:", data);

      setWeather(data);
      setError("");
    } catch (err) {
      console.error("Error en fetchWeather:", err);
      setError("No se pudo obtener la información del clima.");
    }
  };



  return (
    <>
      {/* Hero Section */}
      <div
        className="hero"
        style={{ backgroundImage: "url('/images/banner.png')" }}
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
              onChange={(e) => setCity(e.target.value)}
            />
            <input type="submit" value="Find" />
          </form>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="fullwidth-block">
        <div className="container">
          <div className="forecast-container">
            {weather && weather.resumen?.length > 0 ? (
              <>
                {/* Hoy */}
                <div className="today forecast">
                  <div className="forecast-header">
                    <div className="day">
                      {new Date(weather.resumen[0].fecha).toLocaleDateString("es-EC", {
                        weekday: "long"
                      })}
                    </div>
                    <div className="date">
                      {new Date(weather.resumen[0].fecha).toLocaleDateString("es-EC", {
                        day: "numeric",
                        month: "short"
                      })}
                    </div>
                  </div>
                  <div className="forecast-content">
                    <div className="location">{weather.city}</div>
                    <div className="degree">
                      <div className="num">
                        {weather.resumen[0].temperatura_promedio}
                        <sup>°</sup>C
                      </div>
                      <div className="forecast-icon">
                        <img src="/images/icons/icon-1.svg" alt="" width="90" />
                      </div>
                    </div>
                    <span>
                      <img src="/images/icon-umberella.png" alt="" />
                      {weather.resumen[0].humedad_promedio}%
                    </span>
                    <span>
                      <img src="/images/icon-wind.png" alt="" />
                      {weather.resumen[0].viento_promedio} km/h
                    </span>
                    <span>
                      <img src="/images/icon-compass.png" alt="" />
                      {weather.resumen[0].clima_predominante}
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
                        {new Date(item.fecha).toLocaleDateString("es-EC", {
                          day: "numeric",
                          month: "short"
                        })}
                      </div>
                    </div>
                    <div className="forecast-content">
                      <div className="forecast-icon">
                        <img src="/images/icons/icon-1.svg" alt="" width="48" />
                      </div>
                      <div className="degree">
                        {item.temperatura_promedio}
                        <sup>°</sup>C
                      </div>
                      <small>{item.humedad_promedio}%</small>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Cargando resumen diario...</p>
            )}
          </div>
        </div>

        {/* Mapa debajo del clima */}
        {weather?.lat && weather?.lon && (
          <div className="container" style={{ marginTop: "40px" }}>
            <h2 className="section-title">Ubicación en el mapa</h2>
            <Map mode="city" lat={weather.lat} lng={weather.lon} />
          </div>
        )}
      </div>
    </>
  );
}
