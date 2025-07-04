import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const freelancers = [
  { id: 1, name: "Alex Johnson", skill: "Graphic Designer", lat: 28.618, lng: 77.2105 },
  { id: 2, name: "Maria Rodriguez", skill: "Web Developer", lat: 28.6165, lng: 77.205 },
  { id: 3, name: "David Lee", skill: "Video Editor", lat: 28.62, lng: 77.215 },
];

const MapWithRadius = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => setPosition([28.6139, 77.209]) // fallback: Delhi
    );
  }, []);

  return position ? (
    <MapContainer center={position} zoom={13} scrollWheelZoom className="w-full h-full z-10">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={position} radius={5000} pathOptions={{ color: "purple", fillOpacity: 0.2 }} />
      <Marker position={position}>
        <Popup>You are here!</Popup>
      </Marker>
      {freelancers.map((freelancer) => (
        <Marker key={freelancer.id} position={[freelancer.lat, freelancer.lng]}>
          <Popup>
            <strong>{freelancer.name}</strong>
            <br />
            {freelancer.skill}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <p className="text-center text-gray-500">Loading map...</p>
  );
};

export default MapWithRadius;
