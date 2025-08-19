export interface TeamMember {
  name: string
  role: string
  avatar: string
}

export interface TeamType {
  id: string
  name: string
  description: string
  category: string
  coverImage: string
  rating: number
  memberCount: number
  projectsCompleted: number
  successRate: number
  isPremium: boolean
  institution?: string
  members: TeamMember[]
  // New fields
  projectName: string
  area: string
  sector: string
  vertical: string
  participationRate: number
}
