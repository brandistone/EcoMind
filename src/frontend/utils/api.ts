import type { CarbonData, EmissionSource } from "../types"

// Simulated API endpoint that would normally fetch from your backend
export async function fetchCarbonData(userId: string, startDate: Date, endDate: Date): Promise<CarbonData[]> {
  // This would normally be an API call to your backend
  // For now, we'll generate realistic data based on typical usage patterns

  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
  const data: CarbonData[] = []

  // Mock emission calculation functions
  const calculateElectricityEmissions = (kwh: number) => kwh * 0.5 // Example: kWh to CO2 conversion
  const calculateTransportEmissions = (miles: number, type: string) => {
    if (type === "car") return miles * 0.2
    return miles * 0.1 // bus
  }
  const calculateWaterEmissions = (liters: number) => liters * 0.001 // Example: liters to CO2 conversion
  const calculateFoodEmissions = (kg: number, type: string) => {
    if (type === "chicken") return kg * 2
    return kg * 5 // other meat
  }

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Generate realistic daily values with some random variation
    const electricity = calculateElectricityEmissions(
      25 + Math.random() * 5, // Average daily household usage ~30 kWh
    )

    const transport = calculateTransportEmissions(
      20 + Math.random() * 10, // Average daily commute ~25 miles
      Math.random() > 0.7 ? "bus" : "car",
    )

    const water = calculateWaterEmissions(
      150 + Math.random() * 50, // Average daily water usage ~175L
    )

    const food = calculateFoodEmissions(
      0.5 + Math.random() * 0.5, // Average daily meat consumption ~0.75kg
      "chicken",
    )

    const total = electricity + transport + water + food

    data.push({
      date: date.toISOString(),
      total,
      sources: {
        electricity,
        transport,
        water,
        food,
      },
    })
  }

  return data
}

export async function fetchEmissionsBySource(
  userId: string,
  source: EmissionSource,
  startDate: Date,
  endDate: Date,
): Promise<number> {
  const data = await fetchCarbonData(userId, startDate, endDate)
  return data.reduce((total, day) => total + day.sources[source], 0)
}

