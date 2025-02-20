"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Ticket, Calendar, Users, ChevronRight, Star, BarChart, Map, Clock } from "lucide-react"
import { Link } from "react-router-dom"
// import HeroSection from "../components/Herosection"
// import bitcoinImage from "../assets/tig.png"

const ParticleField: React.FC = () => {
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

interface AnimatedCardProps {
  children: React.ReactNode
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
        className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur-xl 
        group-hover:blur-2xl transition-all duration-300"
      />
      <div
        className="relative bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 
        group-hover:border-green-500/50 p-6 transition-all duration-300"
      >
        {children}
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeStat, setActiveStat] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Map className="w-8 h-8" />,
      title: "Explore Map",
      description: "Visualize emissions, water usage, deforestation, and other key metrics to understand the impact in various.",
      color: "from-purple-600 to-blue-600",
      
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Scenario Analysis",
      description: "Simulate the future impact of various actions and policies with our powerful scenario analysis tool. Adjust variables like energy use.",
      color: "from-blue-600 to-purple-600",
      
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real Time Data",
      description: "Stay updated with real-time environmental data from trusted sources. View live metrics for air quality.",
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-1000 
        ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10 backdrop-blur-xl" />
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl 
                    group-hover:scale-110 group-hover:rotate-180 transition-all duration-700"
                  />
                  <div className="absolute inset-1 bg-black rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">EM</span>
                  </div>
                </div>
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                  from-green-400 to-blue-400 group-hover:from-green-300 group-hover:to-blue-300 
                  transition-all duration-300"
                >
                  ECOMIND AI
                </span>
              </div>

              <div className="flex items-center space-x-8">
                {[
                  { name: "Home", path: "/" },
                  { name: "Dashboard", path: "/dashboard" },
                  { name: "Reports", path: "/mint" },
                  { name: "Reccomendations", path: "/mint" },
                  { name: "Settings", path: "/mint" },
                ].map(({ name, path }) => (
                  <Link key={name} to={path} className="relative group py-2">
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                      {name}
                    </span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 
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
            <h2 className="text-7xl font-bold mb-8 leading-tight">
              {/* <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade">Empowering Communities,</span>
              </div> */}
              <div className="overflow-hidden">
                <span className="inline-block animate-slide-up-fade delay-200">Protecting the Planet:</span>
              </div>
              <div className="overflow-hidden">
                <span
                  className="inline-block bg-gradient-to-r from-green-400 to-blue-400 
                  bg-clip-text text-transparent animate-slide-up-fade delay-400"
                >
                  Your Gateway to Climate Resilience.
                </span>
              </div>
            </h2>

          

            <div className="flex space-x-6">
              <a href="/login">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 blur-xl 
                    group-hover:blur-2xl transition-all duration-300"
                  />
                  <div className="relative z-10 flex items-center space-x-2">
                    <span>Get Started</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </a>

              <a href="/scenario">
                <button className="group relative px-8 py-4 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border border-green-500 rounded-xl" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  />
                  <span className="relative z-10">Scenario Anaysis</span>
                </button>
              </a>
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
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl 
                    opacity-20 blur-3xl group-hover:blur-2xl transition-all duration-500"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
              {/* <img
                // src={bitcoinImage || "/placeholder.svg"}
                alt="VR Experience"
                className="relative z-10 w-full h-auto object-cover rounded-3xl transform 
                  group-hover:scale-105 group-hover:rotate-3 transition-all duration-700"
              /> */}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature, index) => (
      <AnimatedCard
        key={index}
        delay={index * 200}
        isSelected={selectedFeature === index}
        onClick={() => setSelectedFeature(index)}
      >
        <div className="relative group">
          <div
            className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.color} 
            flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500`}
          >
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 
          bg-clip-text text-transparent">
            {feature.title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {feature.description}
          </p>
        </div>
        <Link to={`/${feature.title.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 inline-flex items-center text-sm font-medium text-black-900">
          Learn more
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </AnimatedCard>
    ))}
  </div>
</section>


      {/* Interactive Stats with Hover Effects */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          {[
            { value: "100K+", label: "Active Users", icon: <Users />, color: "purple" },
            { value: "50K+", label: "Events Hosted", icon: <Calendar />, color: "blue" },
            { value: "1M+", label: "Tickets Sold", icon: <Ticket />, color: "purple" },
            { value: "99%", label: "Security Assurance", icon: <Star />, color: "blue" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveStat(index)}
              onMouseLeave={() => setActiveStat(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 
                  rounded-xl blur-lg transition-all duration-300
                  ${activeStat === index ? "opacity-100" : "opacity-0"}`}
              />
              <div
                className={`relative bg-black/40 backdrop-blur-xl rounded-xl border 
                  transition-all duration-300
                  ${activeStat === index ? `border-${stat.color}-500/50 translate-y-[-8px]` : "border-green-500/30"}`}
              >
                <div className="flex flex-col items-center p-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-${stat.color}-500/20 
                      flex items-center justify-center mb-4 transition-all duration-500
                      ${activeStat === index ? "scale-110 rotate-12" : ""}`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 
                      to-${stat.color}-600 bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-gray-400 transition-colors
                    ${activeStat === index ? "text-gray-200" : ""}`}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section>
        <div>
          <HeroSection />
        </div>
      </section> */}



    </div>
  )
}

export default HomePage

