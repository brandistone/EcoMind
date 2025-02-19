import type { CarbonData, EmissionSource } from "../types"
import { EMISSION_FACTORS } from "./calculations"

// Simulated user data store
const userDataStore: Record<
  string,
  {
    baselineElectricity: number
    baselineTransport: number
    baselineWater: number
    baselineFood: number
    reductionRate: number
  }
> = {
  user123: {
    baselineElectricity: 30, // kWh per day
    baselineTransport: 25, // miles per day
    baselineWater: 175, // liters per day
    baselineFood: 0.75, // kg per day
    reductionRate: 0.02, // 2% reduction per day
  },
}

export async function fetchCarbonData(userId: string, startDate: Date, endDate: Date): Promise<CarbonData[]> {
  // Get user-specific baseline data
  const userData = userDataStore[userId]
  if (!userData) {
    throw new Error("User not found")
  }

  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
  const data: CarbonData[] = []

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Calculate reduction factor based on days passed
    const reductionFactor = 1 - userData.reductionRate * i

    // Generate realistic daily values with user-specific baselines
    const electricity = calculateEmissions(userData.baselineElectricity * reductionFactor, EMISSION_FACTORS.electricity)

    const transport = calculateEmissions(userData.baselineTransport * reductionFactor, EMISSION_FACTORS.car)

    const water = calculateEmissions(userData.baselineWater * reductionFactor, EMISSION_FACTORS.water)

    const food = calculateEmissions(userData.baselineFood * reductionFactor, EMISSION_FACTORS.beef)

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

// Helper function to calculate emissions with random variation
function calculateEmissions(baseValue: number, emissionFactor: number): number {
  const variation = 0.1 // 10% random variation
  const randomFactor = 1 + (Math.random() * variation * 2 - variation)
  return baseValue * emissionFactor * randomFactor
}

