"use client"

import { TeamCard } from "@/components/team-card"
import { ShowcaseHeader } from "@/components/showcase-header"
import rawTeams from "@/app/data/teams.json"
import type { TeamType } from "@/lib/types"

// Función para mapear los datos del JSON al formato TeamType
function mapTeamsData(): TeamType[] {
  const teams = Array.isArray(rawTeams) ? rawTeams : [rawTeams]
  
  return teams
    .sort((a: any, b: any) => Number(b.id) - Number(a.id))
    .map((team: any) => {
    // Calcular participationRate basado en el rating promedio de los miembros
    const avgRating = team.members?.length > 0 
      ? team.members.reduce((sum: number, member: any) => sum + (member.rating || 0), 0) / team.members.length
      : 0
    
    // Mapear miembros al formato correcto
    const mappedMembers = team.members?.map((member: any) => ({
      name: member.name,
      role: member.role,
      avatar: member.avatarUrl?.replace('/public/', '/') || "/placeholder.svg"
    })) || []
    
    return {
      id: String(team.id),
      projectName: team.name,
      name: team.company || "NoCountry",
      description: team.description || "Descripción no disponible",
      category: team.sector || "Otro",
      sector: team.sector || "Otro",
      vertical: team.tags?.[0] || team.sector || "General",
      area: team.tags?.[1] || "Desarrollo",
      coverImage: team.portada?.replace('/public/', '/') || "/placeholder.svg",
      rating: avgRating / 10, // Convertir a escala 0-10
      participationRate: avgRating,
      isPremium: avgRating > 90, // Marcar como premium si el rating promedio es alto
      members: mappedMembers,
      memberCount: team.members?.length || 0,
      projectsCompleted: 1, // Valor por defecto
      successRate: avgRating // Usar el mismo valor que participationRate
    }
  })
}

export default function TeamsPage() {
  const teams = mapTeamsData()

  return (
  <div className="min-h-screen bg-background">
    {/* Elevar el header */}
    <div className="relative z-[90]">
      <ShowcaseHeader shareTitle="Teams" />
    </div>

    {/* Teams Section (queda tal cual la dejaste, con z-[60]) */}
    <div className="mt-[100px] min-[1440px]:mt-[120px] nc-shell py-8 relative isolate z-[60] text-foreground">
      <h1
        className="mb-8 text-2xl md:text-3xl font-bold tracking-tight [text-shadow:0_1px_1px_rgba(0,0,0,.6)]"
        style={{ fontFamily: 'DM Sans' }}
      >
        Equipos destacados
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  </div>
);

}