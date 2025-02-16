import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HeroSection: React.FC = () => {
  const [floodRiskScore, setFloodRiskScore] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to New York

  const handleLocationChange = (lat: number, lng: number) => {
    // Set the new center of the map based on the input location
    setMapCenter([lat, lng]);

    // Simulate fetching the flood risk score for this location
    setFloodRiskScore(Math.random() * 100); // Random value between 0 and 100 for demo
  };

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Flood Risk Overview</h2>
          <p className="text-lg mb-6">Use this interactive map to see real-time flood risks for any location.</p>

          <div className="mb-6">
            <input
              type="text"
              className="px-4 py-2 rounded-lg text-black"
              placeholder="Enter a location..."
              onChange={(e) => handleLocationChange(40.7128, -74.0060)} // Simulate user input for demo
            />
          </div>

          {floodRiskScore !== null && (
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <h3 className="text-xl">Flood Risk Score:</h3>
              <p>{floodRiskScore.toFixed(2)} (out of 100)</p>
            </div>
          )}
        </div>

        <MapContainer
          center={mapCenter} // Dynamically update map center based on lat/lng
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={mapCenter}>
            <Popup>Flood risk: High</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default HeroSection;
