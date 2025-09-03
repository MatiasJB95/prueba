"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebulas SIN violeta/rosa */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-400/15 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-blue-400/10 via-cyan-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* 404 Content */}
      <div className="container relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* NoCountry Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src="/nocountry-logo.png"
              alt="NoCountry Logo"
              width={200}
              height={60}
              className="mx-auto"
            />
          </motion.div>

          {/* 404 Number */}
          <motion.h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-bold gradient-text leading-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Página no encontrada
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La página que estás buscando no existe o ha sido movida. 
              Te invitamos a explorar nuestras otras secciones.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Botón Ir al inicio con gradiente */}
            <div className="p-[1px] rounded-md bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600">
              <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-md text-white font-medium min-w-[160px] justify-center hover:bg-gray-800 transition-colors">
                <Home className="h-4 w-4" />
                Ir al inicio
              </Link>
            </div>
            {/* Botón Volver atrás con gradiente */}
            <div className="p-[1px] rounded-md bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600">
              <Link href="javascript:history.back()" className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-md text-white font-medium min-w-[160px] justify-center hover:bg-gray-800 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Volver atrás
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}