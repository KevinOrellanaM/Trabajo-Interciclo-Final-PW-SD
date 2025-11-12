import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBjCD2a95Ibh84EiejFxd0w5Va7Lsrz_4o"
  });

  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => alert("No se pudo obtener la ubicación.")
      );
    }
  }, []);

  if (!isLoaded) return <p>Cargando mapa...</p>;
  if (!position) return <p>Obteniendo ubicación...</p>;

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position}
        zoom={14}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}
