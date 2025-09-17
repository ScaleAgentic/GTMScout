"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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
  CheckCircle,
  BarChart3,
} from "lucide-react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type Challenge =
  | "prospects"
  | "personalization"
  | "competitors"
  | "pipeline"
  | "velocity"
  | "attribution"
  | "events"
  | "other"

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
  challengeCustom?: string
  campaignCustom?: string
}

const challenges = [
  { id: "prospects" as Challenge, title: "Finding the right prospects at the right time", icon: Target },
  { id: "personalization" as Challenge, title: "Breaking through the noise with personalization", icon: Sparkles },
  { id: "competitors" as Challenge, title: "Tracking what competitors are doing", icon: Eye },
  { id: "pipeline" as Challenge, title: "Building pipeline from multiple channels", icon: TrendingUp },
  { id: "velocity" as Challenge, title: "Accelerating deal velocity and shortening sales cycles", icon: Zap },
  { id: "attribution" as Challenge, title: "Track and measure ROI across channels", icon: BarChart3 },
]

const campaigns = [
  { id: "icp" as Campaign, title: "ICP Discovery", description: "Find your perfect customers using signal clusters", icon: Target },
  { id: "outreach" as Campaign, title: "Hyper-Personalized Outreach", description: "Turn cold lists into warm conversations", icon: Sparkles },
  { id: "account" as Campaign, title: "Account-Based Campaign", description: "Expand into strategic accounts with insights", icon: TrendingUp },
  { id: "engagement" as Campaign, title: "Engagement Campaign", description: "Join live conversations on Reddit, LinkedIn, Slack", icon: Users },
  { id: "intelligence" as Campaign, title: "Market Intelligence", description: "Track competitors and sentiment shifts", icon: Eye },
  { id: "search" as Campaign, title: "AI Search Optimization", description: "Win in AI-native search (GEO/AEO)", icon: Search },
  { id: "content" as Campaign, title: "Content Campaign", description: "Generate and distribute thought leadership", icon: PenTool },
  { id: "event" as Campaign, title: "Event & Launch", description: "Amplify your launches and announcements", icon: Zap },
  { id: "custom" as Campaign, title: "Custom Motion", description: "Let Scout design your custom GTM motion", icon: Sparkles },
]

// Progress Dots
function ProgressDots({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3, 5, 6]
  return (
    <div className="flex justify-center space-x-2 mt-6 mb-8">
      {steps.map((s) => (
        <span
          key={s}
          className={`w-3 h-3 rounded-full transition-colors ${
            s === currentStep ? "bg-[#6602CA]" : "bg-[#6602CA]/50"
          }`}
        ></span>
      ))}
    </div>
  )
}

export default function ScoutLeadGenerator() {
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
    challengeCustom: "",
    campaignCustom: "",
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

  const totalCampaigns =
    formData.campaigns.length + (formData.campaignCustom?.trim() ? 1 : 0)

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
        challenge_custom: formData.challengeCustom,
        campaign_custom: formData.campaignCustom,
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

  return (
    <>
      <div className="relative min-h-screen flex flex-col bg-white">
        {/* ScaleAgentic logo centered (visible on every step) */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <Link
            href="https://scaleagentic.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/ScaleAgentic Logo (1).png"
              alt="ScaleAgentic Logo"
              width={300}
              height={60}
              priority
            />
          </Link>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex-1 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center space-y-8">
            <ProgressDots currentStep={1} />

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Scout found{" "}
              <span className="text-[#6602CA] inline-flex items-center">
                {opportunityCount}
                <Sparkles className="w-8 h-8 ml-2 text-[#6602CA] animate-pulse" />
              </span>{" "}
              GTM opportunities for{" "}
              <span className="bg-gradient-to-r from-[#6602CA] to-[#6602CA] bg-clip-text text-transparent">
                companies like yours
              </span>{" "}
              this week
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our Agentic GTM Brain is actively tracking signals and building
              hyper-personalized campaigns right now.
            </p>
            <div>
              <Button
                onClick={() => updateStep(2)}
                size="lg"
                className="group bg-gradient-to-r from-[#6602CA] to-[#6602CA] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Show Me My Opportunities
                <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-[#6602CA]/5 via-white to-[#6602CA]/5">
            <ProgressDots currentStep={2} />

            {/* Heading */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                What's your biggest GTM challenge right now?
              </h2>
              <p className="text-lg text-gray-600">
                Help Scout understand what to focus on for you
              </p>
            </div>

            {/* Challenge cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {challenges.map((challenge) => {
                const Icon = challenge.icon
                const isSelected = formData.challenges.includes(challenge.id)
                return (
                  <Card
                    key={challenge.id}
                    className={`cursor-pointer transition-all duration-300 rounded-xl ${
                      isSelected
                        ? "border-2 border-[#6602CA] bg-[#6602CA]/10 shadow-[0_0_15px_rgba(102,2,202,0.35)]"
                        : "border border-gray-200 hover:border-[#6602CA]/50 hover:shadow-[0_0_12px_rgba(102,2,202,0.25)]"
                    }`}
                    onClick={() => handleChallengeToggle(challenge.id)}
                  >
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          isSelected ? "bg-[#6602CA]/30" : "bg-[#6602CA]/20"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isSelected
                              ? "text-[#6602CA]"
                              : "text-[#6602CA]/80"
                          }`}
                        />
                      </div>
                      <p
                        className={`font-medium ${
                          isSelected ? "text-[#6602CA]" : "text-gray-900"
                        }`}
                      >
                        {challenge.title}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Custom challenge textarea */}
            <div className="max-w-2xl w-full mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Or describe your biggest GTM challenge and goals in your
                      own words:
                    </label>
                    <Textarea
                      placeholder="Tell us about your specific GTM challenges, goals, and what you're trying to achieve..."
                      value={formData.challengeCustom || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          challengeCustom: e.target.value,
                        }))
                      }
                      className="!h-28 w-full resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Continue button */}
              <div className="text-center">
                <Button
                  onClick={() => updateStep(3)}
                  size="lg"
                  disabled={
                    formData.challenges.length === 0 &&
                    !formData.challengeCustom?.trim()
                  }
                  className="group bg-gradient-to-r from-[#6602CA] to-[#6602CA] text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-[#6602CA]/5 via-white to-[#6602CA]/5">
            <ProgressDots currentStep={3} />

            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Scout can run these campaigns for you
              </h2>
              <p className="text-lg text-gray-600">
                Pick what excites you most (select multiple) or describe your
                own
              </p>
            </div>

            {/* Power meter */}
            {(formData.campaigns.length > 0 ||
              formData.campaignCustom?.trim()) && (
              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Campaign Power
                  </span>
                  <span className="text-sm text-[#6602CA]">
                    {formData.campaigns.length +
                      (formData.campaignCustom ? 1 : 0)}
                    /9
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#6602CA] to-[#6602CA] h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        ((formData.campaigns.length +
                          (formData.campaignCustom ? 1 : 0)) /
                          9) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Campaign cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {campaigns.map((campaign) => {
                const Icon = campaign.icon
                const isSelected = formData.campaigns.includes(campaign.id)
                return (
                  <Card
                    key={campaign.id}
                    className={`cursor-pointer transition-all duration-300 rounded-xl ${
                      isSelected
                        ? "border-2 border-[#6602CA] bg-[#6602CA]/10 shadow-[0_0_15px_rgba(102,2,202,0.35)]"
                        : "border border-gray-200 hover:border-[#6602CA]/50 hover:shadow-[0_0_12px_rgba(102,2,202,0.25)]"
                    }`}
                    onClick={() => handleCampaignToggle(campaign.id)}
                  >
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-[#6602CA]/30" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isSelected
                                ? "text-[#6602CA]"
                                : "text-[#6602CA]/80"
                            }`}
                          />
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-[#6602CA]" />
                        )}
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${
                            isSelected ? "text-[#6602CA]" : "text-gray-900"
                          }`}
                        >
                          {campaign.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {campaign.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Custom campaign textarea */}
            <div className="w-full max-w-2xl space-y-2 mb-8">
              <label className="block font-medium text-gray-700">
                Or describe your ideal campaign in your own words:
              </label>
              <Textarea
                placeholder="Tell us about the specific campaign you'd like Scout to run for you..."
                value={formData.campaignCustom || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    campaignCustom: e.target.value,
                  }))
                }
                className="!h-28 w-full resize-none"
              />
            </div>

            {/* Continue button */}
            <div className="mt-4 text-center">
              <Button
                onClick={() => updateStep(5)}
                disabled={
                  formData.campaigns.length === 0 &&
                  !formData.campaignCustom?.trim()
                }
                size="lg"
                className="group bg-gradient-to-r from-[#6602CA] to-[#6602CA] text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Generate My GTM Preview
                <Sparkles className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-[#6602CA]/5 via-white to-[#6602CA]/5">
            <ProgressDots currentStep={5} />
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Get your personalized GTM opportunities
              </h2>
              <p className="text-lg text-gray-600">
                Scout has{" "}
                {formData.campaigns.length +
                  (formData.campaignCustom ? 1 : 0)}{" "}
                campaign previews ready for you
              </p>
            </div>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="email"
                    placeholder="Work email *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Your name *"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    required
                    className="h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Company name *"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    required
                    className="h-12"
                  />
                  <select
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        teamSize: e.target.value,
                      }))
                    }
                    required
                    className="w-full h-12 px-3 border rounded-md"
                  >
                    <option value="">Company Size *</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full h-12 bg-gradient-to-r from-[#6602CA] to-[#6602CA] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    {isLoading ? (
                      "Activating Scout..."
                    ) : (
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
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-[#6602CA]/5 via-white to-[#6602CA]/5">
            <ProgressDots currentStep={6} />
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-[#6602CA] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-green-500 to-[#6602CA] rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  🎉 Scout is now tracking {totalCampaigns * 12} signals for
                  you!
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
                  Welcome to ScaleAgentic, {formData.firstName}! Your
                  personalized GTM opportunities are being generated and will be
                  in your inbox within 5 minutes.
                </p>
              </div>
              <Card className="max-w-lg mx-auto">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      What happens next:
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#6602CA] rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Scout analyzes your GTM signals in real-time
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#6602CA] rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Personalized opportunities delivered to your inbox
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#6602CA] rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Optional demo to explore advanced features
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <a
                  href="https://calendly.com/scaleagentic/agent-scout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-[#6602CA] to-[#6602CA] hover:from-[#6602CA]/90 hover:to-[#6602CA]/80 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg active:scale-95 cursor-pointer"
                >
                  Schedule Scout Demo
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2" />
                </a>
                <p className="text-sm text-gray-500">
                  Or explore your dashboard when you receive your login details
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
