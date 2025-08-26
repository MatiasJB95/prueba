"use client"
import { use, useEffect, useMemo, useState } from "react"
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
  Building2,
  MessageSquare,
  Star,
  Share2,
  Copy,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react"
import { formatCountryWithFlag, guessIsoFromCountry } from "@/lib/country-utils"

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
// Utilidades
// ---------------------

const onImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const img = e.currentTarget
  if (!img.src.endsWith("/placeholder-user.jpg")) img.src = "/placeholder-user.jpg"
}

function coverBySector(sectorRaw: string | undefined) {
  const sector = (sectorRaw || "").toLowerCase().trim()
  const map: Record<string, string> = {
    crypto: "/interconnected-crypto-web3.png",
    fintech: "/modern-fintech-dashboard.png",
    healthtech: "/Healthtech.png",
    insurtech: "/connected-insurance-growth.png",
    retail: "/retail-ml-insights.png",
    edtech: "/connected-learning-journey.png",
  }
  return map[sector] ?? ""
}

function monthRangeLabel(monthYear?: string, weeks = 4) {
  if (!monthYear) return "—"
  const [y, m] = monthYear.split("-").map((n) => parseInt(n, 10))
  const start = new Date(y, m - 1, 1)
  const end = new Date(start)
  end.setDate(start.getDate() + weeks * 7)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  const s = fmt(start)
  const e = fmt(end)
  return s === e ? s : `${s} – ${e}`
}

function flagCdnUrlFromIso(iso?: string | null, w = 20) {
  if (!iso) return null
  const width = w
  const height = Math.round((w * 3) / 4)
  return `https://flagcdn.com/${width}x${height}/${iso.toLowerCase()}.png`
}

const capFirst = (s?: string) => (s && s.length > 0 ? s[0].toUpperCase() + s.slice(1) : s ?? "")

export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const [apiTeam, setApiTeam] = useState<ApiTeam | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Share UI
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
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
    }
    load()
    return () => {
      mounted = false
    }
  }, [id])

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
  const monthLabel = useMemo(
    () => monthRangeLabel(apiTeam?.monthYear, apiTeam?.weekProject ?? 4),
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

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : `https://example.com/team/${encodeURIComponent(String(id))}`
  const shareText = apiTeam?.client?.name ? `Check this team: ${apiTeam.client.name}` : "Check this team"

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isVerified) return null

  if (!apiTeam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-12">
            <p className="text-muted-foreground">No se encontró información del equipo.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* MAIN: aislamos y pintamos fondo sólido solo para esta página */}
      <main className="flex-1 relative isolate">
        {/* Overlay absoluto SOLO dentro del main (no tapa el header/footer) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "hsl(220 70% 3.9%)",
            zIndex: 2147483646, // muy alto para tapar cualquier nebulosa global
          }}
        />

        {/* Contenido por encima del overlay */}
        <div style={{ position: "relative", zIndex: 2147483647 }}>
          {/* Hero más compacto (sin cambiar zoom) */}
          <div className="relative h-36 md:h-48 w-full">
            <img
              src={cover || "/placeholder.svg"}
              alt={`${apiTeam.client?.name || "Team"} cover`}
              className="w-full h-full object-cover"
              onError={onImgError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-3">
              <div className="container">
                <Link
                  href="/showcase"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Teams
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{apiTeam.vertical}</Badge>
                  <Badge variant="outline">{sector}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="container py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna principal */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {apiTeam.vertical} - {sector}
                  </h1>
                  <div className="flex items-center gap-2 relative">
                    <span className="text-sm font-medium text-blue-400">{monthLabel}</span>

                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => setShareOpen((v) => !v)}
                        aria-haspopup="menu"
                        aria-expanded={shareOpen}
                        aria-label="Share Team"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Team
                      </Button>

                      {shareOpen && (
                        <div
                          className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg p-1 z-20"
                          role="menu"
                        >
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/40 text-sm"
                            onClick={copyLink}
                            role="menuitem"
                          >
                            <Copy className="h-4 w-4" />
                            {copied ? "Copied!" : "Copy link"}
                          </button>
                          <a
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/40 text-sm"
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
                              shareText
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                          >
                            <Twitter className="h-4 w-4" />
                            Share on X
                          </a>
                          <a
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/40 text-sm"
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                          >
                            <Linkedin className="h-4 w-4" />
                            Share on LinkedIn
                          </a>
                          <a
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/40 text-sm"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noreferrer"
                            role="menuitem"
                          >
                            <Facebook className="h-4 w-4" />
                            Share on Facebook
                          </a>
                        </div>
                      )}
                    </div>
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

                {/* Team Members */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Team Members</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {members.map((member, index) => {
                      const contribution = Math.max(0, Math.min(10, member.peerReview ?? 7.5))
                      const { label: countryLabel } = formatCountryWithFlag(member.country)
                      const iso = guessIsoFromCountry(member.country)
                      const flagUrl = flagCdnUrlFromIso(iso, 20)
                      const countryTwo = (iso?.toUpperCase() || countryLabel.slice(0, 2).toUpperCase())

                      return (
                        <div
                          key={index}
                          className="bg-transparent backdrop-blur-sm rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                        >
                          <div className="space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="relative flex-shrink-0">
                                <img
                                  src={member.avatar || "/placeholder-user.jpg"}
                                  alt={member.name}
                                  className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-pink-500/50 to-cyan-500/50"
                                  onError={onImgError}
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background shadow-lg"></div>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="text-lg font-bold text-white leading-tight mb-1">
                                      {member.name.split(" ")[0]}
                                    </h4>
                                    <p className="text-slate-200 text-sm font-medium mb-1">{member.role}</p>
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                      {flagUrl ? (
                                        <img
                                          src={flagUrl}
                                          alt={`${countryLabel} flag`}
                                          className="w-4 h-3 rounded-[2px] ring-1 ring-white/20"
                                          onError={(e) => {
                                            e.currentTarget.style.display = "none"
                                          }}
                                        />
                                      ) : (
                                        <span className="text-sm">🌍</span>
                                      )}
                                      <span className="text-slate-300 text-xs font-medium">{countryTwo}</span>
                                      <span className="text-slate-500 text-xs">•</span>
                                      <span className="text-slate-300 text-xs font-medium">{member.timezone}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1 bg-transparent px-3 py-2 rounded-lg">
                                    <div className="flex items-center gap-1">
                                      <span className="text-yellow-300 text-2xl font-bold">
                                        {contribution.toFixed(1)}
                                      </span>
                                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    </div>
                                    <span className="text-yellow-200 text-xs">peer review</span>
                                  </div>
                                </div>
                              </div>
                            </div>

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
                            {capFirst(skill)}
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
                            {capFirst(tool)}
                          </Badge>
                        ))}
                        {apiTools.length === 0 && <span className="text-sm text-muted-foreground">—</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* (Sección "Team Deliverables" eliminada como pediste) */}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-transparent rounded-lg p-6 border border-blue-500/20">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-3 shadow-sm bg-black/80 border border-slate-700">
                      <img
                        src={apiTeam.client?.logoUrl || "/placeholder.svg"}
                        alt={`${apiTeam.client?.name} logo`}
                        className="h-12 w-12 object-contain"
                        onError={onImgError}
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
                        <span>Size: {apiTeam.client?.size ? `${apiTeam.client.size} employees` : "—"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                  <h3 className="text-xl font-bold mb-4">Interested in This Team?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let us help you find and assign the perfect team for your specific project needs and requirements.
                  </p>

                  <div className="space-y-4 mb-6">
                    <Button className="w-full gradient-bg">Request Team Assignment</Button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-sm text-muted-foreground">Other Available Verticals</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Mobile Development", "Web3", "Machine Learning", "Customer Experience"].map((v) => (
                        <Button key={v} size="sm" variant="outline" type="button" className="text-xs">
                          {v}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Fin sidebar */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
