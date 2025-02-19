"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Real data for industries and regions
const industries = ["Energy", "Manufacturing", "Transportation", "Agriculture", "Construction", "Waste Management"]

const regions = ["North America", "Europe", "Asia", "Africa", "South America", "Oceania"]

// Real emission factors (in kg CO2e per unit)
const emissionFactors = {
  Energy: 0.5, // per kWh
  Manufacturing: 2.8, // per kg of product
  Transportation: 0.14, // per km
  Agriculture: 1.5, // per kg of product
  Construction: 100, // per square meter
  "Waste Management": 0.5, // per kg of waste
}

interface Prediction {
  year: number
  emissions: number
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

// More realistic prediction model
const simulatePredictions = (
  industry: string,
  region: string,
  energyUse: number,
  resourceConsumption: number,
  wasteGeneration: number,
): { currentScenario: Prediction[]; improvedScenario: Prediction[] } => {
  const baseEmissions = emissionFactors[industry as keyof typeof emissionFactors] * 1000
  const years = [2023, 2024, 2025, 2026, 2027]
  const annualGrowth = 0.02 // 2% annual growth
  const improvementRate = 0.05 // 5% annual improvement

  const currentScenario = years.map((year, index) => ({
    year,
    emissions:
      baseEmissions *
      (1 + annualGrowth) ** index *
      (1 + energyUse / 100) *
      (1 + resourceConsumption / 100) *
      (1 + wasteGeneration / 100),
  }))

  const improvedScenario = years.map((year, index) => ({
    year,
    emissions:
      baseEmissions *
      (1 + annualGrowth - improvementRate) ** index *
      (1 + (energyUse * 0.8) / 100) *
      (1 + (resourceConsumption * 0.9) / 100) *
      (1 + (wasteGeneration * 0.7) / 100),
  }))

  return { currentScenario, improvedScenario }
}

const ScenarioAnalysisChat: React.FC = () => {
  const [industry, setIndustry] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [energyUse, setEnergyUse] = useState<number>(50)
  const [resourceConsumption, setResourceConsumption] = useState<number>(50)
  const [wasteGeneration, setWasteGeneration] = useState<number>(50)
  const [predictions, setPredictions] = useState<{
    currentScenario: Prediction[]
    improvedScenario: Prediction[]
  } | null>(null)
  const [activeScenario, setActiveScenario] = useState<"current" | "improved">("current")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Welcome to the Scenario Analysis Tool! How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatEndRef]) //Corrected dependency

  const handleSimulation = () => {
    if (!industry || !region) {
      addMessage("assistant", "Please select both an industry and a region before running the simulation.")
      return
    }
    const results = simulatePredictions(industry, region, energyUse, resourceConsumption, wasteGeneration)
    setPredictions(results)
    addMessage(
      "assistant",
      `Simulation complete for ${industry} in ${region}. You can now view the results in the chart below.`,
    )
  }

  const handleSaveAndShare = () => {
    // In a real application, this would save the scenario to a database and generate a shareable link
    addMessage(
      "assistant",
      "Scenario saved and ready to share! (Note: This is a placeholder for the actual save and share functionality)",
    )
  }

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, content }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    addMessage("user", input)
    setInput("")

    // Simple chat logic
    if (input.toLowerCase().includes("run simulation")) {
      handleSimulation()
    } else if (input.toLowerCase().includes("save") || input.toLowerCase().includes("share")) {
      handleSaveAndShare()
    } else if (input.toLowerCase().includes("set industry")) {
      const ind = industries.find((i) => input.toLowerCase().includes(i.toLowerCase()))
      if (ind) {
        setIndustry(ind)
        addMessage("assistant", `Industry set to ${ind}.`)
      } else {
        addMessage("assistant", "Sorry, I couldn't find that industry. Please try again.")
      }
    } else if (input.toLowerCase().includes("set region")) {
      const reg = regions.find((r) => input.toLowerCase().includes(r.toLowerCase()))
      if (reg) {
        setRegion(reg)
        addMessage("assistant", `Region set to ${reg}.`)
      } else {
        addMessage("assistant", "Sorry, I couldn't find that region. Please try again.")
      }
    } else if (input.toLowerCase().includes("set energy use")) {
      const value = Number.parseInt(input.split(" ").pop() || "")
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setEnergyUse(value)
        addMessage("assistant", `Energy use set to ${value}%.`)
      } else {
        addMessage("assistant", "Please provide a valid energy use value between 0 and 100.")
      }
    } else if (input.toLowerCase().includes("set resource consumption")) {
      const value = Number.parseInt(input.split(" ").pop() || "")
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setResourceConsumption(value)
        addMessage("assistant", `Resource consumption set to ${value}%.`)
      } else {
        addMessage("assistant", "Please provide a valid resource consumption value between 0 and 100.")
      }
    } else if (input.toLowerCase().includes("set waste generation")) {
      const value = Number.parseInt(input.split(" ").pop() || "")
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setWasteGeneration(value)
        addMessage("assistant", `Waste generation set to ${value}%.`)
      } else {
        addMessage("assistant", "Please provide a valid waste generation value between 0 and 100.")
      }
    } else {
      addMessage(
        "assistant",
        "I'm sorry, I didn't understand that command. You can ask me to set industry, region, energy use, resource consumption, waste generation, run simulation, or save and share the scenario.",
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Environmental Impact Scenario Analysis Tool</h1>

      <div className="mb-6 h-80 overflow-y-auto border border-gray-300 rounded p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {message.content}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </form>

      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="industry"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              id="region"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Select region</option>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="energy-use" className="block text-sm font-medium text-gray-700 mb-1">
              Energy Use
            </label>
            <input
              type="range"
              id="energy-use"
              min={0}
              max={100}
              value={energyUse}
              onChange={(e) => setEnergyUse(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{energyUse}%</span>
          </div>
          <div>
            <label htmlFor="resource-consumption" className="block text-sm font-medium text-gray-700 mb-1">
              Resource Consumption
            </label>
            <input
              type="range"
              id="resource-consumption"
              min={0}
              max={100}
              value={resourceConsumption}
              onChange={(e) => setResourceConsumption(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{resourceConsumption}%</span>
          </div>
          <div>
            <label htmlFor="waste-generation" className="block text-sm font-medium text-gray-700 mb-1">
              Waste Generation
            </label>
            <input
              type="range"
              id="waste-generation"
              min={0}
              max={100}
              value={wasteGeneration}
              onChange={(e) => setWasteGeneration(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{wasteGeneration}%</span>
          </div>
        </div>
        <button
          onClick={handleSimulation}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Simulation
        </button>
      </div>
      {predictions && (
        <div className="mt-8">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveScenario("current")}
              className={`px-4 py-2 rounded ${activeScenario === "current" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Current Scenario
            </button>
            <button
              onClick={() => setActiveScenario("improved")}
              className={`px-4 py-2 rounded ${activeScenario === "improved" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Improved Scenario
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {activeScenario === "current" ? "Current Scenario" : "Improved Scenario"} Emissions
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictions[activeScenario === "current" ? "currentScenario" : "improvedScenario"]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke={activeScenario === "current" ? "#8884d8" : "#82ca9d"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={handleSaveAndShare}
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Save & Share Scenario
        </button>
      </div>
    </div>
  )
}

export default ScenarioAnalysisChat

