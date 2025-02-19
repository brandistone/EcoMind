import type React from "react"
export interface CarbonData {
  date: string
  total: number
  sources: {
    electricity: number
    transport: number
    water: number
    food: number
  }
}

export type EmissionSource = "electricity" | "transport" | "water" | "food"

export interface RecommendationData {
  id: string
  icon: React.ElementType
  title: string
  description: string
  impact: number
  action: string
  actionUrl: string
}

export interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
      value: number
      payload: CarbonData
    }>
    label?: string
  }
  
  

