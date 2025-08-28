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
  className="relative z-10 bg-transparent overflow-hidden pb-2 md:pb-3 pt-[164px]"
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
      {/* Header del bloque (sin margen-top) */}
      <div className="mb-5 text-center">
        <div className="space-y-6">
          <span className="font-sans font-light text-[20px] leading-none tracking-[0.2em] text-white block m-0 p-0">
            Últimos
          </span>
          <h2 className="font-sans font-bold text-[34px] md:text-[48px] lg:text-[61px] leading-[1.1] mb-0">
            Proyectos Destacados
          </h2>
        </div>

        <p className="mt-9 mb-20 text-[25px] leading-[1.2] tracking-[-0.625px] text-center text-white font-normal">
          Encontra los mejores proyectos
          <br className="hidden sm:block" />
          de nuestra comunidad
        </p>
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
          <div className="relative h-64 md:h-72">
            <img
              src={cover}
              alt={`${team.projectType} cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                if (!img.src.endsWith(PLACEHOLDER_AVATAR)) img.src = PLACEHOLDER_AVATAR;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* Roles + título + entregables */}
        <div className="mt-5 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-y-2">
          <div className="flex gap-2 flex-wrap items-center">
            {Array.isArray(team.roles) &&
              team.roles.length > 0 &&
              team.roles.slice(0, 2).map((t, i) => (
                <Badge
                  key={"role-" + i}
                  variant="outline"
                  className="px-3 py-1 text-[10px] sm:text-xs bg-white/20 border border-white/40 !text-white font-semibold rounded-full backdrop-blur-0 shadow-md"
                >
                  {t}
                </Badge>
              ))}
          </div>

          <h3 className="row-start-2 col-start-1 text-left text-xl md:text-[22px] font-semibold text-foreground">
            {team.projectType}
          </h3>

          <div className="row-start-2 col-start-2 flex items-baseline gap-1 pr-7">
            <span className="text-xs text-white/70">Entregables:</span>
            <span className="text-2xl font-bold text-white">{team.deliverables}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white">Por:</span>
            <div className="flex -space-x-3">
              {team.members.slice(0, 5).map((m, i) => (
                <div key={i} className="h-9 w-9 rounded-full border-2 border-background overflow-hidden shadow-md">
                  <img
                    src={m.avatar || PLACEHOLDER_AVATAR}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {team.members.length > 5 && (
                <div className="h-9 w-9 rounded-full border-2 border-background bg-black/60 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                  +{team.members.length - 5}
                </div>
              )}
            </div>
          </div>

          <Link href={`/team/${team.id}`} onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 rounded-md bg-card/60 text-white border border-white/60 hover:bg-card/80 hover:border-white/80 shadow-sm"
            >
              Ver proyecto
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
