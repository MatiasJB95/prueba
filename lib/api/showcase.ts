import { fetchJson } from "./client"
import type { ApiProjectItem, ApiTeamDetail } from "./types"

export async function fetchShowcase(): Promise<ApiProjectItem[]> {
  const data = await fetchJson<ApiProjectItem[] | ApiProjectItem>("/showcase")
  return Array.isArray(data) ? data : [data]
}

export async function fetchTeamDetail(id: string | number): Promise<ApiTeamDetail> {
  return fetchJson<ApiTeamDetail>(`/showcase/team/${id}`)
}