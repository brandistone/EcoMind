"use client"

import { useState, useEffect } from "react"
import { Car, Zap, Droplets, UtensilsCrossed, ArrowDown, Leaf, Bike } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { fetchCarbonData, fetchEmissionsBySource } from "../utils/api"
import type { CarbonData, EmissionSource } from "../types"
import { CarbonTooltip } from "../components/carbon-tooltip"

// Recommendations based on real emission factors and savings calculations
const recommendations = [
  {
    id: "bike-commute",
    icon: Bike,
    title: "Switch to Cycling",
    description: "Your 10-mile commute by car produces 4.04 kg CO2. Switch to cycling to eliminate these emissions.",
    impact: 1474.6, // 4.04 kg * 365 days
    action: "Plan Route",
    actionUrl: "/route-planner",
  },
  {
    id: "led-upgrade",
    icon: Zap,
    title: "LED Lighting Upgrade",
    description: "Replace your remaining traditional bulbs with LEDs to reduce electricity consumption by up to 90%.",
    impact: 120.45, // Based on average household lighting usage
    action: "Calculate Savings",
    actionUrl: "/energy-calculator",
  },
  {
    id: "meatless-monday",
    icon: UtensilsCrossed,
    title: "Meatless Monday",
    description: "Switching from beef to plant-based protein one day per week can significantly reduce your footprint.",
    impact: 230.88, // (27 kg CO2/kg beef - 2 kg CO2/kg vegetables) * 52 weeks * 0.2 kg
    action: "View Recipes",
    actionUrl: "/recipes",
  },
]

const ParticleField = () => {
  return (
    <div className="fixed inset-0 opacity-30">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() * 255}, ${Math.random() * 100 + 155}, 255, 0.6)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("daily")
  const [carbonData, setCarbonData] = useState<CarbonData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sourceEmissions, setSourceEmissions] = useState<Record<EmissionSource, number>>({
    electricity: 0,
    transport: 0,
    water: 0,
    food: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const endDate = new Date()
        let startDate: Date

        switch (timeframe) {
          case "daily":
            startDate = new Date(endDate)
            startDate.setDate(endDate.getDate() - 7)
            break
          case "weekly":
            startDate = new Date(endDate)
            startDate.setDate(endDate.getDate() - 28)
            break
          case "monthly":
            startDate = new Date(endDate)
            startDate.setMonth(endDate.getMonth() - 3)
            break
          default:
            startDate = new Date(endDate)
            startDate.setDate(endDate.getDate() - 7)
        }

        const data = await fetchCarbonData("user123", startDate, endDate)
        setCarbonData(data)

        // Fetch emissions by source
        const sources: EmissionSource[] = ["electricity", "transport", "water", "food"]
        const emissions: Record<EmissionSource, number> = {} as Record<EmissionSource, number>

        for (const source of sources) {
          emissions[source] = await fetchEmissionsBySource("user123", source, startDate, endDate)
        }
        setSourceEmissions(emissions)

        setError(null)
      } catch (err) {
        setError("Failed to fetch carbon data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  const currentFootprint = carbonData[carbonData.length - 1]?.total ?? 0
  const previousFootprint = carbonData[0]?.total ?? 0
  const reduction = (((previousFootprint - currentFootprint) / previousFootprint) * 100).toFixed(1)

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      <ParticleField />

      <div className="relative max-w-7xl mx-auto px-6 pt-8">
        {/* Carbon Footprint Summary */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-400">Your Carbon Footprint</h2>
                <div className="mt-2 flex items-baseline">
                  {isLoading ? (
                    <div className="h-12 w-32 bg-gray-700 animate-pulse rounded" />
                  ) : (
                    <>
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                        {currentFootprint.toFixed(1)}
                      </span>
                      <span className="ml-2 text-2xl text-gray-500">kg CO2</span>
                    </>
                  )}
                </div>
              </div>
              {!isLoading && (
                <div className="flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-lg">
                  <ArrowDown className="w-4 h-4 mr-1" />
                  {reduction}%
                </div>
              )}
            </div>
            <div className="mt-6 h-[100px]">
              {isLoading ? (
                <div className="h-full w-full bg-gray-700 animate-pulse rounded" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={carbonData}>
                    <XAxis
                      dataKey="date"
                      stroke="#4B5563"
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis stroke="#4B5563" />
                    <Tooltip content={<CarbonTooltip />} />
                    <Line type="monotone" dataKey="total" stroke="url(#gradient)" strokeWidth={2} dot={false} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Time Period Toggle & Quick Stats */}
          <div className="space-y-6">
            <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
              <div className="flex justify-between mb-4">
                {["daily", "weekly", "monthly"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period as typeof timeframe)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      timeframe === period
                        ? "bg-green-500/20 text-green-400 border border-green-500/50"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(sourceEmissions).map(([source, amount]) => (
                  <div key={source} className="p-4 rounded-lg bg-black/30 border border-green-500/20">
                    <div className="text-sm text-gray-400">{source.charAt(0).toUpperCase() + source.slice(1)}</div>
                    {isLoading ? (
                      <div className="h-8 w-24 bg-gray-700 animate-pulse rounded mt-1" />
                    ) : (
                      <div className="mt-1 text-2xl font-semibold">{amount.toFixed(1)} kg</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
          <h2 className="text-2xl font-semibold mb-6">Log Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Car, label: "Transport", value: sourceEmissions.transport },
              { icon: Zap, label: "Energy", value: sourceEmissions.electricity },
              { icon: Droplets, label: "Water", value: sourceEmissions.water },
              { icon: UtensilsCrossed, label: "Food", value: sourceEmissions.food },
            ].map(({ icon: Icon, label, value }) => (
              <button
                key={label}
                className="flex flex-col items-center p-6 rounded-xl border border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10 transition-all group"
              >
                <Icon className="w-8 h-8 mb-3 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-gray-400 group-hover:text-white transition-colors">{label}</span>
                {!isLoading && <span className="mt-2 text-sm text-green-400">{value.toFixed(1)} kg</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
          <h2 className="text-2xl font-semibold mb-6">Personalized Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-xl border border-green-500/30 group-hover:border-green-500/50 transition-colors">
                  <recommendation.icon className="w-8 h-8 mb-4 text-green-400" />
                  <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
                  <p className="text-gray-400 mb-4">{recommendation.description}</p>
                  <div className="flex items-center text-green-400 mb-4">
                    <Leaf className="w-4 h-4 mr-2" />
                    Save {recommendation.impact.toFixed(1)} kg CO2/year
                  </div>
                  <a
                    href={recommendation.actionUrl}
                    className="block w-full py-2 px-4 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-center"
                  >
                    {recommendation.action}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

