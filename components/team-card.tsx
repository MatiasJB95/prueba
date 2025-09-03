import type { TeamType } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface TeamCardProps {
  team: TeamType
}


export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/team/${team.id}`} className="block h-full">
      <Card className="relative h-full flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-background/40 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105">
        
        {/* Cover fijo */}
        <div className="relative h-72 w-full flex-shrink-0">
          <img
            src={
              team.coverImage ||
              `/placeholder.svg?height=400&width=600&query=${team.sector || "technology"}`
            }
            alt={`${team.projectName} cover`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 backdrop-blur-[2px]" />

          {/* Título */}
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              {team.projectName}
            </h3>
          </div>

          {/* Avatares + subtítulo */}
          <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-2">
            <div className="flex -space-x-2">
              {team.members.slice(0, 4).map((m, i) => (
                <Avatar key={i} className="h-9 w-9 ring-2 ring-white/70 shadow">
                  <AvatarImage src={m.avatar || "/placeholder.svg"} alt={m.name} />
                  <AvatarFallback>{m.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
              {team.members.length > 4 && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[11px] font-semibold text-black ring-2 ring-white/70">
                  +{team.members.length - 4}
                </div>
              )}
            </div>
            <p className="text-xs md:text-sm text-white/85">
              Team of {team.memberCount ?? team.members.length} specialists
            </p>
          </div>
        </div>

        {/* Franja inferior que se estira */}
        <div className="flex-1 flex items-center border-t border-white/10 bg-black/35 px-5 pb-5 pt-4">
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {(team.members?.map(m => m.role) ?? [])
              .filter(Boolean)
              .slice(0, 8)
              .map((role, i) => (
                <span
                  key={`${role}-${i}`}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md"
                >
                  {role}
                </span>
              ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}