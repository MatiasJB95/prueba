"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

  const availableTags = useMemo(() => {
    const sectorIsAll = sector === DEFAULT_SECTOR || sector === "Todos";
    const typeIsAll = type === DEFAULT_TYPE || type === "Todos";
    if (sectorIsAll && typeIsAll) return [];
    const subset = PROJECTS.filter(
      (p) => (sectorIsAll || p.sector === sector) && (typeIsAll || p.kind === type)
    );
    const counts = new Map<string, number>();
    subset.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t);
  }, [PROJECTS, sector, type]);

  const activeFilters =
    (sector && sector !== DEFAULT_SECTOR && sector !== "Todos" ? 1 : 0) +
    (type && type !== DEFAULT_TYPE && type !== "Todos" ? 1 : 0) +
    (activeTags.length > 0 ? 1 : 0);

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
          className="
            relative z-10 mx-auto w-full
            max-w-[312px]
            md:max-w-[688px]
            lg:max-w-[904px]
            xl:max-w-[1280px]
            min-[1920px]:max-w-[1680px]
          "
        >
          {/* Encabezado (estilos Figma) */}
          <div className="mt-[-10px] mb-3">
            <div className="inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch text-stone-50 text-xl font-light font-['DM_Sans'] leading-tight">
                Todos los proyectos
              </div>

              <div className="w-96 text-stone-50 text-4xl font-semibold font-['DM_Sans'] leading-10">
                Proyectos de nuestra comunidad
              </div>
            </div>
          </div>

{/* Filtros */}
<div className="mt-[72px] w-full">
  <div className="flex items-center gap-4 w-full min-w-0">
    {/* IZQ: Selects (shrink-0 para que no se achiquen) */}
    <div className="flex items-center gap-4 shrink-0">
      {/* Sector */}
      <div className="relative pl-6 pr-8 py-3 bg-zinc-600 rounded-md flex items-center gap-3">
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="bg-transparent text-stone-50 text-base font-medium font-['DM_Sans'] appearance-none focus:outline-none cursor-pointer pr-6"
        >
          {ALL_SECTORS.map((s) => (
            <option key={s} value={s} className="text-black">
              {s}
            </option>
          ))}
        </select>
        {/* flecha */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.585l3.71-3.354a.75.75 0 1 1 1.02 1.1l-4.2 3.8a.75.75 0 0 1-1.02 0l-4.2-3.8a.75.75 0 0 1-.08-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Tipo de proyecto */}
      <div className="relative pl-6 pr-8 py-3 bg-zinc-600 rounded-md flex items-center gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-transparent text-stone-50 text-base font-medium font-['DM_Sans'] appearance-none focus:outline-none cursor-pointer pr-6"
        >
          {ALL_TYPES.map((t) => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>
        {/* flecha */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.585l3.71-3.354a.75.75 0 1 1 1.02 1.1l-4.2 3.8a.75.75 0 0 1-1.02 0l-4.2-3.8a.75.75 0 0 1-.08-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>

    {/* MID: Etiquetas (en la misma fila, con scroll horizontal si no entran) */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
        {(sector !== DEFAULT_SECTOR || type !== DEFAULT_TYPE) &&
          availableTags.length > 0 &&
          availableTags.map((t) => {
            const active = activeTags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setActiveTags((prev) =>
                    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                  )
                }
                className={[
                  "px-4 py-1 rounded-[99px] border inline-flex items-center flex-none transition-colors",
                  active
                    ? "bg-white/30 border-white/60 text-primary"
                    : "bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60",
                ].join(" ")}
                title={t}
              >
                <span className="text-stone-50 text-sm font-medium font-['DM_Sans'] leading-none">
                  {t}
                </span>
              </button>
            );
          })}
      </div>
    </div>

    {/* DER: Contador (borde degradé) + Limpiar (ruedita) */}
    <div className="flex items-center gap-4 shrink-0 ml-auto">
      {/* Contador con borde degradé */}
      <div className="rounded-md p-[1.5px] bg-[linear-gradient(90deg,#02BEED_0%,#646EF6_50%,#FF0094_100%)]">
        <div className="w-11 h-[42px] bg-[#0B0C14] rounded-md flex justify-center items-center">
          <span className="text-stone-50 text-base font-medium font-['DM_Sans']">
            {activeFilters}
          </span>
        </div>
      </div>

      {/* Limpiar filtros */}
      <button
        type="button"
        onClick={() => {
          setSector(DEFAULT_SECTOR);
          setType(DEFAULT_TYPE);
          setActiveTags([]);
        }}
        className="pl-6 pr-5 py-3 bg-zinc-600 rounded-md flex items-center gap-3"
      >
        <span className="text-stone-50 text-base font-medium font-['DM_Sans']">
          Limpiar filtros
        </span>
        <span className="inline-flex">
          {/* ruedita */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" aria-hidden="true">
            <path
              d="M2.5 10.5C2.5 11.9834 2.93987 13.4334 3.76398 14.6668C4.58809 15.9001 5.75943 16.8614 7.12987 17.4291C8.50032 17.9968 10.0083 18.1453 11.4632 17.8559C12.918 17.5665 14.2544 16.8522 15.3033 15.8033C16.3522 14.7544 17.0665 13.418 17.3559 11.9632C17.6453 10.5083 17.4968 9.00032 16.9291 7.62987C16.3614 6.25943 15.4001 5.08809 14.1668 4.26398C12.9334 3.43987 11.4834 3 10 3C7.90329 3.00789 5.89081 3.82602 4.38333 5.28333L2.5 7.16667M2.5 7.16667V3M2.5 7.16667H6.66667"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>


          {/* Grid de tarjetas (1 → 2 → 3 cols desde 1440px) */}
          <div
            className="
              relative z-10 mx-auto w-full mt-8
              max-w-[312px]
              md:max-w-[688px]
              lg:max-w-[904px]
              xl:max-w-[1280px]
              min-[1920px]:max-w-[1680px]
              grid grid-cols-1 lg:grid-cols-2 min-[1440px]:grid-cols-3
              gap-x-6 gap-y-[54px]
            "
          >
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* === Card de proyecto (estilos Figma aplicados) === */
export function ProjectCard({ project }: { project: ShowcaseProject }) {
  const cover = project.cover || DEFAULT_COVER;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card"
    >
      <div className="h-full p-5 md:p-6 flex flex-col">
        {/* Imagen (16:9; si querés forzar 828x465.75 en xl+, cambiar a xl:w-[828px] xl:h-[465.75px]) */}
        <div className="-mx-5 -mt-5 md:-mx-6 rounded-t-xl overflow-hidden">
          <div className="relative w-full aspect-[16/9]">
            <img src={cover} alt={`${project.title} cover`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* Fila 1: Etiquetas (izq) + Entregables (der) */}
        <div className="mt-5 flex items-center justify-between gap-4">
          {/* Etiquetas: píldoras negras con texto DM Sans xl */}
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.slice(0, 2).map((t, i) => (
              <span
                key={i}
                className="px-4 py-1 bg-gray-900 rounded-[99px] inline-flex justify-center items-center gap-2.5"
              >
                <span className="text-zinc-200 text-xl font-normal font-['DM_Sans'] leading-tight">{t}</span>
              </span>
            ))}
          </div>

          {/* Entregables exacto Figma */}
          <div className="inline-flex items-center gap-2">
            <span className="text-stone-50 text-xl font-normal font-['DM_Sans'] leading-loose">
              Entregables:
            </span>
            <span className="text-stone-50 text-4xl font-bold font-['DM_Sans'] leading-10">
              {project.deliverables}
            </span>
          </div>
        </div>

        {/* Título (exacto Figma) */}
        <h3 className="mt-2 text-stone-50 text-4xl font-semibold font-['DM_Sans'] leading-10">
          {project.title}
        </h3>

        {/* Footer: Por + avatares (redondos) + botón con borde degradé exacto */}
        <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-stone-50 text-sm font-medium font-['DM_Sans'] leading-none">Por</span>
            <div className="flex -space-x-3">
              {project.members.slice(0, 5).map((m, i) => (
                <div key={i} className="w-9 h-9 rounded-full border border-zinc-500 overflow-hidden" title={m.name}>
                  <img src={m.avatar || PLACEHOLDER_AVATAR} alt={m.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {project.members.length > 5 && (
                <div className="w-9 h-9 rounded-full border border-zinc-500 bg-black/60 text-white flex items-center justify-center text-[10px] font-bold">
                  +{project.members.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Botón con borde degradé (L→R: #02BEED → #646EF6 → #FF0094) */}
          <Link href={`/team/${project.id}`}>
            <div className="rounded-md p-[1.5px] bg-[linear-gradient(90deg,#02BEED_0%,#646EF6_50%,#FF0094_100%)] hover:brightness-110 transition">
              <div className="px-6 py-3 bg-gray-900 rounded-md inline-flex justify-center items-center gap-2.5">
                <span className="text-stone-50 text-xl font-semibold font-['DM_Sans'] leading-tight">
                  Ver proyecto
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
