"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Project = {
  id: string;
  title: string;
  cover?: string;
  deliverables: number;
  tags: string[];
  members: { name: string; avatar: string }[];
};

const DEFAULT_COVER = "/default-cover.png";

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.cover || "/default-cover.png";

  return (
<motion.article
  whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
  className="relative w-[407px] h-[518px] overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/20 bg-card"
>
  <div className="h-full p-5 md:p-6 flex flex-col">
    {/* Imagen EXACTA 407x320 */}
    <div className="-mx-5 -mt-5 md:-mx-6 rounded-t-xl overflow-hidden">
      <div className="relative h-[320px] w-full">
        <img
          src={cover}
          alt={`${project.title} cover`}
          className="w-[407px] h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
      </div>
    </div>

        {/* Tags */}
        <div className="mt-4 flex items-center justify-start gap-3">
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 2).map((t, i) => (
              <Badge
                key={i}
                variant="outline"
                className="px-3 py-1 text-[10px] sm:text-xs bg-white/20 border border-white/40 !text-white font-semibold rounded-full shadow-md"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Título + Entregables */}
        <div className="mt-3 flex items-center justify-between pr-2">
          <h3 className="text-left text-[18px] md:text-[20px] font-semibold text-foreground clamp-2-lines">
            {project.title}
          </h3>
          <div className="flex items-baseline gap-1 -translate-x-1 pr-3 pl-4">
            <span className="text-xs text-white/70">Entregables:</span>
            <span className="text-xl font-bold text-white">{project.deliverables}</span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white">Por:</span>
            <div className="flex -space-x-3">
              {project.members.slice(0, 5).map((m, i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden shadow-md">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
              ))}
              {project.members.length > 5 && (
                <div className="h-8 w-8 rounded-full border-2 border-background bg-black/60 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                  +{project.members.length - 5}
                </div>
              )}
            </div>
          </div>

          <Link href={`/projectshowcase/${project.id}`}>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 rounded-md bg-card/60 text-white border border-white/60 hover:bg-card/80 hover:border-white/80 shadow-sm"
            >
              Ver proyecto
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}