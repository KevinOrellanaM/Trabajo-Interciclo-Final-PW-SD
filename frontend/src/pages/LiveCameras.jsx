import React, { useEffect, useState } from "react";

export default function LiveCameras() {

  const [capitales, setCapitales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/clima/capitales")
      .then(res => res.json())
      .then(data => {
        setCapitales(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando /clima/capitales:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="site-content">

      <main className="main-content">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>Live cameras</span>
          </div>
        </div>

        <div className="fullwidth-block">
          <div className="container">

            {/* Filtros superiores */}
            <div className="filter">
              <div className="country filter-control">
                <label>Country</label>
                <span className="select control">
                  <select>
                    <option value="">All Countries</option>
                  </select>
                </span>
              </div>

              <div className="count filter-control">
                <label>Show per page</label>
                <span className="select control">
                  <select>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </span>
              </div>

              <div className="quality filter-control">
                <label>Only high quality</label>
                <span className="select control">
                  <select>
                    <option value="">Yes</option>
                    <option value="">No</option>
                  </select>
                </span>
              </div>
            </div>

            {/* Contenido dinámico */}
            {loading ? (
              <p>Cargando clima de capitales...</p>
            ) : (
              <div className="row">
                {capitales.map((cap, index) => (
                  <div className="col-md-3 col-sm-6" key={index}>
                    <div className="live-camera">
                      <figure className="live-camera-cover">
                        <img
                          src="/images/live-camera-1.jpg"
                          alt={cap.ciudad}
                        />
                      </figure>

                      <h3 className="location">{cap.ciudad}</h3>

                      <small className="date">
                        Temp: {cap.temperatura}°C — Humedad: {cap.humedad}%
                      </small>

                      <br />
                      <small className="date">
                        Fecha: {new Date(cap.fecha).toLocaleString()}
                      </small>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
