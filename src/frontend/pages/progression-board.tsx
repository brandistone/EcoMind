"use client"

import { useState, useEffect } from "react"
import { Medal, Trophy, Users, Bell, Moon, Sun, Award } from "lucide-react"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts"

// Mock data adjusted for Kenya - replace with real API data in production
const progressData = [
  { month: "Sep", personal: 85.4, average: 120.2 },
  { month: "Oct", personal: 82.2, average: 118.5 },
  { month: "Nov", personal: 78.8, average: 119.1 },
  { month: "Dec", personal: 75.5, average: 121.3 },
  { month: "Jan", personal: 71.7, average: 117.8 },
  { month: "Feb", personal: 68.2, average: 116.9 },
]

const achievements = [
  {
    id: "public-transport",
    icon: Trophy,
    title: "Matatu Champion",
    description: "Used public transport for 50 consecutive days",
    date: "2024-02-15",
    progress: 100,
  },
  {
    id: "solar-power",
    icon: Award,
    title: "Solar Pioneer",
    description: "Switched to solar power for home energy",
    date: "2024-02-10",
    progress: 100,
  },
  {
    id: "waste-management",
    icon: Medal,
    title: "Waste Warrior",
    description: "Practiced proper waste segregation for 30 days",
    date: "2024-02-01",
    progress: 100,
  },
  {
    id: "tree-planting",
    icon: Award,
    title: "Green Legacy",
    description: "Plant 20 indigenous trees",
    date: null,
    progress: 70,
  },
]

const regions = [
  { code: "nairobi", name: "Nairobi" },
  { code: "mombasa", name: "Mombasa" },
  { code: "kisumu", name: "Kisumu" },
  { code: "nakuru", name: "Nakuru" },
  { code: "eldoret", name: "Eldoret" },
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
            background: `rgba(${Math.random() * 100}, ${Math.random() * 155 + 100}, ${Math.random() * 100}, 0.6)`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `-${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-green-500/30 px-4 py-2 rounded-lg">
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-green-400">Your footprint: {payload[0].value.toFixed(1)} kg CO2</p>
        <p className="text-gray-400">Kenya average: {payload[1].value.toFixed(1)} kg CO2</p>
      </div>
    )
  }
  return null
}

export default function ProgressInsights() {
  const [darkMode, setDarkMode] = useState(false)
  const [region, setRegion] = useState("nairobi")
  const [notifications, setNotifications] = useState({
    achievements: true,
    reminders: true,
    insights: true,
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  const currentFootprint = progressData[progressData.length - 1].personal
  const previousFootprint = progressData[0].personal
  const reduction = (((previousFootprint - currentFootprint) / previousFootprint) * 100).toFixed(1)

  return (
    <div className={`min-h-screen bg-black text-white pb-20 relative overflow-hidden ${darkMode ? "dark" : ""}`}>
      <ParticleField />

      <div className="relative max-w-7xl mx-auto px-6 pt-8">
        {/* Settings Bar */}
        <div className="flex justify-end gap-4 mb-8">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black/40 border border-green-500/30 text-white focus:border-green-500/50 outline-none"
          >
            {regions.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-black/40 border border-green-500/30 hover:border-green-500/50"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">Carbon Reduction Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="month" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={120} stroke="#22C55E" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="personal" stroke="#22C55E" strokeWidth={2} dot={false} />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#4B5563"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">vs. Kenya Average</span>
              </div>
              <div className="flex items-center text-green-400">
                <span className="text-lg font-semibold">{reduction}% reduction</span>
              </div>
            </div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-2xl font-semibold mb-6">Regional Comparison</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: "Transport", you: 35, regional: 55 },
                    { category: "Energy", you: 25, regional: 40 },
                    { category: "Food", you: 20, regional: 30 },
                    { category: "Waste", you: 10, regional: 18 },
                  ]}
                >
                  <XAxis dataKey="category" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip />
                  <Bar dataKey="you" name="Your Usage" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="regional" name="Regional Average" fill="#4B5563" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
          <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`relative p-6 rounded-xl border ${
                    achievement.progress === 100 ? "border-green-500 bg-green-500/20" : "border-green-500/30"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mb-4 ${achievement.progress === 100 ? "text-green-400" : "text-gray-400"}`}
                  />
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
                  {achievement.date ? (
                    <span className="text-sm text-green-400">
                      Achieved {new Date(achievement.date).toLocaleDateString()}
                    </span>
                  ) : (
                    <div className="relative h-2 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-green-500"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                key: "achievements",
                title: "Achievements",
                description: "Get notified when you earn new achievements",
              },
              {
                key: "reminders",
                title: "Daily Reminders",
                description: "Receive SMS or WhatsApp reminders to log your activities",
              },
              {
                key: "insights",
                title: "Weekly Insights",
                description: "Get weekly insights about your carbon footprint via SMS",
              },
            ].map(({ key, title, description }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-green-500/30">
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    notifications[key as keyof typeof notifications] ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      notifications[key as keyof typeof notifications] ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

