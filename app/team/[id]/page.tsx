import Image from "next/image";
import { notFound } from "next/navigation";
import rawTeams from "@/app/data/teams.json";
import { ShowcaseHeader } from "@/components/HeaderBrand";
import { Users, FileText, Video, Clock } from "lucide-react";
import React from "react";
import { TeamCard } from "@/components/team-card";
import type { TeamType } from "@/lib/types";
import { countryToFlag } from "@/lib/country-utils";

// ---------- Tipos ----------
type Member = {
  id: string | number;
  name: string;
  country?: string;
  role: string;
  avatarUrl?: string;
  simulations: number;
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
  dataTime?: string;
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
    simulations: toNumber(m?.simulations, 0),
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
  const membersArr = Array.isArray(t?.members)
    ? t.members.map(normalizeMember)
    : [];
  const metricsArr = Array.isArray(t?.metrics)
    ? t.metrics.map(normalizeMetric)
    : [];

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
    dataTime: String(t?.dataTime ?? ""),
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

function teamToTeamType(t: Team): TeamType {
  // Calcular participationRate basado en el rating promedio de los miembros
  const avgRating = t.members?.length > 0 
    ? t.members.reduce((sum: number, member: any) => sum + (member.rating || 0), 0) / t.members.length
    : 0;
  
  // Mapear miembros al formato correcto
  const mappedMembers = t.members?.map((member: any) => ({
    name: member.name,
    role: member.role,
    avatar: member.avatarUrl?.replace('/public/', '/') || "/placeholder.svg"
  })) || [];
  
  return {
    id: String(t.id),
    projectName: t.name,
    name: t.company || "NoCountry",
    description: t.description || "Descripción no disponible",
    category: t.tags?.[0] || "Otro",
    sector: t.tags?.[0] || "Otro",
    vertical: t.tags?.[0] || "General",
    area: t.tags?.[1] || "Desarrollo",
    coverImage: t.cover?.replace('/public/', '/') || "/placeholder.svg",
    tags: t.tags || [],
    rating: avgRating / 10, // Convertir a escala 0-10
    participationRate: avgRating,
    isPremium: avgRating > 90, // Marcar como premium si el rating promedio es alto
    members: mappedMembers,
    memberCount: t.members?.length || 0,
    projectsCompleted: 1, // Valor por defecto
    successRate: avgRating // Usar el mismo valor que participationRate
  };
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
  const team = teams.find((t) => t.id === id) || teams.find((t) => slugify(t.name) === id);

  if (!team) return notFound();

  // Equipos para las cards (excluye el actual)
  const teamsAll: TeamType[] = teams
    .filter((t) => t.id !== id && slugify(t.name) !== id)
    .map(teamToTeamType);

  // Selección aleatoria
  const shuffledTeams = [...teamsAll].sort(() => Math.random() - 0.5);
  const pick3Teams = shuffledTeams.slice(0, Math.min(4, shuffledTeams.length));

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
    (lbl) => lbl && lbl.trim() !== "",
  );

  return (
    <main>
      {/* Contenedor oscuro */}
      <div className="relative mx-auto w-full mt-[50px] text-white bg-[hsl(220,70%,3.9%)] rounded-3xl shadow-xl max-w-[375px] px-8 pt-[36px] pb-[16px] md:max-w-[768px] md:px-10 md:pt-[36px] md:pb-[16px] lg:max-w-[1024px] lg:px-[60px] lg:pt-[36px] lg:pb-[16px] min-[1384px]:max-w-[1344px] min-[1384px]:px-[60px] min-[1440px]:max-w-[1280px] min-[1440px]:px-0 min-[1440px]:pt-[36px] min-[1440px]:pb-[16px] min-[1920px]:max-w-[1680px] min-[1920px]:px-0 min-[1920px]:pt-[36px] min-[1920px]:pb-[16px] snap-y snap-mandatory">
        <ShowcaseHeader shareTitle={name} />

        <section className="relative snap-start mt-6">
          {/* Wrapper con dimensiones fijas para diferentes breakpoints */}
          <div className="relative w-[311px] h-[175px] md:w-[500px] md:h-[340px] min-[768px]:w-[680px] min-[768px]:h-[412px] min-[1024px]:w-[905.56px] min-[1024px]:h-[539.38px] min-[1384px]:w-[1224px] min-[1384px]:h-[592px] min-[1440px]:w-[1280px] min-[1440px]:h-[732px] min-[1920px]:w-[1680px] min-[1920px]:h-[912px] rounded-2xl overflow-hidden mx-auto">
            {/* IMAGEN: se ajusta al contenedor sin recortar */}
            <Image
               src={cover || "/placeholder.jpg"}
               alt="Cover"
               fill
               className="object-cover"
               priority
               sizes="(max-width: 768px) 311px, 100vw"
             />

              {/* TÍTULO EN OVERLAY */}
              <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center text-center pt-3 md:pt-4">
                <div className="text-white font-['DM_Sans'] text-[clamp(14px,1.2vw,16px)] leading-normal bg-black/50 px-2 py-1 rounded">
                  {team.dataTime || "Fecha no disponible"}
                </div>
              </div>
            </div>
        </section>

        {/* Descripción + Etiquetas */}
        <section className="pt-10 pb-0 mb-0 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 items-start">
          {/* Descripción (2/3) */}
          <div className="md:col-span-2 min-w-0">
            <div className="self-stretch justify-start text-white text-2xl font-semibold font-['DM_Sans'] leading-relaxed">Visión del Proyecto</div>
            <div className="self-stretch justify-start text-zinc-400 text-base font-normal font-['DM_Sans'] leading-tight">{description}</div>
          </div>

          {/* Etiquetas (1/3) */}
          {allLabels.length > 0 && (
            <div className="ml-0 md:ml-0 mt-4 md:mt-0 min-w-0">
              <div className="flex flex-wrap gap-2 justify-start md:justify-end md:max-w-none">
                {allLabels.map((label, index) => (
                  <div key={index} className="p-[1px] rounded-full bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600">
                    <span className="block rounded-full bg-background/40 px-4 py-1 text-sm text-white/90 backdrop-blur-md">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Equipo y Rendimiento */}
        <section className="pt-0 pb-6">
          <div className="mt-[60px] mb-8 justify-start text-white text-2xl font-semibold font-['DM_Sans'] leading-7">
            Equipo y Rendimiento
          </div>

          {/* ===== Header desktop (md+) sin degradé, Reviews solo en xl+ ===== */}
          <div className="hidden md:grid border-b border-white/12 py-3 px-6 [grid-template-columns:minmax(0,1fr)_120px_120px_120px] xl:[grid-template-columns:minmax(0,1fr)_120px_120px_120px_120px] min-[1384px]:[grid-template-columns:minmax(0,1fr)_140px_140px_140px_140px] min-[1440px]:[grid-template-columns:minmax(0,1fr)_160px_160px_160px_160px]">
            <div className="text-white font-['DM Sans'] text-[16px] font-[600] leading-[130%] tracking-[-0.16px] ml-2">
              Talento
            </div>
            <div className="text-white text-center font-['DM Sans'] text-[14px] font-[600] leading-[130%] tracking-[-0.16px] ml-10">
              Rol
            </div>
            <div className="text-white text-center font-['DM Sans'] text-[14px] font-[600] leading-[130%] tracking-[-0.16px] ml-10">
              Ubicación
            </div>
            <div className="hidden xl:block text-white text-center font-['DM Sans'] text-[14px] font-[600] leading-[130%] tracking-[-0.16px] ml-10">
              Reviews
            </div>
            <div className="text-white text-center font-['DM Sans'] text-[14px] font-[600] leading-[130%] tracking-[-0.16px] ml-10">
              Rating
            </div>
          </div>

          {/* Body desktop (con degradé SIEMPRE visible) */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Degradé anclado a la última columna (Rating) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-[120px] min-[1384px]:w-[140px] min-[1440px]:w-[160px] z-0 rounded-md bg-gradient-to-r from-[rgba(11,58,82,0.45)] to-[rgba(106,17,77,0.45)]"
              />
              {/* 👉 Grid externo: 1fr + métricas (360px en md, 480px en xl) */}
              <div className="grid relative z-10 md:[grid-template-columns:minmax(0,1fr)_360px] xl:[grid-template-columns:minmax(0,1fr)_480px] min-[1384px]:[grid-template-columns:minmax(0,1fr)_560px] min-[1440px]:[grid-template-columns:minmax(0,1fr)_640px]">
                {members.map((m) => (
                  <div key={m.id} className="contents">
                    {/* Talento */}
                    <div className="flex items-center gap-3 px-6 py-4 border-t border-white/10 min-h-[80px]">
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
                      </div>
                    </div>

                    {/* 👉 Métricas: 3 cols en md, 4 cols en xl */}
                    <div className="grid md:[grid-template-columns:120px_120px_120px] xl:[grid-template-columns:120px_120px_120px_120px] min-[1384px]:[grid-template-columns:140px_140px_140px_140px] min-[1440px]:[grid-template-columns:160px_160px_160px_160px]">
                      {/* Rol */}
                      <div className="flex flex-col items-center justify-center text-center text-sm font-medium text-white/90 border-t border-white/10 py-4 px-2 min-h-[80px]">
                        <div className="truncate text-cyan-400">{m.role}</div>
                      </div>
                      {/* Ubicación */}
                      <div className="flex flex-col items-center justify-center text-center text-sm font-medium text-white/90 border-t border-white/10 py-4 px-2 min-h-[80px]">
                        <div className="truncate">{m.country || 'N/A'}</div>
                        <div className="mt-1 flex justify-center">
                           {(() => {
                             const countryFlags: Record<string, string> = {
                               'Argentina': 'https://flagcdn.com/24x18/ar.png',
                               'Ecuador': 'https://flagcdn.com/24x18/ec.png',
                               'Panama': 'https://flagcdn.com/24x18/pa.png',
                               'Colombia': 'https://flagcdn.com/24x18/co.png',
                               'Chile': 'https://flagcdn.com/24x18/cl.png',
                               'Peru': 'https://flagcdn.com/24x18/pe.png',
                               'Mexico': 'https://flagcdn.com/24x18/mx.png',
                               'Venezuela': 'https://flagcdn.com/24x18/ve.png',
                               'Uruguay': 'https://flagcdn.com/24x18/uy.png',
                               'Paraguay': 'https://flagcdn.com/24x18/py.png',
                               'Bolivia': 'https://flagcdn.com/24x18/bo.png',
                               'Brasil': 'https://flagcdn.com/24x18/br.png',
                               'Brazil': 'https://flagcdn.com/24x18/br.png'
                             };
                             const flagUrl = countryFlags[m.country || ''];
                             return flagUrl ? (
                               <img 
                                 src={flagUrl} 
                                 alt={`${m.country} flag`}
                                 className="w-6 h-4 object-cover rounded-sm"
                                 loading="lazy"
                               />
                             ) : (
                               <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center text-xs">?</div>
                             );
                           })()} 
                         </div>
                      </div>
                      {/* Reviews (oculto en md–lg para que no exista la columna) */}
                      <div className="hidden xl:flex xl:flex-col xl:items-center xl:justify-center text-center text-1xl font-semibold tabular-nums text-white/90 border-t border-white/10 py-4 min-h-[80px]">
                        {m.reviews}
                      </div>
                      {/* Rating: última columna siempre visible (3ra en md, 4ta en xl) */}
                      <div className="flex items-center justify-center text-center text-2xl font-extrabold text-white border-t border-white/10 py-4 min-h-[80px]">
                        {m.rating}<span className="text-sm font-normal"> /100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Header mobile (<md) ===== */}
          <div className="md:hidden border-b border-white/10 px-4 sm:px-6 py-2">
            <div className="grid grid-cols-[1fr_auto] items-center">
              <div className="text-white font-['DM Sans'] text-[16px] font-[600] leading-[130%] tracking-[-0.16px]">
                Talento
              </div>
              <div className="text-white font-['DM Sans'] text-[16px] font-[600] leading-[130%] tracking-[-0.16px] text-right">
                Rating
              </div>
            </div>
          </div>

          {/* Body mobile (rating con franja completa) */}
          <div className="relative md:hidden">
            {/* Degradé fijo a la derecha, ocupa toda la altura de las filas */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[96px] sm:w-[110px] bg-gradient-to-r from-[rgba(11,58,82,0.45)] to-[rgba(106,17,77,0.45)]"
            />
            <div className="relative z-10">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-white/10 px-4 sm:px-6 py-4"
                >
                  {/* Avatar */}
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10 shrink-0 max-[360px]:h-8 max-[360px]:w-8">
                    {m.avatarUrl ? (
                      <Image src={m.avatarUrl} alt={m.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
                        {m.name.slice(0, 1)}
                      </div>
                    )}
                  </div>

                  {/* Talento: País en una línea y Rol debajo (si hay país) */}
                  <div className="min-w-0 leading-tight">
                    <div className="text-base font-medium truncate">{m.name}</div>
                    <div className="text-[12px] text-white/60">
                      {m.country ? (
                        <>
                          <span className="inline">de {m.country} - </span>
                          <span className="inline text-cyan-400">{m.role}</span>
                        </>
                      ) : (
                        <span className="inline text-cyan-400">{m.role}</span>
                      )}
                    </div>
                  </div>

                  {/* Rating (columna derecha sobre el degradé) */}
                  <div className="text-2xl max-[360px]:text-xl font-extrabold text-white text-right w-[96px] sm:w-[110px]">
                    {m.rating}<span className="text-sm font-normal"> /100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Métricas del equipo */}
        <section className="w-full flex justify-center items-center py-10">
          <div className="max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-12 px-4">
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
          </div>
        </section>

        {/* CTA full-width (full-bleed) dentro del contenedor */}
        <section className="relative mx-[calc(50%-50vw)] w-screen bg-white text-black py-[52px] px-6 md:px-12 mt-[60px] rounded-none">
          <div className="mx-auto max-w-[311px] md:max-w-[689px] lg:max-w-[904px] xl:max-w-[1280px] min-[1384px]:max-w-[1224px] min-[1440px]:max-w-[1280px] min-[1920px]:max-w-[1680px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda */}
            <div>
              <h3 className="text-black font-['DM_Sans'] text-[39px] font-semibold leading-[110%] tracking-[-0.975px] mb-8">
                ¿Enfrentás  <br /> un reto similar?
              </h3>

              <p className="text-[#5E5E5E] font-['DM_Sans'] text-[23px] font-normal leading-[105%] tracking-[-0.23px] max-w-md">
               Compartí con nosotros tu iniciativa y permití que miles de talentos aporten soluciones innovadoras y adaptadas a tu caso.
              </p>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col md:items-end text-sm md:text-base gap-[24px] md:gap-[108px]">
              {/* Botón primero en mobile */}
              <a
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="order-1 md:order-2 self-center md:self-end w-full md:w-auto rounded-md px-10 py-3 font-medium text-white shadow-lg bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center mt-2"
              >
                Contanos sobre tu proyecto
              </a>

              {/* Texto después en mobile */}
              <p className="order-2 md:order-1 text-center md:text-right text-[#5E5E5E] font-['DM_Sans'] text-[16px] font-normal leading-[130%] tracking-[-0.16px]">
                Para resolver cualquier<br /> duda sobre tu proyecto ,{" "}
                <span className="font-semibold text-black underline font-['DM_Sans'] text-[16px] leading-[130%] tracking-[-0.16px]">
                  contactanos
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Otros proyectos — centrado, sin solapes y sin cortes a la derecha */}
        <section className="relative w-full overflow-x-clip py-10 mt-[30px]">
          <div className="mx-auto w-full max-w-[311px] md:max-w-[689px] lg:max-w-[904px] xl:max-w-[1280px] min-[1384px]:max-w-[1224px] min-[1440px]:max-w-[1280px] min-[1920px]:max-w-[1680px] px-2 sm:px-3 md:px-4 min-[1384px]:px-[60px] min-[1440px]:px-4">
            <header className="mb-4 md:mb-6">
              <div className="mt-6 mb-8 justify-start text-white text-2xl font-semibold font-['DM_Sans'] leading-relaxed">
                <span className="block min-[400px]:inline">Proyectos que podrían </span>
                <span className="block min-[400px]:inline"> interesarte</span>
              </div>
            </header>

            <div className="grid w-full mt-[60px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 min-[1920px]:grid-cols-4 gap-x-6 gap-y-8 justify-items-center place-items-stretch [&>*]:min-w-0 [&>*]:max-w-sm [&>*]:w-full [&>*]:box-border">
              {/* Siempre mostramos 2 primeras */}
              {pick3Teams.slice(0, 2).map((team) => (
                <div key={team.id}>
                  <TeamCard team={team} />
                </div>
              ))}

              {/* La 3ª solo desde xl (≥1280) */}
              {pick3Teams[2] && (
                <div className="hidden xl:block">
                  <TeamCard team={pick3Teams[2]} />
                </div>
              )}

              {/* La 4ª solo desde 1920px */}
              {pick3Teams[3] && (
                <div className="hidden min-[1920px]:block">
                  <TeamCard team={pick3Teams[3]} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
