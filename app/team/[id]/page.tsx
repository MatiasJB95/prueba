"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockTeams } from "@/lib/mock-data"
import {
  ArrowLeft,
  Users,
  BarChart,
  Clock,
  CheckCircle,
  Video,
  UserCheck,
  FileText,
  ExternalLink,
  Play,
  Building2,
  MessageSquare,
  Star,
} from "lucide-react"

// Helper function to get timezone for member
const getTimezone = (memberName: string) => {
  const timezones = {
    "Alex Johnson": "GMT-5",
    "Sarah Chen": "GMT-8",
    "Miguel Rodriguez": "GMT-6",
    "Priya Patel": "GMT+5:30",
    "James Wilson": "GMT+0",
    "Emma Davis": "GMT+10",
    "David Kim": "GMT+9",
    "Olivia Martinez": "GMT+1",
    "Raj Sharma": "GMT+5:30",
  }
  return timezones[memberName as keyof typeof timezones] || "GMT-5"
}

// Helper function to get skills for role
const getSkillsForRole = (role: string) => {
  const roleSkills = {
    "Frontend Developer": ["React", "TypeScript", "CSS"],
    "Backend Developer": ["Node.js", "Python", "API Design"],
    "UI/UX Designer": ["UX Research", "Wireframing", "Figma"],
    "Full Stack Developer": ["React", "Node.js", "MongoDB"],
    "Mobile Developer": ["React Native", "Swift", "Flutter"],
    "Data Scientist": ["Python", "Machine Learning", "Analytics"],
    "DevOps Engineer": ["Docker", "AWS", "CI/CD"],
  }
  return roleSkills[role as keyof typeof roleSkills] || ["JavaScript", "HTML", "CSS"]
}

// Soft Skills Component with brand gradient colors
function SoftSkillCard({
  title,
  value,
  icon: Icon,
  className = "",
}: {
  title: string
  value: number
  icon: any
  className?: string
}) {
  const getTendencyLabel = (value: number) => {
    if (value >= 90) return "Tendencia muy alta"
    if (value >= 80) return "Tendencia alta"
    if (value >= 70) return "Tendencia media"
    if (value >= 60) return "Tendencia baja"
    return "Tendencia muy baja"
  }

  const getTendencyColor = (value: number) => {
    if (value >= 90) return "text-green-400"
    if (value >= 80) return "text-cyan-400"
    if (value >= 70) return "text-yellow-400"
    if (value >= 60) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div
      className={`bg-transparent backdrop-blur-sm border-2 rounded-xl p-4 relative ${className}`}
      style={{
        borderImage: "linear-gradient(135deg, #ec4899, #06b6d4) 1",
        border: "2px solid transparent",
        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1)) border-box",
        backgroundClip: "padding-box",
      }}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-xl p-[2px]"
        style={{
          background: "linear-gradient(135deg, #ec4899, #06b6d4)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-3">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${getTendencyColor(value)}`}>{getTendencyLabel(value)}</span>
            <span className="text-lg font-bold text-white">{value}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 relative overflow-hidden">
            <div
              className="h-2 rounded-full transition-all duration-300 relative"
              style={{
                width: `${value}%`,
                background: "linear-gradient(90deg, #ec4899, #06b6d4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Find the team by ID from mock data
  const team = mockTeams.find((t) => t.id === params.id) || mockTeams[0]

  // Add client company information based on team sector
  const getClientCompany = (sector: string, category: string) => {
    const companyMap = {
      Fintech: {
        name: "FinFlow Solutions",
        logo: "/generic-payment-logo.png",
        description: "Leading digital payment platform serving millions of users worldwide",
        industry: "Financial Technology",
        size: "500-1000 employees",
      },
      Healthcare: {
        name: "MediSync",
        logo: "/medisync-logo.png",
        description: "Healthcare technology company focused on patient management systems",
        industry: "Healthcare Technology",
        size: "200-500 employees",
      },
      "E-commerce": {
        name: "ShopWave",
        logo: "/shopwave-logo.png",
        description: "Next-generation e-commerce platform for modern retailers",
        industry: "E-commerce Technology",
        size: "1000+ employees",
      },
      Education: {
        name: "EduSphere",
        logo: "/edusphere-logo.png",
        description: "Educational technology platform transforming online learning",
        industry: "Education Technology",
        size: "100-200 employees",
      },
      Insurance: {
        name: "GuardianCover",
        logo: "/guardiancover-logo.png",
        description: "Digital insurance platform providing comprehensive coverage solutions",
        industry: "Insurance Technology",
        size: "300-500 employees",
      },
      Retail: {
        name: "RetailTech Pro",
        logo: "/generic-company-logo.png",
        description: "Retail technology solutions for modern commerce",
        industry: "Retail Technology",
        size: "200-300 employees",
      },
    }
    return (
      companyMap[sector] || {
        name: "TechCorp Solutions",
        logo: "/generic-company-logo.png",
        description: "Technology solutions company",
        industry: "Technology",
        size: "100-500 employees",
      }
    )
  }

  const clientCompany = getClientCompany(team.sector, team.category)

  // Add skills and tools data based on team vertical
  const getTeamSkillsAndTools = (vertical: string) => {
    const skillsMap = {
      "Web App Development": {
        skills: ["React", "Node.js", "TypeScript", "JavaScript", "HTML/CSS"],
        tools: ["VS Code", "Git", "Docker", "AWS", "MongoDB"],
      },
      "Mobile Development": {
        skills: ["React Native", "Swift", "Kotlin", "Flutter", "JavaScript"],
        tools: ["Xcode", "Android Studio", "Firebase", "TestFlight", "Figma"],
      },
      Web3: {
        skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi"],
        tools: ["MetaMask", "Hardhat", "Remix", "Ganache", "OpenZeppelin"],
      },
      "Machine Learning": {
        skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas"],
        tools: ["Jupyter", "Google Colab", "Docker", "MLflow", "Tableau"],
      },
      "Customer Experience": {
        skills: ["UI/UX Design", "User Research", "Prototyping", "Wireframing", "Design Systems"],
        tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro"],
      },
      "Content Marketing": {
        skills: ["SEO", "Content Strategy", "Copywriting", "Social Media", "Analytics"],
        tools: ["Google Analytics", "Hootsuite", "Canva", "WordPress", "Mailchimp"],
      },
    }
    return skillsMap[vertical] || { skills: ["JavaScript", "HTML", "CSS"], tools: ["VS Code", "Git", "Chrome"] }
  }

  const teamSkillsAndTools = getTeamSkillsAndTools(team.category)

  // Add team member countries (mock data based on names)
  const getCountryName = (name: string) => {
    const countryMap = {
      "Alex Johnson": "United States",
      "Sarah Chen": "Canada",
      "Miguel Rodriguez": "Mexico",
      "Priya Patel": "India",
      "James Wilson": "United Kingdom",
      "Emma Davis": "Australia",
      "David Kim": "South Korea",
      "Olivia Martinez": "Spain",
      "Raj Sharma": "India",
      "Daniel Lee": "South Korea",
      "Sophia Williams": "United States",
      "Marcus Johnson": "United States",
      "Aisha Khan": "Pakistan",
      "Thomas Brown": "United Kingdom",
      "Elena Petrova": "Russia",
      "Robert Zhang": "China",
      "Natalie Adams": "United States",
      "Omar Hassan": "Egypt",
      "Lisa Chen": "Taiwan",
      "Kevin Park": "South Korea",
      "Isabella Garcia": "Mexico",
      "Jordan Taylor": "United States",
      "Zoe Williams": "United Kingdom",
      "Hiroshi Tanaka": "Japan",
      "Emily Wilson": "United States",
      "Carlos Mendez": "Mexico",
      "Grace Kim": "South Korea",
    }
    return countryMap[name] || "Unknown"
  }

  // Add soft skills data for team members with detailed descriptions
  const getSoftSkillsDetailed = (memberName: string) => {
    const softSkillsMap = {
      "Alex Johnson": {
        proactividad: { value: 92 },
        trabajoEnEquipo: { value: 88 },
        adaptacion: { value: 95 },
        reviews: 24,
      },
      "Sarah Chen": {
        proactividad: { value: 85 },
        trabajoEnEquipo: { value: 90 },
        adaptacion: { value: 87 },
        reviews: 18,
      },
      "Miguel Rodriguez": {
        proactividad: { value: 94 },
        trabajoEnEquipo: { value: 92 },
        adaptacion: { value: 89 },
        reviews: 31,
      },
      "Priya Patel": {
        proactividad: { value: 88 },
        trabajoEnEquipo: { value: 85 },
        adaptacion: { value: 91 },
        reviews: 22,
      },
      "James Wilson": {
        proactividad: { value: 90 },
        trabajoEnEquipo: { value: 87 },
        adaptacion: { value: 93 },
        reviews: 27,
      },
    }
    return (
      softSkillsMap[memberName] || {
        proactividad: { value: 85 },
        trabajoEnEquipo: { value: 85 },
        adaptacion: { value: 85 },
        reviews: 15,
      }
    )
  }

  // Add simulation dates
  const simulationData = {
    startDate: "March 15, 2024",
    endDate: "April 12, 2024",
    weeksSpent: 5,
  }

  // Team insights data
  const teamInsights = {
    attendance: 94,
    messages: 1247,
    interactions: 856,
    meetings: 32,
    peerReviews: 48,
  }

  // Team deliverables data
  const teamDeliverables = [
    {
      type: "document",
      title: "Project Requirements Document",
      description: "Comprehensive project specifications and requirements",
      url: "#",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      type: "document",
      title: "Technical Architecture",
      description: "System design and technical architecture documentation",
      url: "#",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      type: "demo",
      title: "Live Demo - FinFlow Dashboard",
      description: "Interactive demo of the completed application",
      url: "#",
      status: "Live",
    },
    {
      type: "demo",
      title: "Prototype Walkthrough",
      description: "Video demonstration of key features and functionality",
      url: "#",
      duration: "12:34",
    },
    {
      type: "document",
      title: "User Testing Results",
      description: "Comprehensive user testing report and insights",
      url: "#",
      size: "3.2 MB",
      format: "PDF",
    },
    {
      type: "document",
      title: "Final Presentation",
      description: "Project summary and results presentation",
      url: "#",
      size: "5.1 MB",
      format: "PPTX",
    },
  ]

  // Helper function to format member name
  const formatMemberName = (fullName: string) => {
    const parts = fullName.split(" ")
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[parts.length - 1][0]}.`
    }
    return fullName
  }

  useEffect(() => {
    // Check if user has verified email
    const emailVerified = localStorage.getItem("emailVerified") === "true"

    if (!emailVerified) {
      // If not verified, redirect to showcase page
      localStorage.setItem("pendingTeamView", params.id)
      router.push("/showcase")
    } else {
      setIsVerified(true)
    }

    setIsLoading(false)
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isVerified) {
    return null // This shouldn't render as we're redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-52 md:h-64 w-full">
          <img
            src={team.coverImage || "/placeholder.svg"}
            alt={`${team.name} team`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container">
              <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teams
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{team.category}</Badge>
                <Badge variant="outline">{team.sector}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">
                  {team.category} - {team.sector}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-bold text-blue-300">
                    {simulationData.startDate} - {simulationData.endDate}
                  </span>
                </div>
              </div>

              {/* Project Context section - minimalistic version above insights */}
              <div className="mb-6">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    <span>{team.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span>{simulationData.weeksSpent} weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-green-400" />
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Project Context section - minimalistic version above insights */}

              <p className="text-muted-foreground mb-8">
                <span className="font-semibold text-red-400">Business Challenge:</span>{" "}
                <span className="font-semibold text-blue-400">{clientCompany.name}</span> faced critical operational
                bottlenecks and user experience problems that were impacting their {team.sector.toLowerCase()} business
                growth. This team was assembled to solve these urgent challenges and deliver a production-ready solution
                within {simulationData.weeksSpent} weeks.
              </p>

              {/* Team Insights Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Performance Insights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <MessageSquare className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{teamInsights.messages}</div>
                    <div className="text-xs text-muted-foreground">Total Messages</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <Clock className="h-6 w-6 text-pink-400" />
                    </div>
                    <div className="text-2xl font-bold text-pink-400">
                      {Math.floor(teamInsights.interactions / 10)}h
                    </div>
                    <div className="text-xs text-muted-foreground">Connection Time</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <Video className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{teamInsights.meetings}</div>
                    <div className="text-xs text-muted-foreground">Meetings</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <FileText className="h-6 w-6 text-pink-400" />
                    </div>
                    <div className="text-2xl font-bold text-pink-400">{teamDeliverables.length}</div>
                    <div className="text-xs text-muted-foreground">Deliverables</div>
                  </div>
                </div>
              </div>

              {/* Team Members Section with Soft Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Members</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {team.members.map((member, index) => {
                    const softSkills = getSoftSkillsDetailed(member.name)
                    const memberStats = {
                      timezone: getTimezone(member.name),
                      activeHours: Math.floor(Math.random() * 40) + 20,
                      lastSeen: Math.floor(Math.random() * 60) + 5,
                      messagesSent: Math.floor(Math.random() * 200) + 50,
                      attendance: softSkills.trabajoEnEquipo.value,
                      deliverables: Math.floor(Math.random() * 8) + 3,
                      contribution:
                        (softSkills.proactividad.value +
                          softSkills.trabajoEnEquipo.value +
                          softSkills.adaptacion.value) /
                        30,
                    }

                    return (
                      <div
                        key={index}
                        className="bg-transparent backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          {/* Top row with profile and basic info */}
                          <div className="flex items-start gap-4">
                            {/* Profile Image */}
                            <div className="relative flex-shrink-0">
                              <img
                                src={member.avatar || "/placeholder.svg"}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-pink-500/50 to-cyan-500/50"
                              />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background shadow-lg"></div>
                            </div>

                            {/* Member Info - aligned with profile picture */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-lg font-bold text-white leading-tight mb-1">
                                    {member.name.split(" ")[0]}
                                  </h4>
                                  <p className="text-slate-200 text-sm font-medium mb-1">{member.role}</p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs">🇲🇽</span>
                                    <span className="text-slate-300 text-xs font-medium">{memberStats.timezone}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-1 bg-transparent px-3 py-2 rounded-lg">
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-300 text-2xl font-bold">
                                      {(Math.random() * 3 + 7).toFixed(1)}
                                    </span>
                                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                  </div>
                                  <span className="text-yellow-200 text-xs">peer review</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Stats in two columns */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-cyan-400" />
                              <span>{memberStats.activeHours}h active this week</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-3 w-3 text-pink-400" />
                              <span>{memberStats.messagesSent} messages sent</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-3 w-3 text-green-400" />
                              <span>{memberStats.attendance}% attendance</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-3 w-3 text-blue-400" />
                              <span>{memberStats.deliverables} deliverables</span>
                            </div>
                          </div>

                          {/* Contribution Score */}
                          <div className="bg-transparent rounded-lg p-3 border border-slate-600/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-300 text-xs font-medium">Contribución Observada</span>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-bold text-sm">
                                {memberStats.contribution.toFixed(1)}
                              </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-pink-500 to-cyan-400 h-2 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${(memberStats.contribution / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Skills and Tools Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Skills & Tools Used</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {teamSkillsAndTools.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-secondary">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {teamSkillsAndTools.tools.map((tool, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-secondary/10 text-secondary border-secondary/30"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deliverables Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teamDeliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="bg-transparent backdrop-blur-sm rounded-lg p-2 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/20 p-2 rounded-lg">
                            {deliverable.type === "document" ? (
                              <FileText className="h-4 w-4 text-primary" />
                            ) : (
                              <Play className="h-4 w-4 text-secondary" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm">{deliverable.title}</h4>
                        </div>
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                          <ExternalLink className="h-4 w-4 text-slate-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Client Company Section - Moved to Sidebar */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <img
                      src={clientCompany.logo || "/placeholder.svg"}
                      alt={`${clientCompany.name} logo`}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Client Company</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{clientCompany.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{clientCompany.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Industry: {clientCompany.industry}</span>
                      <span>Size: {clientCompany.size}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interested in This Team Section */}
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">Interested in This Team?</h3>
                <p className="text-muted-foreground mb-6">
                  Let us help you find and assign the perfect team for your specific project needs and requirements.
                </p>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">What We Offer</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Custom team matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Project-specific assignments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Ongoing support & management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Performance monitoring</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <Button className="w-full gradient-bg">Request Team Assignment</Button>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm text-muted-foreground">Other Available Verticals</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      Mobile Development
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Web3
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Machine Learning
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Customer Experience
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
