// EPA emission factors (2024)
export const EMISSION_FACTORS = {
    electricity: 0.92, // kg CO2 per kWh (US average)
    naturalGas: 0.18, // kg CO2 per kWh
    car: 0.404, // kg CO2 per mile (average car)
    bus: 0.14, // kg CO2 per mile per passenger
    water: 0.419, // kg CO2 per cubic meter
    beef: 27, // kg CO2 per kg
    pork: 12.1, // kg CO2 per kg
    chicken: 6.9, // kg CO2 per kg
    fish: 6.1, // kg CO2 per kg
    vegetables: 2.0, // kg CO2 per kg
    fruits: 1.1, // kg CO2 per kg
  }
  
  export function calculateElectricityEmissions(kWh: number): number {
    return kWh * EMISSION_FACTORS.electricity
  }
  
  export function calculateTransportEmissions(miles: number, mode: "car" | "bus" | "bike" | "walk"): number {
    switch (mode) {
      case "car":
        return miles * EMISSION_FACTORS.car
      case "bus":
        return miles * EMISSION_FACTORS.bus
      case "bike":
      case "walk":
        return 0
      default:
        return 0
    }
  }
  
  export function calculateWaterEmissions(liters: number): number {
    return (liters / 1000) * EMISSION_FACTORS.water // Convert liters to cubic meters
  }
  
  export function calculateFoodEmissions(
    amount: number,
    type: "beef" | "pork" | "chicken" | "fish" | "vegetables" | "fruits",
  ): number {
    return amount * EMISSION_FACTORS[type]
  }
  
  