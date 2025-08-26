import type { ApiProjectItem, ApiTeamDetail, Team } from "./api/types"

// Portada por sector (case-insensitive) desde /public
export function coverBySector(sectorRaw?: string): string | undefined {
  const s = (sectorRaw || "").toLowerCase().trim()
  const map: Record<string, string> = {
    crypto: "/interconnected-crypto-web3.png",
    fintech: "/modern-fintech-dashboard.png",
    healthtech: "/Healthtech.png",
    insurtech: "/connected-insurance-growth.png",
    retail: "/retail-ml-insights.png",
    edtech: "/connected-learning-journey.png",
  }
  return map[s]
}

// Ensambla miembros (avatar+rol) para la tarjeta del carrusel
function buildMembersForCard(item: ApiProjectItem): Team["members"] {
  const avatars = item.profilePhotoUrls ?? []
  const roles = item.roles ?? []
  const len = Math.max(avatars.length, roles.length, item.numberMembers)

  return Array.from({ length: len }).map((_, i) => {
    const raw = (avatars[i] || "").trim()
    const avatar = raw ? raw : "/placeholder-user.jpg"
    const role = roles[i] || roles[0] || "Member"
    return { avatar, name: role, role }
  })
}

// ---- Mappers públicos ----

// Lista (Showcase)
export function mapApiToTeams(input: ApiProjectItem[] | ApiProjectItem): Team[] {
  const list = Array.isArray(input) ? input : [input]
  return list.map((it) => ({
    id: String(it.id),
    projectType: it.projectType,
    sector: it.sector,
    vertical: it.vertical,           // si la API lo envía; si no, queda undefined
    memberCount: it.numberMembers,
    coverImage: coverBySector(it.sector),
    roles: it.roles ?? [],
    members: buildMembersForCard(it),
  }))
}

// (Opcional) Detalle -> si quisieras normalizar algo antes de usar en /team/[id]
export function mapDetailForUi(detail: ApiTeamDetail) {
  return {
    ...detail,
    coverImage: coverBySector(detail.client?.sector),
    members: detail.members.map((m) => ({
      ...m,
      profilePhotoUrl: (m.profilePhotoUrl && m.profilePhotoUrl.trim()) || "/placeholder-user.jpg",
    })),
  }
}