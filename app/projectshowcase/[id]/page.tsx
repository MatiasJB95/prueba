// app/projectshowcase/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import rawTeams from "@/app/data/teams.json";
import Header from "@/components/HeaderBrand";
import { Users, FileText, Video, Clock } from "lucide-react";
import React from "react";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import styles from "./other-projects.module.css";

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
const PLACEHOLDER_AVATAR = "/placeholder-user.jpg";

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

// ---- Mapper a ProjectCard ----
function teamToProject(t: Team): Project {
  const entregablesMetric = findMetric(t.metrics, ["entregables", "deliverable"]);
  const deliverables = parseInt(metricNumber(entregablesMetric?.value), 10);

  return {
    id: t.id,
    title: t.name,
    cover: t.cover,
    tags: t.tags ?? [],
    deliverables: Number.isFinite(deliverables) ? deliverables : 0,
    members: (t.members ?? []).map((m) => ({
      name: m.name,
      avatar: m.avatarUrl || PLACEHOLDER_AVATAR,
    })),
  } as Project;
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

  // Proyectos para las cards (excluye el actual)
  const projectsAll: Project[] = teams
    .filter((t) => t.id !== id && slugify(t.name) !== id)
    .map(teamToProject);

  // Selección aleatoria
const shuffled = [...projectsAll].sort(() => Math.random() - 0.5);
const pick3 = shuffled.slice(0, Math.min(3, shuffled.length));

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
        <section className="flex flex-col items-center justify-center text-center pt-20 pb-12">
          <p className="text-xs uppercase tracking-wider text-white/70">{weeksLabel}</p>
          <h1 className="mt-3 text-5xl md:text-6xl font-extrabold text-white">{name}</h1>

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
        <section className="relative overflow-hidden rounded-2xl border border-white/10 mt-12 mb-20">
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
  <div className="ml-0 md:ml-10 mt-4 md:mt-0">
    <div className="flex flex-wrap gap-2 justify-start md:justify-end md:max-w-[520px]">
      {allLabels.map((label) => (
        <span
          key={label}
          className="rounded-full border border-white px-4 py-1 text-sm text-white/80"
        >
          {label}
        </span>
      ))}
    </div>
  </div>
)}
        </section>

        {/* Equipo y Rendimiento */}
        <section className="py-6">
          <h3 className="text-xl font-semibold">Equipo y</h3>
          <h3 className="mb-6 text-xl font-semibold">Rendimiento</h3>

          {/* Header desktop */}
          <div
            className="hidden md:grid border-b border-white/12 px-6 py-3"
            style={{ gridTemplateColumns: "1fr 480px" }}
          >
            <div className="text-[11px] uppercase tracking-wide text-white/60">Talento</div>
            <div className="grid" style={{ gridTemplateColumns: "120px 120px 120px 120px" }}>
              <div className="text-[11px] uppercase tracking-wide text-white/80 text-center ml-10">Actividad</div>
              <div className="text-[11px] uppercase tracking-wide text-white/80 text-center ml-10">Entregables</div>
              <div className="text-[11px] uppercase tracking-wide text-white/80 text-center ml-10">Reviews</div>
              <div className="text-[11px] uppercase tracking-wide text-white/80 text-center ml-10">Rating</div>
            </div>
          </div>

          {/* Body desktop (con degradé) */}
          <div className="relative hidden md:block">
            <div
              className="pointer-events-none absolute inset-y-0 z-0"
              style={{
                background: "linear-gradient(to right, rgba(11, 58, 82, 0.5), rgba(106, 17, 77, 0.5))",
                width: "120px",
                left: "calc(100% - 120px)",
              }}
            />
            <div className="grid" style={{ gridTemplateColumns: "1fr 480px" }}>
              {members.map((m) => (
                <div key={m.id} className="contents">
                  {/* Talento */}
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

                  {/* Métricas */}
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

          {/* Header mobile */}
          <div className="block md:hidden border-b border-white/12 px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wide text-white/60">Talento</div>
              <div className="text-[11px] uppercase tracking-wide text-white/80">Rating</div>
            </div>
          </div>

          {/* Body mobile (solo rating) */}
          <div className="relative block md:hidden">
            {members.map((m) => (
              <div
                key={m.id}
                className="relative flex items-center justify-between border-t border-white/10 px-6 py-4"
              >
                {/* franja detrás del rating (fila) */}
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-24"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(11,58,82,0.5), rgba(106,17,77,0.5))",
                  }}
                />

                {/* Avatar + Nombre */}
                <div className="flex items-center gap-3 z-10">
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

                {/* Rating */}
                <div className="text-xl font-extrabold text-white z-10">{m.rating}</div>
              </div>
            ))}
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
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                    <Users className="h-4 w-4 opacity-80" />
                  </div>
                  <div className="leading-tight text-sm text-white/80 mt-1">Tamaño de equipo</div>
                </div>
              );
            })()}

            {/* Entregables totales */}
            {(() => {
              const m = findMetric(metrics, ["entregables", "deliverable"]);
              const val = metricNumber(m?.value);
              return (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                    <FileText className="h-4 w-4 opacity-80" />
                  </div>
                  <div className="leading-tight text-sm text-white/80 mt-1">Entregables totales</div>
                </div>
              );
            })()}

            {/* Reuniones totales */}
            {(() => {
              const m = findMetric(metrics, ["reuniones", "meetings"]);
              const val = metricNumber(m?.value);
              return (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                    <Video className="h-4 w-4 opacity-80" />
                  </div>
                  <div className="leading-tight text-sm text-white/80 mt-1">Reuniones totales</div>
                </div>
              );
            })()}

            {/* Tiempo total simulado (horas) */}
            {(() => {
              const m = findMetric(metrics, ["tiempo total", "horas", "simulado"]);
              const val = metricNumber(m?.value);
              const unit = (m?.sublabel ?? "").toString().toLowerCase().includes("hora") ? "horas" : "";

              return (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl md:text-4xl font-semibold">{val}</div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 opacity-80" />
                      {unit && <span className="text-sm text-white/80">{unit}</span>}
                    </div>
                  </div>
                  <div className="leading-tight text-sm text-white/80 mt-1">Tiempo total simulado</div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* CTA full-width (full-bleed) dentro del contenedor */}
        <section className="relative mx-[calc(50%-50vw)] w-screen bg-white text-black py-10 px-6 md:px-12 mt-10 rounded-none">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda */}
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                ¿Tenés un
                <br />
                desafío similar?
              </h3>
              <p className="text-gray-700 text-base md:text-lg max-w-md">
                Contanos sobre tu proyecto o desafío para que miles de talentos puedan
                proveer soluciones a tus desafíos particulares.
              </p>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col justify-between h-full md:items-end text-sm md:text-base">
              <p className="text-gray-600 text-center md:text-right">
                Si tenés alguna pregunta sobre tu <br /> proyecto, por favor{" "}
                <span className="font-semibold text-black underline">contactanos</span>
              </p>

              <a
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="self-center md:self-end w-full md:w-auto rounded-md px-10 py-3 font-medium text-white shadow-lg
                           bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center"
              >
                Contanos sobre tu proyecto
              </a>
            </div>
          </div>
        </section>

{/* Otros proyectos – 3 aleatorias; 3→2→1 según ancho automáticamente */}
<section className="relative mx-[calc(50%-50vw)] w-screen py-10 px-2">
  <div className="mx-auto max-w-[1320px] px-2">
    <header className="mb-4 md:mb-6">
      <span className="block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/70">
        Otros proyectos
      </span>
      <h3 className="mt-2 text-xl font-semibold text-white">
        Proyectos que<br /> podrían interesarte
      </h3>
    </header>

<div className={styles.row}>
  {pick3.map((p, i) => (
    <div
      key={p.id}
      className={
        i === 0
          ? ""                    // 1ª: siempre visible
          : i === 1
          ? "hidden lg:block"     // 2ª: solo desde lg (>=1024px)
          : "hidden xl:block"     // 3ª: solo desde xl (>=1280px)
      }
    >
      <ProjectCard project={p} />
    </div>
  ))}
</div>
  </div>
</section>
      </div>
    </main>
  );
}
