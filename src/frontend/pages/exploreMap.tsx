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

  // Replace with your AirVisual API key
  const apiKey = "YOUR_API_KEY"; 

  // Fetch real-time air quality data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Cities in Kenya: Nairobi, Mombasa, Kisumu
        const cities = [
          { city: "Nairobi", state: "", country: "Kenya" },
          { city: "Mombasa", state: "", country: "Kenya" },
          { city: "Kisumu", state: "", country: "Kenya" },
        ];

        const responses = await Promise.all(
          cities.map((city) =>
            axios.get(
              `https://api.iqair.com/v1/city?city=${city.city}&state=${city.state}&country=${city.country}&key=${apiKey}`
            )
          )
        );

        const newData = responses.map((response, index) => {
          const cityData = response.data;
          const airQuality = cityData.data.current.pollution.aqius; // AQI (Air Quality Index)
          return {
            lat: cityData.data.location.coordinates[0],
            lng: cityData.data.location.coordinates[1],
            title: cities[index].city,
            description: `Air Quality: ${airQuality} (AQI)`,
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
      <h1 className="text-center text-4xl font-bold mt-8">Explore the Map</h1>
      <div className="max-w-7xl mx-auto py-8">
        <MapContainer
          center={[1.2921, 36.8219]} // Default to Nairobi
          zoom={6}
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
