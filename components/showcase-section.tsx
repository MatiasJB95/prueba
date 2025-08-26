"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"

// JSON local
import rawTeams from "@/app/data/teams.json"

const DEFAULT_COVER = "/placeholder-logo.png"
const PLACEHOLDER_AVATAR = "/placeholder-user.jpg"

const RANDOM_POOL_IDS = [10, 11, 13, 14, 15]
const PINNED_ID = 12

type Member = { name: string; avatar: string }
type Team = {
  id: string
  projectType: string
  coverImage?: string
  members: Member[]
  memberCount: number
  roles: string[]
  deliverables: number
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const isValidSrc = (s: unknown): s is string =>
  typeof s === "string" &&
  s.trim() !== "" &&
  s !== "-" &&
  (s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://"))

function mapJsonToTeams(json: any[]): Team[] {
  const arr = Array.isArray(json) ? json : [json]
  return arr.map((t) => {
    const members: Member[] = Array.isArray(t.members)
      ? t.members.map((m: any) => ({
          name: String(m?.name ?? "Miembro"),
          avatar: isValidSrc(m?.avatarUrl) ? m.avatarUrl : PLACEHOLDER_AVATAR,
        }))
      : []

    const coverRaw = t?.cover ?? t?.portada
    const coverImage = isValidSrc(coverRaw) ? coverRaw : DEFAULT_COVER

    const roles: string[] = Array.from(
      new Set(
        (Array.isArray(t.members) ? t.members : [])
          .map((m: any) => String(m?.role ?? "").trim())
          .filter(Boolean)
      )
    )

    const metricsRaw = (t as any)?.metrics ?? (t as any)?.metricas ?? (t as any)?.Metrics ?? []
    const metricsArr = Array.isArray(metricsRaw) ? metricsRaw : []
    const entregableMetric = metricsArr.find((x: any) => {
      const lbl = String(x?.label ?? x?.nombre ?? "").toLowerCase().trim()
      return lbl.includes("entregable") || lbl.includes("deliverable")
    })
    const deliverablesRaw =
      (t as any)?.deliverables ?? (t as any)?.entregables ?? entregableMetric?.value
    const deliverables = (() => {
      const n = parseInt(String(deliverablesRaw ?? "").replace(/[^0-9.-]/g, ""), 10)
      return Number.isFinite(n) ? n : 0
    })()

    return {
      id: String(t?.id ?? ""),
      projectType: String(t?.name ?? "Proyecto"),
      coverImage,
      members,
      memberCount: members.length,
      roles,
      deliverables,
    }
  })
}

export default function ShowcaseSection() {
  const visibleCards = 2
  const [teams, setTeams] = useState<Team[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mapped = mapJsonToTeams(rawTeams as any)
    const byId = (id: number | string) => mapped.find((t) => Number(t.id) === Number(id))
    const pinned = byId(PINNED_ID)
    const pool = RANDOM_POOL_IDS.map(byId).filter(Boolean) as Team[]
    const one = shuffleArray(pool).slice(0, 1)
    const selected: Team[] = [pinned, ...one].filter(Boolean) as Team[]
    setTeams(selected)
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    setShowLeftArrow(currentIndex > 0)
    setShowRightArrow(currentIndex < Math.max(teams.length - visibleCards, 0))
  }, [currentIndex, teams.length])

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget
    if (!img.src.endsWith(PLACEHOLDER_AVATAR)) img.src = PLACEHOLDER_AVATAR
  }

  const scrollToNext = () => {
    if (currentIndex < teams.length - visibleCards) setCurrentIndex((i) => i + 1)
  }
  const scrollToPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }

  const trackStyle = {
    transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${
      currentIndex * (24 / visibleCards)
    }px))`,
  } as React.CSSProperties

  return (
<section
  className=" pt-[10px] md:pt-[60px] relative z-10 pb-2 md:pb-3 bg-transparent overflow-hidden"
  data-section="showcase"
>
<div className="container relative z-10">
{/* Encabezado textual centrado */}
<div className="my-5 text-center">
  <span className="block text-[11px] md:text-xs uppercase tracking-[0.2em] text-white mb-1">
    Últimos
  </span>

  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
    Proyectos Destacados
  </h2>

  <p className="mt-1 text-[13px] md:text-sm text-white leading-snug">
    Encontra los mejores proyectos<br className="hidden sm:block" />
    de nuestra comunidad
  </p>
</div>

        <div className="relative group">
          <div className="overflow-hidden">
            <div className="container pl-6 md:pl-8 lg:pl-[2rem] xl:pl-12 pr-0">
              <div
                ref={scrollContainerRef}
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={trackStyle}
              >
{teams.map((team, index) => (
  <div
    key={team.id}
    className="flex-shrink-0"
    style={{
      width: `calc(${100 / visibleCards}% - ${((visibleCards - 1) * 24) / visibleCards}px)`,
    }}
  >
    {/* 👇 Solo mueve visualmente la card izquierda visible */}
    <div className={index === currentIndex ? "-translate-x-2 md:-translate-x-3 transform-gpu" : ""}>
      <TeamCard
        team={team}
        handleImgError={handleImgError}
        isActive={index >= currentIndex && index < currentIndex + visibleCards}
      />
    </div>
  </div>
))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type TeamCardProps = {
  team: Team
  handleImgError: React.ReactEventHandler<HTMLImageElement>
  isActive?: boolean
}

function TeamCard({ team, handleImgError, isActive = true }: TeamCardProps) {
  const cover = team.coverImage || DEFAULT_COVER

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card h-[480px] md:h-[500px] transition-opacity ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
    >
      <div
        className="h-full p-5 md:p-6 flex flex-col cursor-pointer"
        onClick={() => (window.location.href = `/team/${team.id}`)}
      >
        {/* Imagen */}
        <div className="-mx-5 -mt-5 md:-mx-6 rounded-t-xl overflow-hidden">
          <div className="relative h-64 md:h-72">
            <img
              src={cover}
              alt={`${team.projectType} cover`}
              className="w-full h-full object-cover"
              onError={handleImgError}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* Bloque de título/roles/entregables en grilla */}
        <div className="mt-5 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-y-2">
          {/* Fila 1, Col 1: Roles (etiquetas) */}
          <div className="flex gap-2 flex-wrap items-center ">
            {Array.isArray(team.roles) &&
              team.roles.length > 0 &&
              team.roles.slice(0, 2).map((t, i) => (
                <Badge
                  key={"role-" + i}
                  variant="outline"
                  className="px-3 py-1 text-[10px] sm:text-xs bg-white/20 border border-white/40 !text-white font-semibold rounded-full backdrop-blur-0 shadow-md"
                >
                  {t}
                </Badge>
              ))}
          </div>

          {/* Fila 2, Col 1: Título */}
          <h3 className="row-start-2 col-start-1 text-left text-xl md:text-[22px] font-semibold text-foreground">
            {team.projectType}
          </h3>

          {/* Fila 2, Col 2: Entregables (alineado con el título) */}
          <div className="row-start-2 col-start-2 flex items-baseline gap-1 pr-7">
            <span className="text-xs text-white/70">Entregables:</span>
            <span className="text-2xl font-bold text-white">{team.deliverables}</span>
          </div>
        </div>

        {/* Footer con autores y botón */}
        <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
          {/* Autores */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white">Por:</span>
            <div className="flex -space-x-3">
              {team.members.slice(0, 5).map((m, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-background overflow-hidden shadow-md"
                >
                  <img
                    src={m.avatar || PLACEHOLDER_AVATAR}
                    alt={m.name}
                    className="w-full h-full object-cover"
                    onError={handleImgError}
                  />
                </div>
              ))}
              {team.members.length > 5 && (
                <div className="h-9 w-9 rounded-full border-2 border-background bg-black/60 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                  +{team.members.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Botón */}
          <Link href={`/team/${team.id}`} onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 rounded-md bg-card/60 text-white border border-white/60 hover:bg-card/80 hover:border-white/80 shadow-sm"
            >
              Ver proyecto
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
