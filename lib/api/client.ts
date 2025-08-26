const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

// Helper de fetch con manejo básico de error
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store", ...init })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`)
  }
  return res.json() as Promise<T>
}