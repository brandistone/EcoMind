import { useState } from "react"
import {
  Building2,
  Users,
  Car,
  Factory,
  Download,
  ArrowDown,
  Leaf,
  Zap,
  Plane,
  Recycle,
  ChevronRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

// Mock data - replace with real API data in production
const mockData = {
  monthly: [
    { month: "Sep", emissions: 125.4 },
    { month: "Oct", emissions: 118.2 },
    { month: "Nov", emissions: 112.8 },
    { month: "Dec", emissions: 108.5 },
    { month: "Jan", emissions: 98.7 },
    { month: "Feb", emissions: 92.2 },
  ],
  quarterly: [
    { month: "Q1 2023", emissions: 380.5 },
    { month: "Q2 2023", emissions: 350.2 },
    { month: "Q3 2023", emissions: 320.8 },
    { month: "Q4 2023", emissions: 299.5 },
  ],
  yearly: [
    { month: "2020", emissions: 1580.5 },
    { month: "2021", emissions: 1450.2 },
    { month: "2022", emissions: 1320.8 },
    { month: "2023", emissions: 1199.5 },
  ],
}

const departmentData = [
  { name: "Operations", value: 35 },
  { name: "Sales", value: 25 },
  { name: "IT", value: 20 },
  { name: "Admin", value: 15 },
  { name: "HR", value: 5 },
]

const activityData = [
  { name: "Energy", value: 40, color: "#22C55E" },
  { name: "Transport", value: 30, color: "#16A34A" },
  { name: "Production", value: 20, color: "#15803D" },
  { name: "Waste", value: 10, color: "#166534" },
]

const recommendations = [
  {
    id: "renewable",
    icon: Zap,
    title: "Switch to Renewable Energy",
    description: "Transitioning to renewable energy sources could reduce your carbon footprint by 40%.",
    impact: 48500,
    action: "Get Quote",
  },
  {
    id: "travel",
    icon: Plane,
    title: "Optimize Business Travel",
    description: "Implementing a hybrid meeting policy could cut travel emissions by 35%.",
    impact: 25800,
    action: "Plan Policy",
  },
  {
    id: "waste",
    icon: Recycle,
    title: "Zero Waste Program",
    description: "A comprehensive recycling program could reduce waste emissions by 60%.",
    impact: 12400,
    action: "Start Program",
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
        <p className="text-green-400">{`${label}: ${payload[0].value.toFixed(1)} tons CO2`}</p>
      </div>
    )
  }
  return null
}

export default function BusinessDashboard() {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  const data = mockData[timeframe]

  const currentEmissions = data[data.length - 1].emissions
  const previousEmissions = data[0].emissions
  const reduction = (((previousEmissions - currentEmissions) / previousEmissions) * 100).toFixed(1)

  const handleDownloadReport = () => {
    // Implement report generation and download
    console.log("Downloading report...")
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
      <ParticleField />

      <div className="relative max-w-7xl mx-auto px-6 pt-8">
        {/* Business Profile Summary */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-green-400" />
                <h1 className="text-2xl font-bold">Eco Solutions Inc.</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-sm text-gray-400">Employees</div>
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-400" />
                    250
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Facilities</div>
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <Factory className="w-5 h-5 text-green-400" />3
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Fleet Size</div>
                  <div className="text-2xl font-semibold flex items-center gap-2">
                    <Car className="w-5 h-5 text-green-400" />
                    12
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>

        {/* Time Period Toggle */}
        <div className="flex justify-end gap-2 mb-8">
          {["monthly", "quarterly", "yearly"].map((period) => (
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

        {/* Emissions Overview */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-400">Total Emissions</h2>
                <div className="mt-2 flex items-baseline">
                  <span className="text-5xl font-bold text-green-400">{currentEmissions.toFixed(1)}</span>
                  <span className="ml-2 text-2xl text-gray-500">tons CO2</span>
                </div>
              </div>
              <div className="flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-lg">
                <ArrowDown className="w-4 h-4 mr-1" />
                {reduction}%
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="month" stroke="#4B5563" />
                  <YAxis stroke="#4B5563" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="emissions" stroke="#22C55E" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
            <h2 className="text-xl font-semibold text-gray-400 mb-6">Emissions by Activity</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
          <h2 className="text-2xl font-semibold mb-6">Emissions by Department</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip />
                <Bar dataKey="value" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-xl -z-10" />
          <h2 className="text-2xl font-semibold mb-6">Reduction Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <div key={recommendation.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-xl border border-green-500/30 group-hover:border-green-500/50 transition-colors">
                  <recommendation.icon className="w-8 h-8 mb-4 text-green-400" />
                  <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
                  <p className="text-gray-400 mb-4">{recommendation.description}</p>
                  <div className="flex items-center text-green-400 mb-4">
                    <Leaf className="w-4 h-4 mr-2" />
                    Save {recommendation.impact.toFixed(0)} tons CO2/year
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                    {recommendation.action}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

