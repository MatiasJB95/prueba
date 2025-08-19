"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ChevronRight, ArrowLeft, MessageSquare, UserPlus, BarChart, Video } from "lucide-react"
import { mockTeams as initialMockTeams } from "@/lib/mock-data"
import { verticals } from "@/lib/filter-options"

// Function to get company logo based on sector
function getCompanyLogo(sector: string): { src: string; name: string } {
  // Map sectors to company logos
  const logoMap: Record<string, { src: string; name: string }> = {
    Fintech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oracle-6-logo-black-and-white-QhvwdkPfUxMfeI5gSFrKgWJC7jtGje.png",
      name: "Oracle",
    },
    Healthtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MercadoLibre-Grey-hXmUGSwIOo3txGHRWbRMnFA19jLhB5.png",
      name: "MercadoLibre",
    },
    Edtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portable-network-graphics-microsoft-corporation-transparency-logo-vector-graphics-png-favpng-j09ZSr1J8jPvdtKU43pHMxnit.jpg-T7zL85n8HpD8h2gcnAszIJbKywrZ4Y.jpeg",
      name: "Microsoft",
    },
    Retail: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MercadoLibre-Grey-hXmUGSwIOo3txGHRWbRMnFA19jLhB5.png",
      name: "MercadoLibre",
    },
    Crypto: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oracle-6-logo-black-and-white-QhvwdkPfUxMfeI5gSFrKgWJC7jtGje.png",
      name: "Oracle",
    },
    Insurtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portable-network-graphics-microsoft-corporation-transparency-logo-vector-graphics-png-favpng-j09ZSr1J8jPvdtKU43pHMxnit.jpg-T7zL85n8HpD8h2gcnAszIJbKywrZ4Y.jpeg",
      name: "Microsoft",
    },
  }

  return logoMap[sector] || { src: "/generic-company-logo.png", name: "Company" }
}

// Function to generate relevant titles with lead keywords
function getProjectTitle(sector: string, vertical: string): string {
  const titleMap: Record<string, string[]> = {
    Fintech: [
      "FINTECH SAAS PLATFORM",
      "B2B PAYMENT SOLUTION",
      "AI-POWERED TRADING APP",
      "DIGITAL BANKING PLATFORM",
      "FINTECH MOBILE APP",
    ],
    Healthtech: [
      "HEALTHTECH SAAS PLATFORM",
      "AI HEALTH ASSISTANT",
      "MEDICAL DATA PLATFORM",
      "HEALTHCARE MOBILE APP",
      "B2B HEALTH SOLUTION",
    ],
    Edtech: [
      "EDTECH SAAS PLATFORM",
      "AI LEARNING ASSISTANT",
      "EDUCATIONAL MOBILE APP",
      "B2B LEARNING PLATFORM",
      "CONTENT MARKETING TOOL",
    ],
    Retail: [
      "E-COMMERCE PLATFORM",
      "RETAIL SAAS SOLUTION",
      "CONSUMER SHOPPING APP",
      "B2B RETAIL PLATFORM",
      "AI RECOMMENDATION ENGINE",
    ],
    Crypto: [
      "WEB3 DATA PLATFORM",
      "CRYPTO TRADING APP",
      "BLOCKCHAIN SAAS TOOL",
      "WEB3 CONSUMER APP",
      "AI CRYPTO AGENT",
    ],
    Insurtech: [
      "INSURTECH SAAS PLATFORM",
      "AI INSURANCE AGENT",
      "B2B INSURANCE TOOL",
      "INSURANCE MOBILE APP",
      "AUTOMATION PLATFORM",
    ],
  }

  // Get titles for the sector, fallback to generic titles
  const sectorTitles = titleMap[sector] || [
    "SAAS PLATFORM",
    "MOBILE APP SOLUTION",
    "B2B PLATFORM",
    "AI-POWERED TOOL",
    "DATA PLATFORM",
  ]

  // Return a random title from the sector's options
  return sectorTitles[Math.floor(Math.random() * sectorTitles.length)]
}

// Function to generate team roles based on sector and team size
function getTeamRoles(sector: string, memberCount: number): string[] {
  const rolesBySector: Record<string, string[]> = {
    Fintech: [
      "Frontend Dev",
      "Backend Dev",
      "DevOps",
      "Product Manager",
      "UI/UX Designer",
      "QA Engineer",
      "Data Analyst",
    ],
    Healthtech: [
      "Full Stack Dev",
      "Mobile Dev",
      "Data Scientist",
      "Product Manager",
      "UI/UX Designer",
      "QA Engineer",
      "DevOps",
    ],
    Edtech: [
      "Frontend Dev",
      "Backend Dev",
      "Mobile Dev",
      "Product Manager",
      "UI/UX Designer",
      "Content Creator",
      "QA Engineer",
    ],
    Retail: [
      "E-commerce Dev",
      "Frontend Dev",
      "Backend Dev",
      "Product Manager",
      "UI/UX Designer",
      "Marketing Specialist",
      "QA Engineer",
    ],
    Crypto: [
      "Blockchain Dev",
      "Smart Contract Dev",
      "Frontend Dev",
      "Backend Dev",
      "Security Engineer",
      "Product Manager",
      "UI/UX Designer",
    ],
    Insurtech: [
      "Full Stack Dev",
      "Data Scientist",
      "Backend Dev",
      "Product Manager",
      "UI/UX Designer",
      "Business Analyst",
      "QA Engineer",
    ],
  }

  const defaultRoles = [
    "Frontend Dev",
    "Backend Dev",
    "Full Stack Dev",
    "Product Manager",
    "UI/UX Designer",
    "QA Engineer",
    "DevOps",
  ]
  const availableRoles = rolesBySector[sector] || defaultRoles

  // Shuffle and return the required number of roles
  const shuffledRoles = [...availableRoles].sort(() => Math.random() - 0.5)
  return shuffledRoles.slice(0, memberCount)
}

// Function to calculate accumulated experience in weeks for a team
function calculateTeamExperience(teamId: string, memberCount: number): number {
  // Base experience per member (simulating different participation levels)
  const baseExperiencePerMember = {
    "1": [12, 8, 16, 6, 10], // Team 1: mix of experience levels
    "2": [4, 6, 8, 5], // Team 2: newer team
    "3": [20, 14, 18, 12, 8, 10], // Team 3: experienced team
    "4": [6, 8, 4, 10, 12], // Team 4: moderate experience
    "5": [24, 16, 20, 18, 14, 12, 8], // Team 5: highly experienced
    "6": [10, 12, 8, 14, 6, 16], // Team 6: varied experience
  }

  const teamExperience = baseExperiencePerMember[teamId as keyof typeof baseExperiencePerMember]

  if (teamExperience) {
    return teamExperience.reduce((total, weeks) => total + weeks, 0)
  }

  // Fallback calculation for teams not in the map
  return Math.floor(Math.random() * 15 + 5) * memberCount
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const mockTeams = initialMockTeams.map((team) => {
  const accumulatedExperience = calculateTeamExperience(team.id, team.memberCount)

  switch (team.id) {
    case "1":
      return {
        ...team,
        stats: { attendance: "98%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "15" },
      }
    case "2":
      return {
        ...team,
        stats: { attendance: "92%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "8" },
      }
    case "3":
      return {
        ...team,
        stats: { attendance: "95%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "11" },
      }
    case "4":
      return {
        ...team,
        stats: { attendance: "90%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "9" },
      }
    case "5":
      return {
        ...team,
        stats: { attendance: "99%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "18" },
      }
    case "6":
      return {
        ...team,
        stats: { attendance: "93%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "14" },
      }
    default:
      return {
        ...team,
        stats: { attendance: "95%", accumulatedExperience: `${accumulatedExperience}w`, deliverables: "12" },
      }
  }
})

export function ShowcaseSection() {
  const [shuffledTeams, setShuffledTeams] = useState(mockTeams)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Calculate how many cards are visible at once
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3 // lg screens
      if (window.innerWidth >= 768) return 2 // md screens
      return 1 // sm screens
    }
    return 3
  }

  const [visibleCards, setVisibleCards] = useState(getVisibleCards)

  useEffect(() => {
    // Check if user has already verified email
    const emailVerified = localStorage.getItem("emailVerified") === "true"
    if (emailVerified) {
      setEmailSubmitted(true)
      setEmail(localStorage.getItem("userEmail") || "")
    }

    // Shuffle the teams array on component mount
    const shuffled = shuffleArray(mockTeams)
    setShuffledTeams(shuffled)

    // Handle window resize
    const handleResize = () => {
      setVisibleCards(getVisibleCards())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update arrow visibility based on current index
  useEffect(() => {
    setShowLeftArrow(currentIndex > 0)
    setShowRightArrow(currentIndex < shuffledTeams.length - visibleCards)
  }, [currentIndex, shuffledTeams.length, visibleCards])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailSubmit = () => {
    if (isValidEmail) {
      setEmailSubmitted(true)
      setShowEmailModal(false)

      // Store the email in localStorage to remember this user has submitted
      localStorage.setItem("userEmail", email)
      localStorage.setItem("emailVerified", "true")

      // If there's a pending team to view, redirect to that team's page
      const pendingTeamId = localStorage.getItem("pendingTeamView")
      if (pendingTeamId) {
        localStorage.removeItem("pendingTeamView")
        // Use setTimeout to ensure state updates are processed
        setTimeout(() => {
          window.location.href = `/team/${pendingTeamId}`
        }, 100)
      }
    }
  }

  const scrollToNext = () => {
    if (currentIndex < shuffledTeams.length - visibleCards) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <section
      className="py-16 bg-gradient-to-b from-background to-accent/20 relative overflow-hidden min-h-screen"
      data-section="showcase"
    >
      {/* Cosmic space background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebula-like gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>

        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0.3)",
                `0 0 8px ${
                  [
                    "rgba(255,255,255,0.8)",
                    "rgba(96,165,250,0.8)",
                    "rgba(167,139,250,0.8)",
                    "rgba(52,211,153,0.8)",
                    "rgba(251,191,36,0.8)",
                    "rgba(244,114,182,0.8)",
                  ][i % 6]
                }`,
                "0 0 0px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Larger glowing orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: [
                "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
                "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
                "radial-gradient(circle, #34d399 0%, transparent 70%)",
                "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
                "radial-gradient(circle, #f472b6 0%, transparent 70%)",
              ][i % 5],
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Cosmic dust particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* NoCountry Logo - Top Left Corner */}
      <div className="absolute top-6 left-6 z-30">
        <img src="/nocountry-logo.png" alt="NoCountry Logo" className="h-6 md:h-8" />
      </div>

      <div className="container relative z-10">
        {/* Title at the top */}
        <div className="w-5xl mx-auto"></div>
      </div>

      {/* Netflix-style horizontal scrolling carousel with category title */}
      <div className="mb-16">
        {/* Category Title - Netflix style */}
        <div className="px-12 mb-2 mt-8">
          <h3 className="text-2xl text-foreground hover:text-primary transition-colors duration-200 cursor-default md:text-2xl font-semibold">
            Equipos Destacados
          </h3>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-primary/30 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-0"
              aria-label="Previous teams"
            >
              <ArrowLeft className="h-6 w-6 text-primary" />
            </motion.button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-primary/30 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-0"
              aria-label="Next teams"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </motion.button>
          )}

          {/* Scrollable container */}
          <div className="overflow-hidden px-12">
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-6 transition-transform duration-500 ease-out"
              animate={{
                x: `calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * (24 / visibleCards)}px)`,
              }}
            >
              {shuffledTeams.map((team, index) => (
                <div
                  key={team.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / visibleCards}% - ${((visibleCards - 1) * 24) / visibleCards}px)`,
                  }}
                >
                  <TeamCard
                    team={team}
                    setShowEmailModal={setShowEmailModal}
                    emailSubmitted={emailSubmitted}
                    setShowMembers={() => {}}
                    isActive={index >= currentIndex && index < currentIndex + visibleCards}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(shuffledTeams.length / visibleCards) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCards)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / visibleCards) === index
                    ? "bg-primary w-6"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Vertical tags carousel - moved below team cards */}
      <div className="mb-8 -mt-8">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {verticals.map((vertical, index) => (
              <Badge
                key={`vertical-1-${index}`}
                variant="outline"
                className="mx-2 py-1.5 px-3 text-sm bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-foreground"
              >
                {vertical}
              </Badge>
            ))}
            {verticals.map((vertical, index) => (
              <Badge
                key={`vertical-2-${index}`}
                variant="outline"
                className="mx-2 py-1.5 px-3 text-sm bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30 text-foreground"
              >
                {vertical}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Access Team Details</h3>
              <p className="text-muted-foreground">
                Enter your email to view detailed team information and performance metrics.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setIsValidEmail(validateEmail(e.target.value))
                  }}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowEmailModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleEmailSubmit} disabled={!isValidEmail} className="flex-1 gradient-bg">
                  Continue
                </Button>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center">
              We'll use your email to provide personalized team recommendations.
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

interface TeamCardProps {
  team: any
  setShowEmailModal: (show: boolean) => void
  emailSubmitted: boolean
  setShowMembers: (show: boolean) => void
  isActive?: boolean
}

function TeamCard({ team, setShowEmailModal, emailSubmitted, setShowMembers, isActive = true }: TeamCardProps) {
  const [showMembersLocal, setShowMembersLocal] = useState(false)
  const [showDataSource, setShowDataSource] = useState(false)
  const companyLogo = getCompanyLogo(team.sector)

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if user has already submitted email
    const emailVerified = localStorage.getItem("emailVerified") === "true"

    if (emailVerified) {
      // If verified, go directly to team page
      window.location.href = `/team/${team.id}`
    } else {
      // If not verified, store the team ID and show email modal
      localStorage.setItem("pendingTeamView", team.id)
      setShowEmailModal(true)
    }
  }

  // Generate random interaction data for the team
  const interactionData = {
    messages: Math.floor(Math.random() * 500) + 300,
    interactions: Math.floor(Math.random() * 200) + 150,
    events: Math.floor(Math.random() * 20) + 5,
    meetings: Math.floor(Math.random() * 30) + 10,
    peerReviews: Math.floor(Math.random() * 40) + 20,
  }

  // Get the project title with lead keywords
  const projectTitle = getProjectTitle(team.sector, team.vertical)

  // Get team roles for badges
  const teamRoles = getTeamRoles(team.sector, team.memberCount)

  return (
    <motion.div
      className={`relative h-[420px] rounded-xl overflow-hidden shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 cursor-pointer ${
        isActive ? "hover:scale-105" : "opacity-70"
      }`}
      whileHover={isActive ? { y: -5 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      {/* Team Card (Front) */}
      {!showMembersLocal && !showDataSource && (
        <div className="absolute inset-0 w-full h-full">
          {/* Background with heavy blur and darker gradient overlay */}
          <div className="absolute inset-0 z-0 h-4/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
            <img
              src={
                team.coverImage ||
                `/placeholder.svg?height=500&width=400&query=${team.sector || "/placeholder.svg"} ${team.vertical} illustration`
              }
              alt={`${team.projectName} project`}
              className="w-full h-full object-cover blur-lg brightness-50"
            />
          </div>

          {/* Project Title - Center positioned with Impact-style font */}
          <div className="absolute top-1/4 left-0 right-0 z-20 px-6">
            <div className="text-center">
              <h3
                className="text-3xl text-white mb-4 drop-shadow-2xl tracking-wider leading-tight md:text-3xl lg:text-4xl font-bold"
                style={{
                  fontFamily: 'Impact, "Arial Black", "Franklin Gothic Bold", "Helvetica Neue", Arial, sans-serif',
                  textShadow: "3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                {projectTitle}
              </h3>
            </div>
          </div>

          {/* Team member profiles - positioned below title */}
          <div className="absolute top-[55%] left-0 right-0 z-10 px-4">
            <div className="flex justify-center items-center mb-3">
              <div className="flex -space-x-3">
                {team.members.slice(0, 5).map((member: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="h-12 w-12 rounded-full border-3 border-white/80 overflow-hidden shadow-lg">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
                {team.members.length > 5 && (
                  <div className="relative">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full border-3 border-white/80 bg-black/60 text-white text-xs font-bold shadow-lg">
                      +{team.members.length - 5}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-xs text-white/80 font-medium mb-3">
              Team of {team.memberCount} specialists
            </div>
          </div>

          {/* Team roles as badges - positioned at bottom */}
          <div className="absolute bottom-6 left-0 right-0 z-10 px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {teamRoles.slice(0, 4).map((role, index) => (
                <Badge
                  key={index}
                  className="bg-white/20 border border-white/40 text-white font-medium px-3 py-1 text-xs backdrop-blur-sm shadow-lg"
                >
                  {role}
                </Badge>
              ))}
              {teamRoles.length > 4 && (
                <Badge className="bg-white/20 border border-white/40 text-white font-medium px-3 py-1 text-xs backdrop-blur-sm shadow-lg">
                  +{teamRoles.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Data Source View - Hidden for now */}
      {showDataSource && (
        <div className="absolute inset-0 w-full h-full bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">Data Source</h3>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => setShowDataSource(false)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Team
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              <strong>Raw Interaction Data</strong> - These are the actual interactions captured by our platform during
              the team's collaboration period:
            </p>
          </div>

          <div className="space-y-4 overflow-auto h-[calc(100%-120px)]">
            {/* Messages */}
            <div className="bg-accent/30 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-xs text-muted-foreground">Platform communications</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xl font-bold">{interactionData.messages}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>Chat: {Math.floor(interactionData.messages * 0.7)}</span>
                <span>•</span>
                <span>Comments: {Math.floor(interactionData.messages * 0.3)}</span>
              </div>
            </div>

            {/* Interactions */}
            <div className="bg-accent/30 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-secondary/20 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium">Interactions</h4>
                  <p className="text-xs text-muted-foreground">Collaborative actions</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xl font-bold">{interactionData.interactions}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>File shares: {Math.floor(interactionData.interactions * 0.4)}</span>
                <span>•</span>
                <span>Reactions: {Math.floor(interactionData.interactions * 0.6)}</span>
              </div>
            </div>

            {/* Accumulated Experience */}
            <div className="bg-accent/30 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Accumulated Experience</h4>
                  <p className="text-xs text-muted-foreground">Total weeks in job simulations</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xl font-bold">{team.stats?.accumulatedExperience || "52w"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>Individual participations across all team members</span>
              </div>
            </div>

            {/* Meetings */}
            <div className="bg-accent/30 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Video className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">Meetings</h4>
                  <p className="text-xs text-muted-foreground">Virtual sessions</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xl font-bold">{interactionData.meetings}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>Daily: {Math.floor(interactionData.meetings * 0.6)}</span>
                <span>•</span>
                <span>Planning: {Math.floor(interactionData.meetings * 0.2)}</span>
                <span>•</span>
                <span>Review: {Math.floor(interactionData.meetings * 0.2)}</span>
              </div>
            </div>

            {/* Peer Reviews */}
            <div className="bg-accent/30 rounded-lg p-3 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Award className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium">Peer Reviews</h4>
                  <p className="text-xs text-muted-foreground">Team evaluations</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xl font-bold">{interactionData.peerReviews}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>Code reviews: {Math.floor(interactionData.peerReviews * 0.5)}</span>
                <span>•</span>
                <span>Feedback: {Math.floor(interactionData.peerReviews * 0.5)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">How We Calculate Experience</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              The accumulated experience represents the total weeks each team member has participated in different job
              simulations across our platform. This metric helps assess the collective experience and readiness of the
              team for complex projects.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
