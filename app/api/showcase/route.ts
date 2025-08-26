import { NextResponse } from "next/server"

export async function GET() {
  try {
    const res = await fetch("http://localhost:8080/showcase", { cache: "no-store" })
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 })
  }
}