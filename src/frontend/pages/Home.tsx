// This is the home page component for the WeatherVerse app
"use client"

import type React from "react"
import { type ReactNode, useState, useEffect } from "react"
import { Sun, Cloud, CloudRain, Wind, Users, Globe, Clock, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

interface AnimatedCardProps {
  children: ReactNode
  delay: number
  onClick: () => void
  isSelected: boolean
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay, onClick, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group transition-all duration-500 transform 
        ${isSelected ? "scale-105 -translate-y-2" : ""} 
        ${isHovered ? "translate-y-[-8px]" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl 
        group-hover:blur-2xl transition-all duration-300"
      />
      <div
        className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 
        group-hover:border-purple-500/50 p-6 transition-all duration-300"
      >
        {children}
      </div>
    </div>
  )
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

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [activeStat, setActiveStat] = useState<number | null>(null) // Update: Added type annotation here
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Simulating weather data fetch
    setTimeout(() => {
      setWeatherData({
        temperature: 22,
        condition: "Partly Cloudy",
        humidity: 60,
        windSpeed: 5,
      })
    }, 1000)
  }, [])

  const features: Feature[] = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Get the latest weather information updated every minute",
      color: "from-yellow-600 to-orange-600",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "7-Day Forecast",
      description: "Plan ahead with our accurate 7-day weather predictions",
      color: "from-blue-600 to-purple-600",
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Severe Weather Alerts",
      description: "Stay safe with instant notifications for severe weather conditions",
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleField />

      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-64 h-64 pointer-events-none z-50 transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-1000 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-xl" />
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl 
                    group-hover:scale-110 group-hover:rotate-180 transition-all duration-700"
                  />
                  <div className="absolute inset-1 bg-black rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">W</span>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                  from-purple-400 to-blue-400 group-hover:from-purple-300 group-hover:to-blue-300 
                  transition-all duration-300"
                >
                  WeatherVerse
                </span>
              </div>

              <div className="flex items-center space-x-8">
                {[
                  { name: "Forecast", path: "/forecast" },
                  { name: "Maps", path: "/maps" },
                  { name: "Alerts", path: "/alerts" },
                ].map(({ name, path }) => (
                  <Link key={name} to={path} className="relative group py-2">
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                      {name}
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 
                      group-hover:w-full group-hover:left-0 transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-300 
            ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <h1 className="text-7xl font-bold mb-8 leading-tight">
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade">Experience</span>
              </div>
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade delay-200">The Future of</span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 
                  bg-clip-text text-transparent animate-slide-up-fade delay-400"
                >
                  Weather Forecasting
                </span>
              </div>
            </h1>

            <p className="text-xl text-gray-300 mb-10 opacity-0 animate-fade-in delay-700">
              Step into a world where weather predictions are more accurate than ever. Experience real-time updates,
              advanced forecasting, and personalized weather insights.
            </p>

            <div className="flex space-x-6">
              <Link to="/forecast">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl 
                    group-hover:blur-2xl transition-all duration-300"
                  />
                  <div className="relative z-10 flex items-center space-x-2">
                    <span>View Forecast</span>
                    <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </div>
                </button>
              </Link>

              <Link to="/alerts">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border border-purple-500 rounded-xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                  <span className="relative z-10">Weather Alerts</span>
                </button>
              </Link>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-500 
            ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <div className="relative w-full aspect-square group">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl 
                    opacity-20 blur-3xl group-hover:blur-2xl transition-all duration-500"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {weatherData ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">{weatherData.temperature}°C</div>
                    <div className="text-2xl mb-2">{weatherData.condition}</div>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center">
                        <CloudRain className="w-5 h-5 mr-2" />
                        <span>{weatherData.humidity}%</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-5 h-5 mr-2" />
                        <span>{weatherData.windSpeed} km/h</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard
              key={index}
              delay={index * 200}
              isSelected={selectedFeature === index}
              onClick={() => setSelectedFeature(index)}
            >
              <div className={`relative group-hover:scale-105 transition-transform duration-300`}>
                <div
                  className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.color} 
                  flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 
                  bg-clip-text text-transparent"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Interactive Stats with Hover Effects */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          {[
            { value: "1M+", label: "Active Users", icon: <Users className="w-6 h-6" />, color: "purple" },
            { value: "200+", label: "Cities Covered", icon: <Globe className="w-6 h-6" />, color: "blue" },
            { value: "24/7", label: "Real-time Updates", icon: <Clock className="w-6 h-6" />, color: "purple" },
            { value: "99%", label: "Accuracy Rate", icon: <CheckCircle className="w-6 h-6" />, color: "blue" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            //   onMouseEnter={() => setActiveStat(index)}
            //   onMouseLeave={() => setActiveStat(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 
                rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300`}
              />
              <div
                className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 
                group-hover:border-purple-500/50 p-6 transform group-hover:translate-y-[-8px] 
                transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-${stat.color}-500/20 
                    flex items-center justify-center mb-4 transform group-hover:scale-110 
                    group-hover:rotate-12 transition-all duration-500`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 
                    to-${stat.color}-600 bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

