"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, RotateCcw , Check } from "lucide-react";
import { ShowcaseHeader } from "@/components/showcase-header";
import ShowcaseSection from "@/components/showcase-section";
import rawTeams from "@/app/data/teams.json";


// Tipos
type Member = { name: string; avatar: string };
type ShowcaseProject = {
  id: string;                // usado para /projectshowcase/[id]
  title: string;             // team.name
  eyebrow?: string;          // texto corto arriba del título (usamos primeras tags)
  subtitle?: string;
  cover?: string;            // team.cover/portada
  gradient?: string;
  tags: string[];            // team.tags
  sector: string;            // team.sector
  kind: string;              // team.kind o 1er tag
  deliverables: number;      // métrica de "Entregables" si existe
  members: Member[];         // team.members
  stats?: { label: string; value: string }[];
  sortKey: number;           // para ordenar (fecha o id)
};

// Helpers
const DEFAULT_COVER = "/placeholder-logo.png";
const DEFAULT_SECTOR = "Sector";
const DEFAULT_TYPE = "Tipos de Proyectos";
const PLACEHOLDER_AVATAR = "/placeholder-user.jpg";

const toNum = (x: any, d = 0) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : d;
};

const parseDDMMYYYY = (s?: string | null): number | null => {
  if (!s) return null;
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (!m) return null;
  const dd = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const yyyy = parseInt(m[3], 10);
  const date = new Date(yyyy, mm - 1, dd).getTime();
  return Number.isFinite(date) ? date : null;
};

const isValidImageSrc = (v?: string) => {
  if (!v) return false;
  const s = v.trim();
  if (!s || s === "-" || s === "—") return false;
  return s.startsWith("/") || s.startsWith("http");
};

const fixLocal = (s: string) => (s.startsWith("/public/") ? s.replace("/public", "") : s);

const toSlug = (s: string) =>
  s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Mapear teams.json -> ShowcaseProject[]
function mapTeamsToProjects(): ShowcaseProject[] {
  const teams = (rawTeams as any[] | any) ?? [];
  const asArray = Array.isArray(teams) ? teams : [teams];

  return asArray.map((t) => {
    const idStr = t?.id != null ? String(t.id) : toSlug(String(t?.name ?? "proyecto"));
    const title = String(t?.name ?? "Proyecto");

    const tags: string[] = Array.isArray(t?.tags) ? t.tags.map(String) : [];
    const sector: string = String(t?.sector ?? "Otro");
    const kind: string = String(t?.kind ?? (tags.length ? tags[0] : "Proyecto"));

    // portada
    let cover = t?.cover ?? t?.portada ?? DEFAULT_COVER;
    if (typeof cover === "string") {
      cover = fixLocal(cover);
      if (!isValidImageSrc(cover)) cover = DEFAULT_COVER;
    } else {
      cover = DEFAULT_COVER;
    }

    // miembros
    const membersRaw = Array.isArray(t?.members) ? t.members : [];
    const members: Member[] = membersRaw.map((m: any, i: number) => ({
      name: String(m?.name ?? `Miembro ${i + 1}`),
      avatar: isValidImageSrc(m?.avatarUrl) ? fixLocal(m.avatarUrl) : PLACEHOLDER_AVATAR,
    }));

    // entregables desde métricas (si existe)
    let deliverables = 0;
    const metricsArr = Array.isArray(t?.metrics) ? t.metrics : [];
    const entregableMetric = metricsArr.find((x: any) =>
      String(x?.label ?? x?.nombre ?? "").toLowerCase().includes("entregable")
    );
    if (entregableMetric) {
      deliverables = toNum(entregableMetric.value, 0);
    }

    // eyebrow = primeras dos tags
    const eyebrow = tags.length > 0 ? tags.slice(0, 2).join("  ·  ") : undefined;

    // sortKey: priorizamos fecha dataTime (dd/mm/yyyy). Si no hay, usamos id numérico.
    const dateKey = parseDDMMYYYY(t?.dataTime);
    const idKey = toNum(t?.id, 0);
    const sortKey = dateKey ?? idKey;

    return {
      id: idStr,
      title,
      eyebrow,
      cover,
      tags,
      sector,
      kind,
      deliverables,
      members,
      stats: undefined,
      sortKey,
    };
  });
}

export default function CommunityProjectsPage() {
  const [showAllTags, setShowAllTags] = useState(false);

  const PROJECTS: ShowcaseProject[] = useMemo(() => {
    const list = mapTeamsToProjects();
    return [...list].sort((a, b) => b.sortKey - a.sortKey);
  }, []);
  

  const ALL_SECTORS = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => set.add(p.sector));
    return [DEFAULT_SECTOR, ...Array.from(set)];
  }, [PROJECTS]);

  const ALL_TYPES = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => set.add(p.kind));
    return [DEFAULT_TYPE, ...Array.from(set)];
  }, [PROJECTS]);

  // State de filtros
  const [sector, setSector] = useState<string>(DEFAULT_SECTOR);
  const [type, setType] = useState<string>(DEFAULT_TYPE);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered: ShowcaseProject[] = useMemo(() => {
    const sectorIsAll = sector === DEFAULT_SECTOR || sector === "Todos";
    const typeIsAll = type === DEFAULT_TYPE || type === "Todos";
    return PROJECTS.filter(
      (p) =>
        (sectorIsAll || p.sector === sector) &&
        (typeIsAll || p.kind === type) &&
        (activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t)))
    );
  }, [PROJECTS, sector, type, activeTags]);

  const uniqueTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [PROJECTS]);

  const availableTags = useMemo(() => {
  const sectorIsAll = sector === DEFAULT_SECTOR || sector === "Todos";
  const typeIsAll = type === DEFAULT_TYPE || type === "Todos";

  // Si ambos están en "todos", no mostramos etiquetas
  if (sectorIsAll && typeIsAll) return [];

  // Subconjunto filtrado SOLO por sector y tipo (SIN aplicar activeTags)
  const subset = PROJECTS.filter(
    (p) =>
      (sectorIsAll || p.sector === sector) &&
      (typeIsAll || p.kind === type)
  );

  // Ordenamos por frecuencia (más comunes primero)
  const counts = new Map<string, number>();
  subset.forEach((p) =>
    p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
  );

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);
}, [PROJECTS, sector, type]);

  return (
    <>
      <ShowcaseHeader />
      <ShowcaseSection />


{/* Comunidad debajo */}
<section
  className="relative z-10 bg-[hsl(220,70%,3.9%)] overflow-hidden pt-12 md:pt-16 pb-0 mt-[20px] mb-[80px]"
  data-section="community-projects"
>
  {/* Fondo local (estrellas y nebulas) */}
  <div className="absolute -left-16 -top-24 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
  <div className="absolute right-0 -bottom-24 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl" />
  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
  {[...Array(40)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
      }}
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1.2, 0.5] }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
      }}
    />
  ))}

  {/* Contenedor con anchos fijos por breakpoint */}
 <div
  className={`
    relative z-10 mx-auto w-full
    max-w-[312px]
    md:max-w-[688px]
    lg:max-w-[904px]
    xl:max-w-[1280px]
    min-[1920px]:max-w-[1680px]
  `}
>
    {/* Encabezado */}
    <div className="mt-6 mb-3">
<span className="eyebrow-tight block font-sans font-light text-[18px] leading-[1.05] tracking-[-0.45px] text-white mb-6">
  Todos los proyectos
</span>

<h1 className="heading-tight font-sans text-white text-[39px] font-semibold leading-[1.05] tracking-[-0.975px] mb-[60px]">
  Proyectos de
  <br />
  nuestra comunidad
</h1>
    </div>

{/* Filtros */}
<div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 dark-dropdown w-full">
  {/* Sector */}
<div className="relative">
  <select
    value={sector}
    onChange={(e) => setSector(e.target.value)}
    className={`
      flex items-center gap-3
      px-[24px] py-[12px]
      rounded-md
      bg-card/60 text-white border border-white/60 
      hover:bg-card/80 hover:border-white/80 shadow-sm appearance-none
      font-[400] text-[16px] tracking-[-0.16px] font-['DM Sans']
 `}
  >
    {ALL_SECTORS.map((s) => (
      <option key={s} value={s} className="text-black">
        {s}
      </option>
    ))}
  </select>
  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-white"
      aria-hidden="true"
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.2 3.8a.75.75 0 01-1.02 0l-4.2-3.8a.75.75 0 01-.08-1.06z" />
    </svg>
  </span>
</div>

  {/* Tipo de proyecto */}
<div className="relative">
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className={`
      flex items-center gap-3
      pl-[24px] pr-[40px] py-[12px]   /* 👈 más espacio a la derecha */
      rounded-[6px] border-[0.75px] border-white
      bg-card/60 text-white 
      hover:bg-card/80 hover:border-white/80 shadow-sm appearance-none
      font-[400] text-[16px] tracking-[-0.16px] font-['DM Sans']
    `}
  >
    {ALL_TYPES.map((t) => (
      <option key={t} value={t} className="text-black">
        {t}
      </option>
    ))}
  </select>
  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-white"
      aria-hidden="true"
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.2 3.8a.75.75 0 01-1.02 0l-4.2-3.8a.75.75 0 01-.08-1.06z" />
    </svg>
  </span>
</div>

  {/* Etiquetas dinámicas */}
  {(sector !== DEFAULT_SECTOR || type !== DEFAULT_TYPE) &&
    availableTags.length > 0 && (
      <div className="flex flex-wrap items-center gap-2">
        {availableTags.map((t) => {
          const active = activeTags.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() =>
                setActiveTags((prev) =>
                  prev.includes(t)
                    ? prev.filter((x) => x !== t)
                    : [...prev, t]
                )
              }
              className={[
                "px-3 py-1 text-[10px] sm:text-xs rounded-full border transition-colors",
                active
                  ? "bg-white/30 border-white/60 text-primary"
                  : "bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60",
              ].join(" ")}
              title={t}
            >
              {t}
            </button>
          );
        })}
      </div>
    )}

  {/* Limpiar */}
  <div className="w-full md:w-auto md:ms-auto">
<Button
  type="button"
  onClick={() => {
    setSector(DEFAULT_SECTOR);
    setType(DEFAULT_TYPE);
    setActiveTags([]);
  }}
  size="sm"
  variant="outline"
  className={`
    flex items-center justify-between gap-3
    h-[50px] px-[24px] 
    rounded-[6px] border-[0.75px] border-white
    bg-card/60 text-white 
    hover:bg-card/80 hover:border-white/80 shadow-sm
    font-['DM Sans'] text-[16px] font-[400] tracking-[-0.16px]
  `}
>
  <span className="text-white">Limpiar filtros</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M2.5 10.5C2.5 11.9834 2.93987 13.4334 3.76398 14.6668C4.58809 15.9001 5.75943 16.8614 7.12987 17.4291C8.50032 17.9968 10.0083 18.1453 11.4632 17.8559C12.918 17.5665 14.2544 16.8522 15.3033 15.8033C16.3522 14.7544 17.0665 13.418 17.3559 11.9632C17.6453 10.5083 17.4968 9.00032 16.9291 7.62987C16.3614 6.25943 15.4001 5.08809 14.1668 4.26398C12.9334 3.43987 11.4834 3 10 3C7.90329 3.00789 5.89081 3.82602 4.38333 5.28333L2.5 7.16667M2.5 7.16667V3M2.5 7.16667H6.66667"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Button>
  </div>
</div>

    {/* Grid de tarjetas (1 → 2 → 3 cols desde 1440px) */}
<div
  className={`
    relative z-10 mx-auto w-full mt-8
    max-w-[312px]
    md:max-w-[688px]
    lg:max-w-[904px]
    xl:max-w-[1280px]
    min-[1920px]:max-w-[1680px]
    grid grid-cols-1 lg:grid-cols-2 min-[1440px]:grid-cols-3
    gap-x-6 gap-y-[54px]
  `}
>
      {filtered.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  </div>

  <style jsx>{`
    .text-glow {
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.35), 0 0 14px rgba(0, 0, 0, 0.25);
    }
    .dark-dropdown select {
      color-scheme: dark;
    }
    .dark-dropdown select option,
    .dark-dropdown select optgroup {
      background-color: #000;
      color: #fff;
    }
    .clamp-2-lines {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
        .eyebrow-tight {
    leading-trim: both;
    text-edge: cap;
  }
  `}</style>
</section>

    </>
  );
}

export function ProjectCard({ project }: { project: ShowcaseProject }) {
  const cover = project.cover || DEFAULT_COVER

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card h-[520px]"
    >
      <div className="h-full p-5 md:p-6 flex flex-col">
        {/* Imagen */}
        <div className="-mx-5 -mt-5 md:-mx-6 rounded-t-xl overflow-hidden">
          <div className="relative h-72 md:h-80">
            <img src={cover} alt={`${project.title} cover`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex items-center justify-start gap-3">
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 2).map((t, i) => (
              <Badge
                key={i}
                variant="outline"
                className="px-3 py-1 text-[10px] sm:text-xs bg-white/20 border border-white/40 !text-white font-semibold
                           rounded-full backdrop-blur-0 shadow-md
                           transition-colors transition-transform duration-200
                           hover:!text-primary hover:bg-white/30 hover:border-white/60 hover:-translate-y-0.5 hover:scale-105"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

{/* ====== MOBILE (< md) ====== */}
<div className="md:hidden">
  {/* Título */}
  <h3 className="mt-3 text-left text-xl font-semibold text-foreground clamp-2-lines">
    {project.title}
  </h3>

  {/* Miembros debajo del título */}
  <div className="mt-4 flex items-center gap-3">
    <span className="text-xs text-white">Por:</span>
    <div className="flex -space-x-3 flex-wrap gap-y-2">
      {project.members.slice(0, 5).map((m, i) => (
        <div key={i} className="h-9 w-9 rounded-full border-2 border-background overflow-hidden shadow-md">
          <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
        </div>
      ))}
      {project.members.length > 5 && (
        <div className="h-9 w-9 rounded-full border-2 border-background bg-black/60 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
          +{project.members.length - 5}
        </div>
      )}
    </div>
  </div>

  <div className="flex-1" />

  {/* Abajo: Entregables (izq) + Botón (der) */}

<div className="pt-4 flex items-center justify-between gap-4">
  {/* Botón a la izquierda */}
  <Link href={`/team/${project.id}`} className="w-[48%]">
    <Button
      size="sm"
      variant="outline"
      className="h-[50px] w-full px-4 rounded-md bg-card/60 text-white border border-white/60 hover:bg-card/80 hover:border-white/80 shadow-sm justify-center"
    >
      Ver proyecto
    </Button>
  </Link>

  {/* Entregables a la derecha */}
  <div className="flex items-baseline gap-1">
    <span className="text-xs text-white/70">Entregables:</span>
    <span className="text-2xl font-bold text-white">{project.deliverables}</span>
  </div>
</div>
</div> 
{/* ====== DESKTOP (md+) — mantiene tu layout original ====== */}
<div className="hidden md:block">
  {/* Título + Entregables en fila (como antes) */}
  <div className="mt-3 flex items-center justify-between pr-2">
    <h3 className="text-left text-[28px] font-semibold text-foreground clamp-2-lines">
      {project.title}
    </h3>
<div className="flex items-baseline gap-1 -translate-x-2 pr-4 pl-5">
  <span className="text-xs text-white/70">Entregables:</span>
  <span className="text-2xl font-bold text-white">{project.deliverables}</span>
</div>
  </div>

  <div className="flex-1" />

  {/* Footer: Miembros (izq) + Botón (der) */}
  <div className="pt-4 flex items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <span className="text-xs text-white">Por:</span>
      <div className="flex -space-x-3">
        {project.members.slice(0, 5).map((m, i) => (
          <div key={i} className="h-9 w-9 rounded-full border-2 border-background overflow-hidden shadow-md">
            <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
          </div>
        ))}
        {project.members.length > 5 && (
          <div className="h-9 w-9 rounded-full border-2 border-background bg-black/60 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            +{project.members.length - 5}
          </div>
        )}
      </div>
    </div>

    <Link href={`/team/${project.id}`}>
      <Button
        size="sm"
        variant="outline"
        className="h-[50px] px-4 rounded-md bg-card/60 text-white border border-white/60 hover:bg-card/80 hover:border-white/80 shadow-sm"
      >
        Ver proyecto
      </Button>
    </Link>
  </div>
</div>

      </div>
    </motion.article>
  )
}