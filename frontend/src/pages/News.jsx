import React, { useEffect, useState } from "react";
import { getTendencias } from "../services/tendencias-services";

export default function News() {
  const [tendencias, setTendencias] = useState([]);

  useEffect(() => {
    getTendencias().then(data => {
      setTendencias(data);
    });
  }, []);

  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span>News</span>
          </div>
        </div>

        <div className="fullwidth-block">
          <div className="container">
            <div className="row">

              {/* Contenido principal */}
              <div className="content col-md-8">

                {/* Generar noticias desde el backend */}
                {tendencias.map((item, idx) => (
                  <div className="post" key={idx}>
                    <h2 className="entry-title">
                      Clima en {item.ciudad}
                    </h2>

                    <div className="featured-image">
                      <img src="images/featured-image-1.jpg" alt="" />
                    </div>

                    {"temperatura" in item ? (
                      <p>
                        Temperatura actual: <strong>{item.temperatura}°C</strong><br />
                        Humedad: <strong>{item.humedad}%</strong><br />
                        Calidad del aire: <strong>{item.calidad_aire}</strong><br />
                        Fecha: <strong>{item.fecha}</strong>
                      </p>
                    ) : (
                      <p>
                        Promedio temperatura: <strong>{item.temperatura_promedio}°C</strong><br />
                        Promedio viento: <strong>{item.viento_promedio} m/s</strong><br />
                        Promedio UV: <strong>{item.uv_promedio}</strong><br />
                        Radiación promedio: <strong>{item.radiacion_promedio}</strong><br />
                        Tendencia temperatura: <strong>{item.tendencia_temperatura}</strong><br />
                        Tendencia viento: <strong>{item.tendencia_viento}</strong><br />
                        Tendencia UV: <strong>{item.tendencia_uv}</strong><br />
                        Tendencia radiación: <strong>{item.tendencia_radiacion}</strong>
                      </p>
                    )}

                    <a href="#" className="button">
                      Leer más
                    </a>
                  </div>
                ))}

              </div>
              <div className="sidebar col-md-3 col-md-offset-1">
                <div className="widget">
                  <h3 className="widget-title">Hot News</h3>
                  <ul className="arrow-list">
                    <li><a href="#">Accusamus dignissimos</a></li>
                    <li><a href="#">Ducimus praesentium</a></li>
                    <li><a href="#">Voluptatum deleniti corrupti</a></li>
                    <li><a href="#">Wuos dolores excepturi sint</a></li>
                    <li><a href="#">Occaecati provident dolor</a></li>
                  </ul>
                </div>

                <div className="widget">
                  <h3 className="widget-title">Categories</h3>
                  <ul className="arrow-list">
                    <li><a href="#">Tendencias</a></li>
                    <li><a href="#">Análisis Avanzado</a></li>
                  </ul>
                </div>

                <div className="widget top-rated">
                  <h3 className="widget-title">Top rated posts</h3>
                  <ul>
                    <li>
                      <h3 className="entry-title">
                        <a href="#">Doloremque laudantium lorem</a>
                      </h3>
                      <div className="rating">
                        <strong>5.5</strong> (759 rates)
                      </div>
                    </li>
                    {/* repetición omitida */}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

