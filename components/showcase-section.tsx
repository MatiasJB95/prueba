"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// JSON local
import rawTeams from "@/app/data/teams.json";

const DEFAULT_COVER = "/placeholder-logo.png";
const PLACEHOLDER_AVATAR = "/placeholder-user.jpg";

const RANDOM_POOL_IDS = [10, 11, 13, 14, 15];
const PINNED_ID = 12;

type Member = { name: string; avatar: string };
type Team = {
  id: string;
  projectType: string;
  coverImage?: string;
  members: Member[];
  memberCount: number;
  roles: string[];
  deliverables: number;
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

function mapJsonToTeams(json: any[]): Team[] {
  const arr = Array.isArray(json) ? json : [json];
  return arr.map((t) => {
    const members: Member[] = Array.isArray(t.members)
      ? t.members.map((m: any) => ({
          name: String(m?.name ?? "Miembro"),
          avatar: isValidSrc(m?.avatarUrl) ? m.avatarUrl : PLACEHOLDER_AVATAR,
        }))
      : [];

    const coverRaw = t?.cover ?? t?.portada;
    const coverImage = isValidSrc(coverRaw) ? coverRaw : DEFAULT_COVER;

    const roles: string[] = Array.from(
      new Set(
        (Array.isArray(t.members) ? t.members : [])
          .map((m: any) => String(m?.role ?? "").trim())
          .filter(Boolean)
      )
    );

    const metricsRaw =
      (t as any)?.metrics ?? (t as any)?.metricas ?? (t as any)?.Metrics ?? [];
    const metricsArr = Array.isArray(metricsRaw) ? metricsRaw : [];
    const entregableMetric = metricsArr.find((x: any) => {
      const lbl = String(x?.label ?? x?.nombre ?? "").toLowerCase().trim();
      return lbl.includes("entregable") || lbl.includes("deliverable");
    });
    const deliverablesRaw =
      (t as any)?.deliverables ??
      (t as any)?.entregables ??
      entregableMetric?.value;
    const deliverables = (() => {
      const n = parseInt(String(deliverablesRaw ?? "").replace(/[^0-9.-]/g, ""), 10);
      return Number.isFinite(n) ? n : 0;
    })();

    return {
      id: String(t?.id ?? ""),
      projectType: String(t?.name ?? "Proyecto"),
      coverImage,
      members,
      memberCount: members.length,
      roles,
      deliverables,
    };
  });
}

export default function ShowcaseSection() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const mapped = mapJsonToTeams(rawTeams as any);
    const byId = (id: number | string) =>
      mapped.find((t) => Number(t.id) === Number(id));
    const pinned = byId(PINNED_ID);
    const pool = RANDOM_POOL_IDS.map(byId).filter(Boolean) as Team[];
    const one = shuffleArray(pool).slice(0, 1);
    const selected: Team[] = [pinned, ...one].filter(Boolean) as Team[];
    setTeams(selected);
  }, []);

  return (
<section
  className="relative z-10 bg-transparent overflow-hidden pb-2 md:pb-3 pt-[calc(120px+5rem+12px)]"
  data-section="showcase"
>
  {/* Contenedor con anchos fijos por breakpoint */}
  <div
    className="
      mx-auto w-full
      max-w-[312px]
      md:max-w-[688px]
      lg:max-w-[904px]
      xl:max-w-[1280px]
      min-[1920px]:max-w-[1680px]
    "
  >
    <div className="mb-20 w-fit mx-auto flex flex-col items-center text-center">
      {/* "Últimos" */}
      <span className="inline-flex leading-none text-stone-50 text-xl font-light font-['DM_Sans']">
        Últimos
      </span>

      <div className="mt-[1rem] flex flex-col items-center">
        <span className="inline-flex leading-none text-stone-50 text-6xl font-bold font-['DM_Sans']">
          Proyectos Destacados
        </span>

        <span className="inline-flex mt-[1.5rem] leading-none text-center text-stone-50 text-2xl font-normal font-['DM_Sans'] max-w-[24rem]">
          Encontra los mejores proyectos de nuestra comunidad
        </span>
      </div>
    </div>

    {/* Grid responsivo */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  </div>
</section>
);
}

type TeamCardProps = {
  team: Team;
};

function TeamCard({ team }: TeamCardProps) {
  const cover = team.coverImage || DEFAULT_COVER;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card h-[480px] md:h-[500px]">
      <div
        className="h-full p-5 md:p-6 flex flex-col cursor-pointer"
        onClick={() => (window.location.href = `/team/${team.id}`)}
      >
        {/* Imagen */}
        <div className="-mx-5 -mt-5 md:-mx-6 rounded-t-xl overflow-hidden">
          <div className="relative w-full aspect-[16/9] xl:w-[828px] xl:h-[465.75px] xl:mx-auto">
            <img
              src={cover}
              alt={`${team.projectType} cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith(DEFAULT_COVER)) img.src = DEFAULT_COVER;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

 {/* ===== Fila 1: Etiquetas (izq) + Entregables (der) ===== */}
<div className="mt-5 flex items-center justify-between gap-4">
  {/* Etiquetas (borde/píldora según Figma) */}
  <div className="flex items-center gap-2 flex-wrap">
    {Array.isArray(team.roles) &&
      team.roles.length > 0 &&
      team.roles.slice(0, 2).map((t, i) => (
        <span
          key={`role-${i}`}
          className="px-4 py-1 bg-gray-900 rounded-[99px] inline-flex justify-center items-center gap-2.5"
        >
          <span className="justify-start text-zinc-200 text-xl font-normal font-['DM_Sans']">
            {t}
          </span>
        </span>
      ))}
  </div>

  {/* Entregables (clases exactas de Figma) */}
  <div className="inline-flex items-center gap-2">
    <span className="text-stone-50 text-xl font-normal font-['DM_Sans'] leading-loose">
      Entregables:
    </span>
    <span className="text-stone-50 text-4xl font-bold font-['DM_Sans'] leading-10">
      {team.deliverables}
    </span>
  </div>
</div>

        {/* ===== Título (debajo) ===== */}
<h3 className="text-stone-50 text-4xl font-semibold font-['DM_Sans'] leading-10">
  {team.projectType}
</h3>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
          {/* Por + avatares redondos */}
<div className="flex items-center gap-3">
  <span className="text-stone-50 text-sm font-medium font-['DM_Sans'] leading-none">
    Por
  </span>
  <div className="flex -space-x-3">
    {team.members.slice(0, 5).map((m, i) => (
      <div
        key={i}
        className="w-9 h-9 rounded-full border border-zinc-500 overflow-hidden"
        title={m.name}
      >
        <img
          src={m.avatar || PLACEHOLDER_AVATAR}
          alt={m.name}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
    {team.members.length > 5 && (
      <div className="w-9 h-9 rounded-full border border-zinc-500 bg-black/60 text-white flex items-center justify-center text-[10px] font-bold">
        +{team.members.length - 5}
      </div>
    )}
  </div>
</div>

          {/* Botón con borde degradado */}
<Link href={`/team/${team.id}`} onClick={(e) => e.stopPropagation()}>
  {/* Degradé corregido: izquierda → derecha */}
<div className="rounded-md p-[1.5px] bg-gradient-to-r from-[#02BEED] via-[#646EF6] to-[#FF0094] hover:brightness-110 transition">
  <div className="px-6 py-3 bg-gray-900 rounded-md inline-flex justify-center items-center gap-2.5">
    <div className="text-stone-50 text-xl font-semibold font-['DM_Sans'] leading-tight">
      Ver proyecto
    </div>
  </div>
</div>
</Link>
        </div>
      </div>
    </div>
  );
}

