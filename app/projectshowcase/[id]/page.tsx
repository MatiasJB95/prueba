// app/projectshowcase/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import rawTeams from "@/app/data/teams.json";
import Header from "@/components/HeaderBrand";
import { Users, FileText, Video, Clock } from "lucide-react";
import React from "react"

// ---------- Tipos ----------
type Member = {
  id: string | number;
  name: string;
  country?: string;
  role: string;
  avatarUrl?: string;
  actividadHoras: number;
  entregables: number;
  reviews: number;
  rating: number;
};

type Metric = {
  label: string;
  value: string | number;
  sublabel?: string;
};

type Team = {
  id: string;
  name: string;
  company: string;
  description: string;
  members: Member[];
  metrics: Metric[];
  cover?: string;
  weeksLabel?: string;
  tags?: string[];
  tools?: string[];
  languages?: string[];
  skillNames?: string[];
};

// ---------- Utils ----------
const RatingPill = ({ value }: { value: number }) => (
  <div className="h-10 w-16 min-w-16 bg-gradient-to-b from-fuchsia-500/30 to-indigo-500/30 flex items-center justify-center text-base font-bold text-fuchsia-100 rounded-lg shadow-lg">
    {value}
  </div>
);

const toNumber = (x: any, def = 0) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : def;
};

const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const isValidImageSrc = (s: any): s is string => {
  if (typeof s !== "string") return false;
  const v = s.trim();
  if (!v || v === "-" || v === "—") return false;
  const fixed = v.startsWith("/public/") ? v.replace("/public", "") : v;
  return (
    fixed.startsWith("/") ||
    fixed.startsWith("http://") ||
    fixed.startsWith("https://") ||
    /^[a-zA-Z0-9._-]+$/.test(fixed)
  );
};

const fixLocalPublic = (s: string) => {
  let fixed = s.startsWith("/public/") ? s.replace("/public", "") : s;
  if (!fixed.startsWith("/") && !fixed.startsWith("http")) fixed = "/" + fixed;
  return fixed;
};

// ---- Normalizadores ----
function normalizeMember(m: any): Member {
  let avatar: string | undefined = undefined;
  if (isValidImageSrc(m?.avatarUrl)) {
    avatar = fixLocalPublic(m.avatarUrl.trim());
  }
  return {
    id: m?.id ?? Math.random(),
    name: String(m?.name ?? "Sin nombre"),
    country: m?.country ?? m?.pais ?? undefined,
    role: String(m?.role ?? m?.puesto ?? "Miembro"),
    avatarUrl: avatar,
    actividadHoras: toNumber(m?.actividadHoras, 0),
    entregables: toNumber(m?.entregables, 0),
    reviews: toNumber(m?.reviews, 0),
    rating: toNumber(m?.rating, 0),
  };
}

function normalizeMetric(x: any): Metric {
  return {
    label: String(x?.label ?? x?.nombre ?? "Métrica"),
    value: x?.value ?? x?.valor ?? 0,
    sublabel: x?.sublabel ?? x?.subtitulo ?? undefined,
  };
}

function normalizeTeam(t: any): Team {
  const membersArr = Array.isArray(t?.members) ? t.members.map(normalizeMember) : [];
  const metricsArr = Array.isArray(t?.metrics) ? t.metrics.map(normalizeMetric) : [];

  let cover: string | undefined = undefined;
  const rawCover = t?.cover ?? t?.portada;
  if (isValidImageSrc(rawCover)) {
    cover = fixLocalPublic(rawCover.trim());
  } else {
    cover = "/placeholder-logo.png";
  }

  const name = String(t?.name ?? t?.title ?? "Título de proyecto");
  const idStr = t?.id != null ? String(t.id) : slugify(name);

  return {
    id: idStr,
    name,
    company: String(t?.company ?? "NoCountry"),
    description: String(t?.description ?? ""),
    members: membersArr,
    metrics: metricsArr,
    cover,
    weeksLabel: t?.weeksLabel ?? "Proyecto de 5 semanas",
    tags: Array.isArray(t?.tags) ? t.tags.map(String) : [],
    tools: Array.isArray(t?.tools) ? t.tools.map(String) : [],
    languages: Array.isArray(t?.languages)
      ? t.languages.map(String)
      : Array.isArray(t?.skillNames)
      ? t.skillNames.map(String)
      : [],
    skillNames: Array.isArray(t?.skillNames) ? t.skillNames.map(String) : [],
  };
}

function getTeams(): Team[] {
  const data = rawTeams as unknown;
  if (Array.isArray(data)) return data.map(normalizeTeam);
  return [normalizeTeam(data)];
}

// ---- Helpers métricas ----
function findMetric(metrics: Metric[], keys: string[]): Metric | undefined {
  const norm = (s: unknown) => String(s ?? "").toLowerCase().trim();
  return metrics.find((m) => keys.some((k) => norm(m.label).includes(k)));
}

function metricNumber(v: unknown): string {
  const n = parseInt(String(v ?? "").replace(/[^0-9.-]/g, ""), 10);
  return Number.isFinite(n) ? String(n) : "0";
}

// ---------- Página ----------
type ParamsMaybePromise = { id: string } | Promise<{ id: string }>;

export default async function Page({ params }: { params: ParamsMaybePromise }) {
  // Soporta params síncrono o Promise (según versión/config de Next)
  const { id } =
    typeof (params as any)?.then === "function"
      ? await (params as Promise<{ id: string }>)
      : (params as { id: string });

  const teams = getTeams();
  const team =
    teams.find((t) => t.id === id) || teams.find((t) => slugify(t.name) === id);

  if (!team) return notFound();

  const {
    name,
    description,
    members = [],
    metrics = [],
    cover,
    weeksLabel,
    tags,
    skillNames,
    tools,
  } = team;

  const allLabels = [...(tags ?? []), ...(skillNames ?? []), ...(tools ?? [])].filter(
    (lbl) => lbl && lbl.trim() !== ""
  );

  return (
    <main>
      {/* Contenedor oscuro */}
      <div className="relative mx-auto max-w-6xl px-4 py-10 text-white bg-[hsl(220,70%,3.9%)] rounded-3xl shadow-xl">
        <Header />

        {/* Intro */}
        <section className="flex flex-col items-center justify-center text-center pt-12">
          <p className="text-xs uppercase tracking-wider text-white/70">{weeksLabel}</p>
          <h1 className="mt-2 text-5xl md:text-6xl font-extrabold text-white">{name}</h1>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-white/70">Para</span>
            <Image
              src="/nocountry-logo.png"
              alt="NoCountry"
              width={140}
              height={40}
              className="h-8 w-auto opacity-90"
              priority
            />
          </div>
        </section>

        {/* Portada */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 mb-8">
          <Image
            src={cover ?? "/Healthtech.png"}
            alt="Cover"
            width={1200}
            height={500}
            className="w-full h-[300px] object-cover"
            priority
          />
        </section>

        {/* Descripción + Etiquetas */}
        <section className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="mb-3 inline-block text-xl font-semibold">Descripción</h3>
            <p className="max-w-3xl text-white/80">{description}</p>
          </div>

          {allLabels.length > 0 && (
            <div>
              <h3 className="mb-3 inline-block text-xl font-semibold">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {allLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-white/10 px-3 py-1 text-sm text-white/80"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

<section className="py-6">
  <h3 className="text-xl font-semibold">Equipo y</h3>
  <h3 className="mb-6 text-xl font-semibold">Rendimiento</h3>

  {/* Header (misma grilla y paddings que el body) */}
  <div
    className="grid border-b border-white/12 px-6 py-3"
    style={{ gridTemplateColumns: "1fr 480px" }}
  >
    <div className="text-[11px] uppercase tracking-wide text-white/60">Talento</div>
    <div className="grid" style={{ gridTemplateColumns: "120px 120px 120px 120px" }}>
      <div className="text-[11px] uppercase tracking-wide text-white/80 text-center">Actividad</div>
      <div className="text-[11px] uppercase tracking-wide text-white/80 text-center">Entregables</div>
      <div className="text-[11px] uppercase tracking-wide text-white/80 text-center">Reviews</div>
      <div className="text-[11px] uppercase tracking-wide text-white/80 text-center">Rating</div>
    </div>
  </div>

  {/* Body con franja detrás de la col de Rating */}
  <div className="relative">
    {/* Franja continua: degradé horizontal, centrada en la col de 120px */}
    <div
      className="pointer-events-none absolute inset-y-0 z-0"
      style={{
        background: 'linear-gradient(to right, rgba(11, 58, 82, 0.5), rgba(106, 17, 77, 0.5))',
        width: "120px",
        left: "calc(100% - 120px)",
      }}
    />

    <div
      className="grid"
      style={{ gridTemplateColumns: "1fr 480px" }}
    >
      {members.map((m) => (
        <div key={m.id} className="contents">
          {/* Talento (alineado con header) */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-white/10 z-10">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10 shrink-0">
              {m.avatarUrl ? (
                <Image src={m.avatarUrl} alt={m.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
                  {m.name.slice(0, 1)}
                </div>
              )}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-base font-medium truncate">{m.name}</div>
              <div className="text-[12px] text-white/60 truncate">
                {m.country ? `de ${m.country} · ${m.role}` : m.role}
              </div>
            </div>
          </div>

          {/* Métricas: centradas y del mismo tamaño */}
          <div className="grid" style={{ gridTemplateColumns: "120px 120px 120px 120px" }}>
            <div className="text-center text-1xl font-semibold tabular-nums text-white/90 border-t border-white/10 py-4 z-10">
              {m.actividadHoras}
            </div>
            <div className="text-center text-1xl font-semibold tabular-nums text-white/90 border-t border-white/10 py-4 z-10">
              {m.entregables}
            </div>
            <div className="text-center text-1xl font-semibold tabular-nums text-white/90 border-t border-white/10 py-4 z-10">
              {m.reviews}
            </div>
            <div className="text-center text-1xl font-extrabold text-white border-t border-white/10 py-4 z-10 w-full bg-transparent">
              {m.rating}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* ===== Métricas del equipo (globales del JSON) ===== */}
        <section className="pt-8 mt-4">
          <h3 className="sr-only">Métricas del equipo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Tamaño de equipo */}
            {(() => {
              const m = findMetric(metrics, ["tamaño de equipo", "tamano de equipo", "team size"]);
              const val = metricNumber(m?.value);
              return (
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                  <div className="leading-tight text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 opacity-80" />
                    </div>
                    <div>Tamaño de equipo</div>
                  </div>
                </div>
              );
            })()}

            {/* Entregables totales */}
            {(() => {
              const m = findMetric(metrics, ["entregables", "deliverable"]);
              const val = metricNumber(m?.value);
              return (
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                  <div className="leading-tight text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 opacity-80" />
                    </div>
                    <div>Entregables totales</div>
                  </div>
                </div>
              );
            })()}

            {/* Reuniones totales */}
            {(() => {
              const m = findMetric(metrics, ["reuniones", "meetings"]);
              const val = metricNumber(m?.value);
              return (
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                  <div className="leading-tight text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4 opacity-80" />
                    </div>
                    <div>Reuniones totales</div>
                  </div>
                </div>
              );
            })()}

            {/* Tiempo total simulado (horas) */}
            {(() => {
              const m = findMetric(metrics, ["tiempo total", "horas", "simulado"]);
              const val = metricNumber(m?.value);
              const unit = (m?.sublabel ?? "").toString().toLowerCase().includes("hora")
                ? "horas"
                : "";
              return (
                <div className="flex items-center gap1">
                  <div className="text-3xl md:text-4xl font-semibold">
                    {val}
                    {unit && <span className="ml-1  text-xs font-normal">{unit}</span>}
                  </div>
                  <Clock className="leading-tight text-sm text-white/80">
                    <div>Tiempo total simulado</div>
                  </Clock>
                </div>
              );
            })()}
          </div >
        </section>

        {/* CTA full-width (full-bleed) dentro del contenedor */}
        <section className="relative mx-[calc(50%-50vw)] w-screen bg-white text-black py-16 px-6 md:px-12 mt-10 rounded-none">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                ¿Tenés un<br />
                desafío similar?
              </h3>
              <p className="text-gray-700 text-base md:text-lg max-w-md">
                Contanos sobre tu proyecto o desafío para que miles de talentos puedan
                proveer soluciones a tus desafíos particulares.
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-4 text-sm md:text-base">
              <p className="text-gray-600 text-center md:text-right">
                Si tenés alguna pregunta sobre tu proyecto, por favor{" "}
                <span className="font-semibold text-black">contactanos</span>
              </p>
              <button
                type="button"
                className="self-center md:self-end rounded-md px-6 py-3 font-medium text-white shadow-lg
                           bg-gradient-to-r from-sky-500 to-fuchsia-500 hover:opacity-90 transition"
              >
                Contanos sobre tu proyecto
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
