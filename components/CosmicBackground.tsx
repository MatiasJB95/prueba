"use client"
import { motion } from "framer-motion"

export default function CosmicBackground() {
  return (
    // Fondo fijo a pantalla completa y su propio stacking context
    <div className="fixed inset-0 pointer-events-none isolate z-0" aria-hidden="true">
      
      {/* Azul nocturno de base */}
      <div className="absolute inset-0 bg-[hsl(220_70%_3.9%)]" />

      {/* Nebulosas encima del azul */}
      <div className="absolute -left-10 -top-24 w-72 h-72 rounded-full blur-3xl bg-gradient-radial from-purple-500/20 via-blue-500/15 to-transparent" />
      <div className="absolute right-0 -bottom-24 w-64 h-64 rounded-full blur-3xl bg-gradient-radial from-pink-500/15 via-purple-500/10 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent" />

      {/* Estrellas */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-[1] w-1 h-1 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Polvo cósmico */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute z-[1] w-0.5 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ x: [0, Math.random() * 100 - 50], y: [0, Math.random() * 100 - 50], opacity: [0, 0.6, 0] }}
          transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  )
}