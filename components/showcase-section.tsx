"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// JSON local
import rawTeams from "@/app/data/teams.json";

const DEFAULT_COVER = "/placeholder-logo.png";
const PLACEHOLDER_AVATAR = "/placeholder-user.jpg";

const RANDOM_POOL_IDS = [10, 11, 13, 14, 15];
const PINNED_ID = 12;

type Member = { name: string; avatar: string };
type ShowcaseProject = {
  id: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  cover?: string;
  gradient?: string;
  tags: string[];
  sector: string;
  kind: string;
  deliverables: number;
  members: Member[];
  stats?: { label: string; value: string }[];
  sortKey: number;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const isValidSrc = (s: unknown): s is string =>
  typeof s === "string" &&
  s.trim() !== "" &&
  s !== "-" &&
  (s.startsWith("/") || s.startsWith("http://") || s.startsWith("https://"));

const toNum = (x: any, d = 0) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : d;
};

const parseDDMMYYYY = (s?: string | null): number | null => {
  if (!s) return null;
  const m = s.match(/^(\d{1,2})[\\/\-](\d{1,2})[\\/\-](\d{4})$/);
  if (!m) return null;
  const dd = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const yyyy = parseInt(m[3], 10);
  const date = new Date(yyyy, mm - 1, dd).getTime();
  return Number.isFinite(date) ? date : null;
};

const fixLocal = (s: string) => (s.startsWith("/public/") ? s.replace("/public", "") : s);

function mapJsonToProjects(json: any[]): ShowcaseProject[] {
  const arr = Array.isArray(json) ? json : [json];
  return arr.map((t) => {
    const idStr = t?.id != null ? String(t.id) : "proyecto";
    const title = String(t?.name ?? "Proyecto");

    const tags: string[] = Array.isArray(t?.tags) ? t.tags.map(String) : [];
    const sector: string = String(t?.sector ?? "Otro");
    const kind: string = String(t?.kind ?? (tags.length ? tags[0] : "Proyecto"));

    // portada
    let cover = t?.cover ?? t?.portada ?? DEFAULT_COVER;
    if (typeof cover === "string") {
      cover = fixLocal(cover);
      if (!isValidSrc(cover)) cover = DEFAULT_COVER;
    } else {
      cover = DEFAULT_COVER;
    }

    // miembros
    const membersRaw = Array.isArray(t?.members) ? t.members : [];
    const members: Member[] = membersRaw.map((m: any, i: number) => ({
      name: String(m?.name ?? `Miembro ${i + 1}`),
      avatar: isValidSrc(m?.avatarUrl) ? fixLocal(m.avatarUrl) : PLACEHOLDER_AVATAR,
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

export default function ShowcaseSection() {
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);

  useEffect(() => {
    const mapped = mapJsonToProjects(rawTeams as any);
    const byId = (id: number | string) =>
      mapped.find((t) => Number(t.id) === Number(id));
    const pinned = byId(PINNED_ID);
    const pool = RANDOM_POOL_IDS.map(byId).filter(Boolean) as ShowcaseProject[];
    const one = shuffleArray(pool).slice(0, 1);
    const selected: ShowcaseProject[] = [pinned, ...one].filter(Boolean) as ShowcaseProject[];
    setProjects(selected);
  }, []);

  return (
<section
      className="relative z-10 bg-[hsl(220,70%,3.9%)] overflow-hidden pt-[170px] min-[377px]:max-[1383px]:pt-[120px] md:pt-[120px] xl:pt-[120px] min-[1920px]:pt-[200px]"
      data-section="showcase"
    >
  {/* Contenedor con anchos fijos por breakpoint */}
  <div
    className="
      mx-auto w-full
      max-w-[312px]
      md:max-w-[608px]
      lg:max-w-[904px]
      xl:max-w-[1280px]
      min-[1920px]:max-w-[1680px]
    "
  >
    {/* Header con espaciado específico para móvil */}
    <div className="text-center">
      {/* Sin margin desde header */}
        <div>
          <p className="text-white text-sm font-light font-['DM_Sans'] leading-none mb-4">
            Últimos
          </p>
         <h2 className="text-stone-50 text-[3rem] font-bold font-['DM_Sans'] leading-tight mb-4">
           Proyectos destacados
         </h2>
         <p className="text-white text-base font-normal font-['DM_Sans'] leading-tight mb-8">
           Encontra los mejores proyectos de <span className="md:block">nuestra comunidad</span>
         </p>
       </div>
    </div>

    {/* Grid responsivo con espaciado específico */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
</section>
);
}

/* === Card de proyecto (copiada de page.tsx con ajustes para botones en móvil) === */
export function ProjectCard({ project }: { project: ShowcaseProject }) {
  const cover = project.cover || DEFAULT_COVER;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card"
    >
      <div className="h-full p-5 md:p-6 min-[1380px]:max-[1400px]:p-4 flex flex-col">
        {/* Imagen (16:9) */}
        <div className="-mx-5 -mt-5 md:-mx-6 min-[1380px]:max-[1400px]:-mx-4 min-[1380px]:max-[1400px]:-mt-4 rounded-t-xl overflow-hidden">
          <div className="relative w-full aspect-[16/9] min-[1380px]:max-[1400px]:aspect-[16/8]">
            <img src={cover} alt={`${project.title} cover`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* Etiquetas con especificaciones exactas */}
        <div className="mt-4 min-[1380px]:max-[1400px]:mt-3">
          <div className="flex items-center gap-2 flex-wrap max-[390px]:justify-center">
            {project.tags.slice(0, 2).map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-900 rounded-[99px] inline-flex justify-center items-center"
              >
                <span className="text-zinc-200 text-[0.8rem] font-normal font-['DM_Sans'] leading-tight">{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Título con margin 16px */}
        <h3 className="mt-4 min-[1380px]:max-[1400px]:mt-3 text-stone-50 text-[2rem] min-[1380px]:max-[1400px]:text-[1.75rem] font-semibold font-['DM_Sans'] leading-tight max-[390px]:text-center">
          {project.title}
        </h3>

        {/* Por + avatares 32x32 con margin 20px */}
        <div className="mt-5 min-[1380px]:max-[1400px]:mt-4">
          <div className="flex items-center gap-3 mb-5 min-[1380px]:max-[1400px]:mb-4 max-[390px]:flex-col max-[390px]:items-center min-[391px]:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-stone-50 text-sm font-medium font-['DM_Sans'] leading-none">Por</span>
              <div className="flex -space-x-2">
                {project.members.slice(0, 3).map((m, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border border-zinc-500 overflow-hidden" title={m.name}>
                    <img src={m.avatar || PLACEHOLDER_AVATAR} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {project.members.length > 3 && (
                  <div className="w-8 h-8 rounded-full border border-zinc-500 bg-black/60 text-white flex items-center justify-center text-[10px] font-bold">
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
            </div>
            
            {/* Botón con gradiente según especificación */}
            <Link href={`/team/${project.id}`} className="max-[390px]:block max-[390px]:w-full min-[391px]:inline-block">
              <div className="relative px-6 py-3 bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600 rounded-md flex justify-center items-center gap-2.5 max-[390px]:self-stretch min-[391px]:whitespace-nowrap">
                <div className="absolute inset-0.5 bg-gray-900 rounded-md"></div>
                <div className="relative z-10 w-full text-center text-stone-50 text-base font-semibold font-['DM_Sans'] leading-none min-[391px]:w-auto">Ver proyecto</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

