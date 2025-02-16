import * as L from 'leaflet'

// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 2); // Default view at a global scale

// Set up the tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Helper function to generate a mock climate risk score (you can replace it with real data/API)
const generateClimateRiskScore = (): string => {
  const score = Math.floor(Math.random() * 100); // Random risk score between 0-100
  return `Climate Risk Score: ${score} (Low to High Risk)`;
};

// Function to center map based on input location
const centerMap = (latitude: number, longitude: number): void => {
  map.setView([latitude, longitude], 10); // Zoom to 10 for more local details
};

// Search bar functionality
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const searchBar = document.getElementById('search-bar') as HTMLInputElement;
const climateScoreDiv = document.getElementById('climate-score') as HTMLDivElement;

searchButton.addEventListener('click', () => {
  const location = searchBar.value.trim();
  if (location) {
    // Simulate finding coordinates from the location input (you can use geocoding API in real use case)
    const mockCoordinates = { lat: 40.7128, lng: -74.0060 }; // Default to New York as an example

    // Update the map and show the new climate risk score
    centerMap(mockCoordinates.lat, mockCoordinates.lng);
    climateScoreDiv.textContent = generateClimateRiskScore();
  }
});

// Key Features Section functionality
const viewMoreButtons = document.querySelectorAll('.feature-card button');
viewMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alert('More details for this feature coming soon!');
  });
});
