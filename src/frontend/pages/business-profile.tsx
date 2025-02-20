"use client"

import type React from "react"

import { useState } from "react"
import { Building2, Users, MapPin, Phone, Mail, Globe, Factory, Car, Upload, ArrowRight } from "lucide-react"

interface BusinessProfile {
  name: string
  industry: string
  employeeCount: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  website: string
  facilities: string
  fleetSize: string
  yearlyRevenue: string
  sustainabilityGoals: string[]
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
            background: `rgba(${Math.random() * 100}, ${Math.random() * 155 + 100}, ${Math.random() * 100}, 0.6)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function BusinessProfile() {
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<BusinessProfile>({
    name: "",
    industry: "",
    employeeCount: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    facilities: "",
    fleetSize: "",
    yearlyRevenue: "",
    sustainabilityGoals: [],
  })

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Profile data:", formData)
      // In production, you would send the data to your API here
    } catch (error) {
      console.error("Error creating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSustainabilityGoalChange = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      sustainabilityGoals: prev.sustainabilityGoals.includes(goal)
        ? prev.sustainabilityGoals.filter((g) => g !== goal)
        : [...prev.sustainabilityGoals, goal],
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      <ParticleField />

      <div className="relative max-w-4xl mx-auto px-6 pt-8">
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />

          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold">Create Business Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Logo Upload */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-green-500/30 flex items-center justify-center overflow-hidden group">
                {logoPreview ? (
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">Company Logo</h3>
                <p className="text-sm text-gray-400">Upload your company logo (optional)</p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Company Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="energy">Energy</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="transportation">Transportation</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Number of Employees</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="number"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, employeeCount: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Number of Facilities</label>
                <div className="relative">
                  <Factory className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="number"
                    value={formData.facilities}
                    onChange={(e) => setFormData((prev) => ({ ...prev, facilities: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Fleet Size</label>
                <div className="relative">
                  <Car className="absolute left-3 top-3.5 w-5 h-5 text-green-400" />
                  <input
                    type="number"
                    value={formData.fleetSize}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fleetSize: e.target.value }))}
                    className="w-full p-3 pl-10 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sustainability Goals */}
            <div className="space-y-4">
              <label className="text-sm text-gray-400">Sustainability Goals</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Carbon Neutral by 2030",
                  "100% Renewable Energy",
                  "Zero Waste",
                  "Sustainable Supply Chain",
                  "Electric Fleet",
                  "Water Conservation",
                ].map((goal) => (
                  <label
                    key={goal}
                    className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                      formData.sustainabilityGoals.includes(goal)
                        ? "border-green-500 bg-green-500/20 text-green-400"
                        : "border-green-500/30 hover:border-green-500/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.sustainabilityGoals.includes(goal)}
                      onChange={() => handleSustainabilityGoalChange(goal)}
                      className="hidden"
                    />
                    <span className="text-sm">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Creating Profile..."
              ) : (
                <>
                  Create Profile
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

