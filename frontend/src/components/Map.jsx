import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map({ city, mode = "current" }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyBjCD2a95Ibh84EiejFxd0w5Va7Lsrz_4o", // reemplaza por tu API Key
  });

  const [position, setPosition] = useState(null);
  const [error, setError] = useState("");

  // Diccionario de ciudades con coordenadas
  const cityCoordinates = {
    Quito: { lat: -0.1807, lng: -78.4678 },
    Guayaquil: { lat: -2.170998, lng: -79.922359 },
    Cuenca: { lat: -2.90055, lng: -79.00464 },
    Loja: { lat: -4.0035, lng: -79.2048 },
    Ambato: { lat: -1.2539, lng: -78.6163 },
    Riobamba: { lat: -1.667, lng: -78.65 },
    Bogotá: { lat: 4.711, lng: -74.072 },
    BuenosAires: { lat: -34.6037, lng: -58.3816 },
    Cusco: { lat: -13.53195, lng: -71.96746 },
    Lima: { lat: -12.0464, lng: -77.0428 },
    Caracas: { lat: 10.4806, lng: -66.9036 },
    Santiago: { lat: -33.4489, lng: -70.6693 },
    Montevideo: { lat: -34.9011, lng: -56.1645 },
    Medellin: { lat: 6.2442, lng: -75.5812 },
    LaPaz: { lat: -16.5000, lng: -68.1500 },
    Asuncion: { lat: -25.2637, lng: -57.5759 },
    QuitoNorte: { lat: 0.2000, lng: -78.5000 }, // ejemplo extra
    GuayaquilSur: { lat: -2.2000, lng: -79.9000 },
    Arequipa: { lat: -16.4090, lng: -71.5375 },
    Valparaiso: { lat: -33.0472, lng: -71.6127 },
  };

  // Modo: ubicación actual
  useEffect(() => {
    if (mode === "current" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
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

  // Posición por defecto si aún no hay posición
  const defaultPosition = { lat: 0, lng: 0 };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position || defaultPosition}
        zoom={position ? 12 : 2} // zoom amplio si aún no hay posición
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
}
