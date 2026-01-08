import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { cityCoordinates } from "../utils/cityCoordinates";

export default function Map({ city, mode = "current" }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBjCD2a95Ibh84EiejFxd0w5Va7Lsrz_4o",
  });

  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  // Modo: ubicación actual
  useEffect(() => {
    if (mode === "current" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setError("");
        },
        () => {
          setError("No se pudo obtener la ubicación actual.");
        }
      );
    }
  }, [mode]);

  // Modo: ciudad
  useEffect(() => {
    if (mode === "city" && city) {
      const coords = cityCoordinates[city];
      if (coords) {
        setPosition(coords);
        setError("");
      } else {
        setPosition(null);
        setError("Ciudad no encontrada en el listado.");
      }
    }
  }, [city, mode]);

  if (!isLoaded) return <p>Cargando mapa...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const defaultPosition = { lat: 0, lng: 0 };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position || defaultPosition}
        zoom={position ? 12 : 2}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
}
