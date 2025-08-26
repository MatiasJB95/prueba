"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Play, CheckCircle, Unlock, Users, Activity, GraduationCap, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CompaniesHero() {
  const badges = [
    { icon: CheckCircle, text: "100% remoto" },
    { icon: Activity, text: "Insights en tiempo real" },
    { icon: Unlock, text: "Sin entrevistas ni CVs" },
  ]

  const [currentSentence, setCurrentSentence] = useState(0)
  const sentences = [
    "¿Meses de entrevistas, pruebas y onboarding para descubrir si fue una buena decisión?",
    "Observá equipos multidisciplinarios antes de contratar",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [sentences.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-transparent">
      {/* quitamos el tinte violeta del fondo base */}

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

      <div className="container relative z-10 max-w-7xl h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-center">
              <span className="gradient-text">Contrata con una Simulación Laboral</span>
            </h1>

            <div className="h-12 flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSentence}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm md:text-base text-muted-foreground max-w-xl text-center"
                >
                  {sentences[currentSentence]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Value Proposition Badges */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full text-sm font-medium hover:border-primary/30 transition-colors"
                >
                  <badge.icon className="h-3.5 w-3.5 text-primary" />
                  <span className="font-normal">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-3 mb-4 justify-center lg:justify-center">
  <Button
    size="default"
    className="!rounded-none gradient-bg px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300"
    onClick={() => window.open("https://tally.so/r/3EEp02", "_blank")}
  >
    <Upload className="mr-2 h-4 w-4" />
    Subí tu proyecto
  </Button>

  {/* Ve nuestro Showcase */}
  <Button
    asChild
    size="default"
    variant="outline"
    className="!rounded-none px-6 py-2.5 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
  >
    <Link href="/showcase">
      <Play className="mr-2 h-4 w-4" />
      Ve nuestro Showcase
    </Link>
  </Button>
</div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border/50 text-center">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <div className="text-xl md:text-2xl font-bold text-primary">+25K</div>
                </div>
                <div className="text-xs text-muted-foreground">Talentos de Latam</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div className="text-xl md:text-2xl font-bold text-green-500">+100K</div>
                </div>
                <div className="text-xs text-muted-foreground">Interacciones</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div className="text-xl md:text-2xl font-bold text-yellow-500">+43K</div>
                </div>
                <div className="text-xs text-muted-foreground">Peer reviews</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  <div className="text-xl md:text-2xl font-bold text-blue-500">+150</div>
                </div>
                <div className="text-xs text-muted-foreground">Instituciones aliadas</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content (sin glow violeta) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative flex items-center justify-center">
              {/* Sin overlay violeta */}
              <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                <Image
                  src="/network-visualization-transparent.png"
                  alt="Red de talento global conectada - Visualización de la plataforma de simulación laboral mostrando equipos interconectados trabajando en tiempo real"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Indicadores flotantes en tonos fríos */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3 border border-cyan-500/30"
              >
                <Users className="h-5 w-5 text-cyan-500" />
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8], x: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-500/30"
              >
                <Activity className="h-5 w-5 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
