import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface EnvironmentalData {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

const ExploreMap: React.FC = () => {
  const [data, setData] = useState<EnvironmentalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiKey = "b23ce6470ea462e17b4116735040406a"; // Replace with your OpenWeatherMap API key

  // Fetch real-time air quality data for cities in Kenya
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Cities in Kenya: Nairobi, Mombasa, Kisumu, Eldoret, Nakuru
        const cities = [
          { city: "Nairobi", lat: 1.2921, lon: 36.8219 },
          { city: "Mombasa", lat: -4.0435, lon: 39.6682 },
          { city: "Kisumu", lat: -0.0917, lon: 34.7680 },
          { city: "Eldoret", lat: 0.5186, lon: 35.2698 },
          { city: "Nakuru", lat: -0.3031, lon: 36.0662 },
        ];

        const responses = await Promise.all(
          cities.map((city) =>
            axios.get(
              `http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
            )
          )
        );

        const newData = responses.map((response, index) => {
          const airQuality = response.data.list[0].components;
          const aqi = response.data.list[0].main.aqi; // Air Quality Index (AQI)

          // Formatting the description to match AirVisual-like data
          return {
            lat: cities[index].lat,
            lng: cities[index].lon,
            title: cities[index].city,
            description: `Air Quality Index (AQI): ${aqi} | PM2.5: ${airQuality.pm2_5} µg/m³, PM10: ${airQuality.pm10} µg/m³, CO: ${airQuality.co} µg/m³, NO2: ${airQuality.no2} µg/m³, O3: ${airQuality.o3} µg/m³, SO2: ${airQuality.so2} µg/m³`,
          };
        });

        setData(newData);
      } catch (error) {
        console.error("Error fetching air quality data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-center text-4xl font-bold mt-8">Explore the Map - Kenya</h1>
      <div className="max-w-7xl mx-auto py-8">
        <MapContainer
          center={[1.2921, 36.8219]} // Centered to Nairobi (Kenya)
          zoom={6} // Adjust zoom level to focus on Kenya
          style={{ height: "600px", width: "100%" }}
        >
          {/* Base Map Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers for Environmental Data */}
          {data.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng] as LatLngExpression}
            >
              <Popup>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>{item.description}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ExploreMap;
