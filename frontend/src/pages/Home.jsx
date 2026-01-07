import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import { getForecast } from "../services/weatherServices";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  // Cargar última ciudad consultada
  useEffect(() => {
    const ultimaCiudad = localStorage.getItem("ultimaCiudad");
    if (ultimaCiudad) {
      setCity(ultimaCiudad);
      fetchForecast(ultimaCiudad);
    }
  }, []);

  const fetchForecast = async (ciudadParam) => {
    try {
      const ciudad = ciudadParam || city;

      if (!ciudad.trim()) {
        setError("Por favor ingresa una ciudad.");
        return;
      }

      // Compartir ciudad con otras vistas (Tendencias, Historial, etc.)
      localStorage.setItem("ultimaCiudad", ciudad);

      const data = await getForecast(ciudad);
      setForecast(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener la predicción del clima.");
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
              fetchForecast();
            }}
          >
            <input
              type="text"
              placeholder="Busca una ciudad..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input type="submit" value="Buscar" />
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>

      {/* Forecast Section */}
      <div className="fullwidth-block">
        <div className="container">
          <div className="forecast-container">
            {forecast && forecast.resumen?.length > 0 ? (
              <>
                {/* Hoy */}
                <div className="today forecast">
                  <div className="forecast-header">
                    <div className="day">
                      {new Date(
                        forecast.resumen[0].fecha
                      ).toLocaleDateString("es-EC", {
                        weekday: "long",
                      })}
                    </div>
                    <div className="date">
                      {new Date(
                        forecast.resumen[0].fecha
                      ).toLocaleDateString("es-EC", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="forecast-content">
                    <div className="location">{city}</div>
                    <div className="degree">
                      <div className="num">
                        {forecast.resumen[0].temperatura_promedio}
                        <sup>°</sup>C
                      </div>
                      <div className="forecast-icon">
                        <img
                          src="/images/icons/icon-1.svg"
                          alt=""
                          width="90"
                        />
                      </div>
                    </div>

                    <span>
                      <img src="/images/icon-umberella.png" alt="" />
                      {forecast.resumen[0].humedad_promedio}%
                    </span>
                    <span>
                      <img src="/images/icon-wind.png" alt="" />
                      {forecast.resumen[0].viento_promedio} km/h
                    </span>
                    <span>
                      <img src="/images/icon-compass.png" alt="" />
                      {forecast.resumen[0].clima_predominante}
                    </span>
                  </div>
                </div>

                {/* Días siguientes */}
                {forecast.resumen.slice(1).map((item, idx) => (
                  <div className="forecast" key={idx}>
                    <div className="forecast-header">
                      <div className="day">
                        {new Date(item.fecha).toLocaleDateString("es-EC", {
                          weekday: "short",
                        })}
                      </div>
                      <div className="date">
                        {new Date(item.fecha).toLocaleDateString("es-EC", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>

                    <div className="forecast-content">
                      <div className="forecast-icon">
                        <img
                          src="/images/icons/icon-1.svg"
                          alt=""
                          width="48"
                        />
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

        {/* Mapa */}
        {forecast?.lat && forecast?.lon && (
          <div className="container" style={{ marginTop: "40px" }}>
            <Map mode="city" lat={forecast.lat} lng={forecast.lon} />
          </div>
        )}
      </div>
    </>
  );
}
