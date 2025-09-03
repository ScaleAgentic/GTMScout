"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@supabase/supabase-js"

import {
  ChevronRight,
  Sparkles,
  Target,
  Users,
  Zap,
  TrendingUp,
  Search,
  PenTool,
  Eye,
  Settings,
  CheckCircle,
} from "lucide-react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type Challenge = "prospects" | "personalization" | "competitors" | "pipeline" | "events" | "other"
type Campaign =
  | "engagement"
  | "icp"
  | "outreach"
  | "account"
  | "event"
  | "search"
  | "content"
  | "intelligence"
  | "custom"

interface FormData {
  challenges: Challenge[]
  campaigns: Campaign[]
  email: string
  firstName: string
  company: string
  teamSize: string
}

const challenges = [
  { id: "prospects" as Challenge, title: "Finding the right prospects at the right time", icon: Target },
  { id: "personalization" as Challenge, title: "Breaking through the noise with personalization", icon: Sparkles },
  { id: "competitors" as Challenge, title: "Tracking what competitors are doing", icon: Eye },
  { id: "pipeline" as Challenge, title: "Building pipeline from multiple channels", icon: TrendingUp },
  { id: "events" as Challenge, title: "Maximizing event and launch impact", icon: Zap },
  { id: "other" as Challenge, title: "Other challenge", icon: Settings },
]

const campaigns = [
  { id: "engagement" as Campaign, title: "Engagement Campaign", description: "Join live conversations on Reddit, LinkedIn, Slack", icon: Users },
  { id: "icp" as Campaign, title: "ICP Discovery", description: "Find your perfect customers using signal clusters", icon: Target },
  { id: "outreach" as Campaign, title: "Hyper-Personalized Outreach", description: "Turn cold lists into warm conversations", icon: Sparkles },
  { id: "account" as Campaign, title: "Account-Based Campaign", description: "Expand into strategic accounts with insights", icon: TrendingUp },
  { id: "event" as Campaign, title: "Event & Launch", description: "Amplify your launches and announcements", icon: Zap },
  { id: "search" as Campaign, title: "AI Search Optimization", description: "Win in AI-native search (GEO/AEO)", icon: Search },
  { id: "content" as Campaign, title: "Content Campaign", description: "Generate and distribute thought leadership", icon: PenTool },
  { id: "intelligence" as Campaign, title: "Market Intelligence", description: "Track competitors and sentiment shifts", icon: Eye },
  { id: "custom" as Campaign, title: "Custom Motion", description: "Design your own GTM motion", icon: Settings },
]

// Progress Dots
function ProgressDots({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3, 5, 6] // removed step 4
  return (
    <div className="flex justify-center space-x-2 mb-8">
      {steps.map((s) => (
        <span
          key={s}
          className={`w-3 h-3 rounded-full transition-colors ${
            s === currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></span>
      ))}
    </div>
  )
}

export default function ScoutLeadGenerator() {
  const router = useRouter()
  const [step, setStep] = useState(1)

useEffect(() => {
  const handlePopState = () => {
    const params = new URLSearchParams(window.location.search)
    const currentStep = Number(params.get("step")) || 1
    setStep(currentStep)
  }

  window.addEventListener("popstate", handlePopState)
  return () => window.removeEventListener("popstate", handlePopState)
}, [])

// Update URL when step changes
const updateStep = (newStep: number) => {
  setStep(newStep)
  const params = new URLSearchParams(window.location.search)
  params.set("step", String(newStep))
  window.history.pushState({}, "", `?${params.toString()}`)
}

  const [formData, setFormData] = useState<FormData>({
    challenges: [],
    campaigns: [],
    email: "",
    firstName: "",
    company: "",
    teamSize: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [opportunityCount, setOpportunityCount] = useState(47)

  // Animated counter
  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunityCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleChallengeToggle = (challenge: Challenge) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const handleCampaignToggle = (campaign: Campaign) => {
    setFormData((prev) => ({
      ...prev,
      campaigns: prev.campaigns.includes(campaign)
        ? prev.campaigns.filter((c) => c !== campaign)
        : [...prev.campaigns, campaign],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase.from("submissions").insert([
      {
        email: formData.email,
        first_name: formData.firstName,
        company_name: formData.company,
        team_size: formData.teamSize,
        challenges: formData.challenges,
        campaigns: formData.campaigns,
      },
    ])

    setIsLoading(false)

    if (error) {
      console.error("Supabase insert error:", error.message)
      alert("❌ Something went wrong, please try again.")
    } else {
      updateStep(6)
    }
  }

  const powerMeterWidth = Math.min((formData.campaigns.length / 9) * 100, 100)

  return (
    <>
      {/* Step 1 */}
      {step === 1 && (
        <div className="relative min-h-screen flex flex-col bg-white">
          <div className="absolute top-10 left-10">
            <Image src="/ScaleAgentic Logo (1).png" alt="ScaleAgentic Logo" width={180} height={50} priority />
          </div>
          <div className="flex-1 max-w-5xl mx-auto px-6 py-32 text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Scout found{" "}
              <span className="text-blue-600 inline-flex items-center">
                {opportunityCount}
                <Sparkles className="w-8 h-8 ml-2 text-yellow-500 animate-pulse" />
              </span>{" "}
              GTM opportunities for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                companies like yours
              </span>{" "}
              this week
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our Agentic GTM Brain is actively tracking signals and building hyper-personalized campaigns right now.
            </p>
            <div>
              <Button
                onClick={() => updateStep(2)}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Show Me My Opportunities
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <ProgressDots currentStep={2} />
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What's your biggest GTM challenge right now?</h2>
            <p className="text-lg text-gray-600">Help Scout understand what to focus on for you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {challenges.map((challenge) => {
              const Icon = challenge.icon
              const isSelected = formData.challenges.includes(challenge.id)
              return (
                <Card
                  key={challenge.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "hover:border-blue-300"
                  }`}
                  onClick={() => handleChallengeToggle(challenge.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900">{challenge.title}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {formData.challenges.length > 0 && (
            <div className="mt-8">
              <Button
                onClick={() => updateStep(3)}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <ProgressDots currentStep={3} />
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Scout can run these campaigns for you</h2>
            <p className="text-lg text-gray-600">Pick what excites you most (select multiple)</p>
          </div>
          {formData.campaigns.length > 0 && (
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Campaign Power</span>
                <span className="text-sm text-blue-600">{formData.campaigns.length}/9</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                  style={{ width: `${powerMeterWidth}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const Icon = campaign.icon
              const isSelected = formData.campaigns.includes(campaign.id)
              return (
                <Card
                  key={campaign.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "hover:border-blue-300"
                  }`}
                  onClick={() => handleCampaignToggle(campaign.id)}
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-200" : "bg-gray-100"}`}>
                        <Icon className={`w-5 h-5 ${isSelected ? "text-blue-700" : "text-gray-600"}`} />
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {formData.campaigns.length > 0 && (
            <div className="mt-8">
              <Button
                onClick={() => updateStep(5)}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Generate My GTM Preview
                <Sparkles className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <ProgressDots currentStep={5} />
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get your personalized GTM opportunities</h2>
            <p className="text-lg text-gray-600">Scout has {formData.campaigns.length} campaign strategies ready for you</p>
          </div>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input type="email" placeholder="Work email *" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required className="h-12" />
                <Input type="text" placeholder="First name *" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} required className="h-12" />
                <Input type="text" placeholder="Company name" value={formData.company} onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))} className="h-12" />
                <select value={formData.teamSize} onChange={(e) => setFormData((prev) => ({ ...prev, teamSize: e.target.value }))} className="w-full h-12 px-3 border rounded-md">
                  <option value="">Team size (optional)</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-20">6-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="51-200">51-200 people</option>
                  <option value="200+">200+ people</option>
                </select>
                <Button type="submit" disabled={isLoading} className="group w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                  {isLoading ? "Activating Scout..." : (
                    <>
                      Activate Scout
                      <Zap className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <ProgressDots currentStep={6} />
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                🎉 Scout is now tracking {formData.campaigns.length * 12} signals for you!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
                Welcome to ScaleAgentic, {formData.firstName}! Your personalized GTM opportunities are being generated and will be in your inbox within 5 minutes.
              </p>
            </div>
            <Card className="max-w-lg mx-auto">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">What happens next:</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Scout analyzes your GTM signals in real-time</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Personalized opportunities delivered to your inbox</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Optional demo to explore advanced features</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <a
                href="https://scaleagentic.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg active:scale-95"
              >
                Schedule Scout Demo
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </a>
              <p className="text-sm text-gray-500">Or explore your dashboard when you receive your login details</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


