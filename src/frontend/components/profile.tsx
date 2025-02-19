"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronRight, Car, Bike, Bus, PersonStanding, Home, Zap, Droplets, UtensilsCrossed } from "lucide-react"

// Types for form data
interface ProfileData {
  age: string
  location: string
  userType: "individual" | "business" | ""
  transportation: string[]
  household: {
    electricityUsage: string
    heatingUsage: string
    waterConsumption: string
  }
  dietHabits: string[]
}

const transportOptions = [
  { icon: Car, label: "Car" },
  { icon: Bike, label: "Bike" },
  { icon: Bus, label: "Bus" },
  { icon: PersonStanding, label: "Walking" },
]

const dietOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "flexitarian", label: "Flexitarian" },
  { value: "omnivore", label: "Omnivore" },
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

export default function ProfileSetup() {
  const [formData, setFormData] = useState<ProfileData>({
    age: "",
    location: "",
    userType: "",
    transportation: [],
    household: {
      electricityUsage: "",
      heatingUsage: "",
      waterConsumption: "",
    },
    dietHabits: [],
  })

  const [progress, setProgress] = useState(0)

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = [
      formData.age,
      formData.location,
      formData.userType,
      formData.transportation.length > 0,
      formData.household.electricityUsage,
      formData.household.heatingUsage,
      formData.household.waterConsumption,
      formData.dietHabits.length > 0,
    ]

    const completedFields = requiredFields.filter(Boolean).length
    const progressPercentage = (completedFields / requiredFields.length) * 100
    setProgress(progressPercentage)
  }, [formData])

  const handleTransportationToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      transportation: prev.transportation.includes(type)
        ? prev.transportation.filter((t) => t !== type)
        : [...prev.transportation, type],
    }))
  }

  const handleDietToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      dietHabits: prev.dietHabits.includes(type)
        ? prev.dietHabits.filter((t) => t !== type)
        : [...prev.dietHabits, type],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add profile save logic here
    console.log("Profile data:", formData)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      <ParticleField />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            Complete Your Profile
          </h1>
          <p className="text-gray-400 mt-2">Help us personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Information */}
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 focus:border-green-500/50 rounded-lg outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 focus:border-green-500/50 rounded-lg outline-none transition-colors"
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium">User Type</label>
              <div className="flex gap-4">
                {["individual", "business"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: type as "individual" | "business" })}
                    className={`px-6 py-2 rounded-lg border transition-colors ${
                      formData.userType === type
                        ? "border-green-500 bg-green-500/20"
                        : "border-green-500/30 hover:border-green-500/50"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">Transportation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transportOptions.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleTransportationToggle(label)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                    formData.transportation.includes(label)
                      ? "border-green-500 bg-green-500/20 scale-105"
                      : "border-green-500/30 hover:border-green-500/50"
                  }`}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Household Information */}
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">Household Information</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Zap className="inline-block w-4 h-4 mr-2" />
                  Electricity Usage (kWh/month)
                </label>
                <input
                  type="number"
                  value={formData.household.electricityUsage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      household: { ...formData.household, electricityUsage: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 focus:border-green-500/50 rounded-lg outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Home className="inline-block w-4 h-4 mr-2" />
                  Heating Usage (kWh/month)
                </label>
                <input
                  type="number"
                  value={formData.household.heatingUsage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      household: { ...formData.household, heatingUsage: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 focus:border-green-500/50 rounded-lg outline-none transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  <Droplets className="inline-block w-4 h-4 mr-2" />
                  Water Consumption (L/month)
                </label>
                <input
                  type="number"
                  value={formData.household.waterConsumption}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      household: { ...formData.household, waterConsumption: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 focus:border-green-500/50 rounded-lg outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Diet Habits */}
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">
              <UtensilsCrossed className="inline-block w-6 h-6 mr-2" />
              Diet Habits
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dietOptions.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleDietToggle(value)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    formData.dietHabits.includes(value)
                      ? "border-green-500 bg-green-500/20 scale-105"
                      : "border-green-500/30 hover:border-green-500/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={progress < 100}
              className={`
                flex items-center px-8 py-3 rounded-xl font-medium
                transition-all duration-300
                ${
                  progress === 100
                    ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 opacity-100"
                    : "bg-gray-600 opacity-50 cursor-not-allowed"
                }
              `}
            >
              Save Profile
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

