"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
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
  Building2,
  MessageSquare,
  Star,
} from "lucide-react"

// ---------------------
// Tipos API
// ---------------------
type ApiMember = {
  profilePhotoUrl: string
  name: string
  lastName: string
  role: string
  country: string
  timezone: string
  reviewsReceivedCount: number
  peerReview: number
  attendence: number
  userdeliverables: number
  workingTime: number
  menssagesSend: number
}
type ApiTeam = {
  id: number | string
  client: {
    name: string
    logoUrl: string
    sector: string
    size: number
    description: string
  }
  description: string
  projectType: string
  repositoryUrl?: string
  monthYear?: string // "2025-07"
  vertical: string
  weekProject: number
  numberMembers: number
  status: boolean
  chatCount: number
  totalMeeting: number
  totalDelivables: number
  skillNames?: string[]
  toolNames?: string[]
  members: ApiMember[]
}

// ---------------------
// Utils
// ---------------------
const onAvatarError: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const img = e.currentTarget
  if (!img.src.endsWith("/placeholder-user.jpg")) img.src = "/placeholder-user.jpg"
}

function coverBySector(sectorRaw: string | undefined) {
  const sector = (sectorRaw || "").toLowerCase().trim()
  const map: Record<string, string> = {
    crypto: "/interconnected-crypto-web3.png",
    fintech: "/modern-fintech-dashboard.png",
    healthtech: "/connected-health-apps.png",
    insurtech: "/connected-insurance-growth.png",
    retail: "/retail-ml-insights.png",
    edtech: "/connected-learning-journey.png",
  }
  return map[sector] ?? ""
}

function countryToFlag(country: string | undefined) {
  const c = (country || "").toLowerCase()
  if (c.includes("arg")) return "🇦🇷"
  if (c.includes("mex")) return "🇲🇽"
  if (c.includes("ven")) return "🇻🇪"
  if (c.includes("chi")) return "🇨🇱"
  if (c.includes("per")) return "🇵🇪"
  if (c.includes("esp") || c.includes("espa")) return "🇪🇸"
  return "🌍"
}

function formatRangeFromMonthYear(monthYear?: string, weeks = 4) {
  if (!monthYear) return { start: "—", end: "—" }
  const [y, m] = monthYear.split("-").map((n) => parseInt(n, 10))
  const start = new Date(y, m - 1, 1)
  const end = new Date(start)
  end.setDate(start.getDate() + weeks * 7)
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
  return { start: fmt(start), end: fmt(end) }
}

// ---------------------
// Componente
// ---------------------
export default function TeamSection({ id }: { id: string }) {
  const router = useRouter()

  const [apiTeam, setApiTeam] = useState<ApiTeam | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carga desde API
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`http://localhost:8080/showcase/team/${id}`, { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as ApiTeam
        if (mounted) setApiTeam(data)
      } catch (e) {
        console.error("Error cargando team:", e)
      } finally {
        if (mounted) setIsLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  // Verificación de email
  useEffect(() => {
    const emailVerified = localStorage.getItem("emailVerified") === "true"
    if (!emailVerified) {
      localStorage.setItem("pendingTeamView", String(id))
      router.push("/showcase")
    } else {
      setIsVerified(true)
    }
  }, [id, router])

  const sector = apiTeam?.client?.sector || ""
  const cover = coverBySector(sector)
  const { start: startDate, end: endDate } = useMemo(
    () => formatRangeFromMonthYear(apiTeam?.monthYear, apiTeam?.weekProject ?? 4),
    [apiTeam?.monthYear, apiTeam?.weekProject]
  )

  const totalMessages = apiTeam?.chatCount ?? 0
  const totalMeetings = apiTeam?.totalMeeting ?? 0
  const totalDeliverables = apiTeam?.totalDelivables ?? 0
  const totalWorkingTime = (apiTeam?.members || []).reduce((sum, m) => sum + (m.workingTime || 0), 0)
  const connectionHours = Math.max(1, Math.round(totalWorkingTime / 60))

  const apiSkills = apiTeam?.skillNames || []
  const apiTools = apiTeam?.toolNames || []

  const members = (apiTeam?.members || []).map((m) => ({
    avatar: m.profilePhotoUrl || "/placeholder-user.jpg",
    name: `${m.name} ${m.lastName}`.trim(),
    role: m.role,
    country: m.country,
    timezone: m.timezone,
    peerReview: m.peerReview,
    attendance: m.attendence,
    deliverables: m.userdeliverables,
    workingTime: m.workingTime,
    messagesSent: m.menssagesSend,
  }))

  // Loading (con Header/Footer)
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!isVerified) return null

  if (!apiTeam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-16">
            <p className="text-muted-foreground">No se encontró información del equipo.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Header visual del team */}
        <div className="relative h-52 md:h-64 w-full">
          <img
            src={cover || "/placeholder.svg"}
            alt={`${apiTeam.client?.name || "Team"} cover`}
            className="w-full h-full object-cover"
            onError={onAvatarError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container">
              <Link href="/showcase" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teams
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary">{apiTeam.vertical}</Badge>
                <Badge variant="outline">{sector}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold">
                  {apiTeam.vertical} - {sector}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-bold text-blue-300">
                    {startDate} - {endDate}
                  </span>
                </div>
              </div>

              {/* KPIs */}
              <div className="mb-6">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    <span>{apiTeam.numberMembers} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span>{apiTeam.weekProject} weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-green-400" />
                    <span>{apiTeam.status ? "Active" : "Available"}</span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-muted-foreground mb-8">
                <span className="font-semibold text-red-400">Business Challenge:</span>{" "}
                <span className="font-semibold text-blue-400">{apiTeam.client?.name}</span> {apiTeam.description}
              </p>

              {/* Insights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Performance Insights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <MessageSquare className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{totalMessages}</div>
                    <div className="text-xs text-muted-foreground">Total Messages</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <Clock className="h-6 w-6 text-pink-400" />
                    </div>
                    <div className="text-2xl font-bold text-pink-400">{connectionHours}h</div>
                    <div className="text-xs text-muted-foreground">Connection Time</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <Video className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{totalMeetings}</div>
                    <div className="text-xs text-muted-foreground">Meetings</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-4 rounded-lg text-center border border-pink-500/20">
                    <div className="flex justify-center mb-2">
                      <FileText className="h-6 w-6 text-pink-400" />
                    </div>
                    <div className="text-2xl font-bold text-pink-400">{totalDeliverables}</div>
                    <div className="text-xs text-muted-foreground">Deliverables</div>
                  </div>
                </div>
              </div>

              {/* Miembros */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Members</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {members.map((member, index) => {
                    const contribution = Math.max(0, Math.min(10, member.peerReview ?? 7.5))
                    return (
                      <div
                        key={index}
                        className="bg-transparent backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          {/* Top row */}
                          <div className="flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                              <img
                                src={member.avatar || "/placeholder-user.jpg"}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-pink-500/50 to-cyan-500/50"
                                onError={onAvatarError}
                              />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background shadow-lg" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-lg font-bold text-white leading-tight mb-1">
                                    {member.name.split(" ")[0]}
                                  </h4>
                                  <p className="text-slate-200 text-sm font-medium mb-1">{member.role}</p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs">{countryToFlag(member.country)}</span>
                                    <span className="text-slate-300 text-xs font-medium">{member.timezone}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-1 bg-transparent px-3 py-2 rounded-lg">
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-300 text-2xl font-bold">{contribution.toFixed(1)}</span>
                                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                  </div>
                                  <span className="text-yellow-200 text-xs">peer review</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-cyan-400" />
                              <span>{Math.max(1, Math.round((member.workingTime || 0) / 60))}h active this week</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-3 w-3 text-pink-400" />
                              <span>{member.messagesSent ?? 0} messages sent</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-3 w-3 text-green-400" />
                              <span>{member.attendance ?? 0}% attendance</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-3 w-3 text-blue-400" />
                              <span>{member.deliverables ?? 0} deliverables</span>
                            </div>
                          </div>

                          {/* Contribution bar */}
                          <div className="bg-transparent rounded-lg p-3 border border-slate-600/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-300 text-xs font-medium">Contribución Observada</span>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-bold text-sm">
                                {contribution.toFixed(1)}
                              </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-pink-500 to-cyan-400 h-2 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${(contribution / 10) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Skills & Tools */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Skills & Tools Used</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {apiSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                          {skill}
                        </Badge>
                      ))}
                      {apiSkills.length === 0 && <span className="text-sm text-muted-foreground">—</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-secondary">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {apiTools.map((tool, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                          {tool}
                        </Badge>
                      ))}
                      {apiTools.length === 0 && <span className="text-sm text-muted-foreground">—</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deliverables + Repo */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Team Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {apiTeam.repositoryUrl && (
                    <div className="bg-transparent backdrop-blur-sm rounded-lg p-2 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-secondary/20 p-2 rounded-lg">
                            <ExternalLink className="h-4 w-4 text-secondary" />
                          </div>
                          <h4 className="font-medium text-sm">Repository</h4>
                        </div>
                        <a
                          href={apiTeam.repositoryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          title="Open repository"
                        >
                          <ExternalLink className="h-4 w-4 text-slate-400 hover:text-white" />
                        </a>
                      </div>
                    </div>
                  )}
                  {Array.from({ length: Math.max(apiTeam.totalDelivables - (apiTeam.repositoryUrl ? 1 : 0), 0) }).map(
                    (_, i) => (
                      <div
                        key={`auto-deliv-${i}`}
                        className="bg-transparent backdrop-blur-sm rounded-lg p-2 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <h4 className="font-medium text-sm">Deliverable #{i + 1}</h4>
                          </div>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors" disabled>
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <img
                      src={apiTeam.client?.logoUrl || "/placeholder.svg"}
                      alt={`${apiTeam.client?.name} logo`}
                      className="h-12 w-12 object-contain"
                      onError={onAvatarError}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Client Company</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{apiTeam.client?.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{apiTeam.client?.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Industry: {sector || "—"}</span>
                      <span>Size: {apiTeam.client?.size ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

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
            {/* Fin sidebar */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}