"use client"

import { useState } from "react"
import { Car, Zap, Droplets, UtensilsCrossed, ArrowRight } from "lucide-react"

interface ActivityData {
  category: string
  type: string
  amount: number
  unit: string
}

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

export default function ActivityLogger() {
  const [activeTab, setActiveTab] = useState("transport")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    unit: "miles",
  })

  const handleSubmit = async () => {
    if (!formData.type || !formData.amount) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const activityData: ActivityData = {
        category: activeTab,
        type: formData.type,
        amount: Number.parseFloat(formData.amount),
        unit: formData.unit,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Activity logged:", activityData)

      // Reset form
      setFormData({
        type: "",
        amount: "",
        unit: "miles",
      })
    } catch (error) {
      console.error("Failed to log activity:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      <ParticleField />

      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />

          <h2 className="text-2xl font-semibold text-white mb-6">Log Your Activity</h2>

          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab("transport")}
                className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
                  activeTab === "transport"
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : "border-green-500/30 text-gray-400 hover:text-white hover:border-green-500/50"
                }`}
              >
                <Car className="w-5 h-5 mr-2" />
                Transport
              </button>
              <button
                onClick={() => setActiveTab("energy")}
                className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
                  activeTab === "energy"
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : "border-green-500/30 text-gray-400 hover:text-white hover:border-green-500/50"
                }`}
              >
                <Zap className="w-5 h-5 mr-2" />
                Energy
              </button>
              <button
                onClick={() => setActiveTab("water")}
                className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
                  activeTab === "water"
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : "border-green-500/30 text-gray-400 hover:text-white hover:border-green-500/50"
                }`}
              >
                <Droplets className="w-5 h-5 mr-2" />
                Water
              </button>
              <button
                onClick={() => setActiveTab("food")}
                className={`flex items-center justify-center p-4 rounded-lg border transition-colors ${
                  activeTab === "food"
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : "border-green-500/30 text-gray-400 hover:text-white hover:border-green-500/50"
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mr-2" />
                Food
              </button>
            </div>

            <div className="space-y-6">
              {activeTab === "transport" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Mode of Transport</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    >
                      <option value="">Select transport type</option>
                      <option value="car">Car</option>
                      <option value="bus">Bus</option>
                      <option value="train">Train</option>
                      <option value="plane">Plane</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Distance</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter distance"
                        className="flex-1 p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                        className="w-[120px] p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      >
                        <option value="miles">Miles</option>
                        <option value="km">Kilometers</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "energy" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Type of Energy</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    >
                      <option value="">Select energy type</option>
                      <option value="electricity">Electricity</option>
                      <option value="natural-gas">Natural Gas</option>
                      <option value="heating-oil">Heating Oil</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Amount Used</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                        className="flex-1 p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                        className="w-[120px] p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      >
                        <option value="kwh">kWh</option>
                        <option value="therm">Therms</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "water" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Water Usage</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                        className="flex-1 p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                        className="w-[120px] p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      >
                        <option value="gallons">Gallons</option>
                        <option value="liters">Liters</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "food" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Type of Food</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    >
                      <option value="">Select food type</option>
                      <option value="beef">Beef</option>
                      <option value="chicken">Chicken</option>
                      <option value="fish">Fish</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Amount Consumed</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                        className="flex-1 p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                        className="w-[120px] p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                      >
                        <option value="servings">Servings</option>
                        <option value="grams">Grams</option>
                        <option value="oz">Ounces</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Logging..."
                ) : (
                  <>
                    Log Activity
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

