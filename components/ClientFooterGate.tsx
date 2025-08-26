"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

/**
 * Muestra el Footer en todas las rutas EXCEPTO en "/".
 * Incluye defensas por si pathname es undefined o strings raros.
 */
export default function ClientFooter() {
  const pathname = usePathname();

  // Si por algún motivo no tenemos aún pathname, mostramos el footer (fallback seguro)
  if (!pathname && pathname !== "") return <Footer />;

  // Normalizamos por si en algún entorno viene vacío o con /index
  const p = pathname?.trim() || "/";
  const isHome = p === "/" || p === "" || p === "/index";

  return isHome ? null : <Footer />;
}