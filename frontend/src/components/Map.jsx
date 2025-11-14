import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map({ lat, lng, mode = "current" }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBjCD2a95Ibh84EiejFxd0w5Va7Lsrz_4o"
  });

  const [currentPosition, setCurrentPosition] = useState(null);

  // Si el mapa debe mostrar la ubicación actual
  useEffect(() => {
    if (mode === "current" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => alert("No se pudo obtener la ubicación.")
      );
    }
  }, [mode]);

  if (!isLoaded) return <p>Cargando mapa...</p>;

  // Modo GPS
  if (mode === "current") {
    if (!currentPosition) return <p>Obteniendo ubicación...</p>;
    return (
      <MapContainer position={currentPosition} />
    );
  }

  // Modo ciudad consultada
  if (mode === "city" && lat && lng) {
    return (
      <MapContainer position={{ lat, lng }} />
    );
  }

  return null;
}

// Contenedor reutilizable
function MapContainer({ position }) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position}
        zoom={12}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}
