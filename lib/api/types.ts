export type ApiMember = {
  profilePhotoUrl: string
  name?: string
  lastName?: string
  role?: string
  country?: string
  timezone?: string
  reviewsReceivedCount?: number
  peerReview?: number
  attendence?: number
  userdeliverables?: number
  workingTime?: number
  menssagesSend?: number
}

export type ApiProjectItem = {
  id: number | string
  projectType: string
  numberMembers: number
  profilePhotoUrls?: string[]
  roles?: string[]
  sector: string
  vertical?: string
}

export type ApiTeamDetail = {
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
  monthYear?: string      // "YYYY-MM"
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

// Tipo que usan tus componentes de Showcase
export type Team = {
  id: string
  projectType: string
  sector: string
  vertical?: string
  memberCount: number
  coverImage?: string
  roles: string[]
  members: Array<{ avatar: string; name: string; role: string }>
}