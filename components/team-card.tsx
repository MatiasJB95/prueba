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
      {/* Contenedor con borde degradado */}
      <div className="p-[2px] rounded-3xl bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600 h-full">
        {/* Contenedor interno que cubre el área interior */}
        <div className="h-full rounded-3xl bg-background overflow-hidden">
          <Card className="relative h-full flex flex-col overflow-hidden rounded-3xl bg-background/40 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 border-0">
            
            {/* Cover */}
            <div className="relative h-48 md:h-52 lg:h-56 xl:h-72 min-[1384px]:h-60 min-[1440px]:h-72 w-full flex-shrink-0 rounded-t-3xl overflow-hidden">
              <img
                src={
                  team.coverImage ||
                  `/placeholder.svg?height=400&width=600&query=${team.sector || "technology"}`
                }
                alt={`${team.projectName} cover`}
                className="h-full w-full object-cover object-center scale-110"
              />
            </div>

            {/* Franja inferior que se estira */}
            <div className="flex-1 flex items-center bg-black/35 px-5 pb-5 pt-4">
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {(team.tags ?? [])
                  .filter(Boolean)
                  .slice(0, 8)
                  .map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Link>
  )
}