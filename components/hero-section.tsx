"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

function AnimatedAction() {
  const [action, setAction] = useState("Analyze")

  useEffect(() => {
    const interval = setInterval(() => {
      setAction((prev) => (prev === "Analyze" ? "Hire" : "Analyze"))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={action}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="gradient-text"
      >
        {action}
      </motion.span>
    </AnimatePresence>
  )
}

function AnimatedBenefit() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 420)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // All benefits from translations
  const benefits = [
    t("hero.benefits.noRecruitmentFeesText"),
    t("hero.benefits.behavioralInsights"),
    t("hero.benefits.remote"),
  ]

  // Show only 3 specific benefits on mobile (420px or less), all on larger screens
  const mobileBenefits = [
    t("hero.benefits.noRecruitmentFeesText"),
    t("hero.benefits.remote"),
    t("hero.benefits.behavioralInsights"),
  ]

  const displayBenefits = isMobile ? mobileBenefits : benefits

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2 md:mt-3">
      {displayBenefits.map((benefit, index) => (
        <Badge
          key={index}
          variant="outline"
          className={
            benefit === t("hero.benefits.noRecruitmentFeesText")
              ? "bg-gradient-to-r from-secondary/20 to-cyan-500/20 border-secondary/50 text-secondary px-2 md:px-3 py-1 text-xs md:text-sm font-bold shadow-lg shadow-secondary/20 ring-2 ring-secondary/30 scale-90"
              : "bg-background/80 backdrop-blur-sm px-2 md:px-3 py-1 text-xs md:text-sm"
          }
        >
          {benefit === t("hero.benefits.noRecruitmentFeesText") ? t("hero.benefits.noRecruitmentFeesBadge") : benefit}
        </Badge>
      ))}
    </div>
  )
}

function AnimatedSubtitle() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const subtitles = t("hero.subtitles")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % subtitles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [subtitles.length])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium mb-6 md:mb-8"
      >
        {subtitles[currentIndex]}
      </motion.div>
    </AnimatePresence>
  )
}

// Fallback component for when language context is not available
function HeroSectionFallback() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>

      {/* Cosmic space background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebula-like gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>

        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0.3)",
                `0 0 8px ${
                  [
                    "rgba(255,255,255,0.8)",
                    "rgba(96,165,250,0.8)",
                    "rgba(167,139,250,0.8)",
                    "rgba(52,211,153,0.8)",
                    "rgba(251,191,36,0.8)",
                    "rgba(244,114,182,0.8)",
                  ][i % 6]
                }`,
                "0 0 0px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container text-center z-10 max-w-4xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
        {/* NoCountry Logo */}
        <motion.div
          className="mb-8 md:mb-12 lg:mb-16 mt-4 md:mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src="/nocountry-logo.png" alt="NoCountry Logo" className="h-6 md:h-8 lg:h-10 mx-auto" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-2 md:mb-3">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium mb-6 md:mb-8">
              Hire better, start with real simulations
            </div>
          </div>
          <div className="gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-8xl mt-4 md:mt-6 lg:mt-8">
            Job Simulation
          </div>
        </motion.h1>

        {/* Animated benefit tags */}
        <motion.div
          className="mb-8 md:mb-10 lg:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2 md:mt-3">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-secondary/20 to-cyan-500/20 border-secondary/50 text-secondary px-2 md:px-3 py-1 text-xs md:text-sm font-bold shadow-lg shadow-secondary/20 ring-2 ring-secondary/30 scale-90"
            >
              🚀 No recruitment fees!
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-2 md:px-3 py-1 text-xs md:text-sm">
              100% remote
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-2 md:px-3 py-1 text-xs md:text-sm">
              Behavioral insights per team
            </Badge>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col gap-3 md:gap-4 justify-center mb-8 md:mb-12 lg:mb-16 mt-8 md:mt-10 lg:mt-12 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Primary CTA - See teams */}
          <div className="relative w-full">
            <Button
              size="lg"
              className="gradient-bg text-base md:text-lg py-4 md:py-6 px-6 md:px-8 w-full"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(true)}
            >
              See teams solving real challenges
              <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-3 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg z-50 w-64 sm:w-80"
                >
                  <div className="text-sm text-center">
                    <span className="text-primary font-medium">✨ Coming soon! ✨</span>
                    <p className="mt-1 text-muted-foreground">
                      Soon you'll be able to explore teams solving real challenges from companies like yours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Secondary CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2 py-3 md:py-4 bg-background/50 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
              onClick={() => {
                window.open("https://tally.so/r/3EEp02", "_blank")
              }}
            >
              <div className="text-center">
                <div className="font-medium text-sm md:text-base">For Companies</div>
                <div className="text-xs text-muted-foreground">Upload a challenge</div>
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2 py-3 md:py-4 bg-background/50 backdrop-blur-sm border-secondary/30 hover:bg-secondary/10"
              onClick={() => {
                window.open("https://discord.gg/5MTzmsNXvx", "_blank")
              }}
            >
              <div className="text-center">
                <div className="font-medium text-sm md:text-base">For Talent</div>
                <div className="text-xs text-muted-foreground">Join the Community</div>
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Language switcher */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>

        {/* Cosmic space background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Nebula-like gradients */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>

          {/* Animated stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"][i % 6],
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0.3)",
                  `0 0 8px ${
                    [
                      "rgba(255,255,255,0.8)",
                      "rgba(96,165,250,0.8)",
                      "rgba(167,139,250,0.8)",
                      "rgba(52,211,153,0.8)",
                      "rgba(251,191,36,0.8)",
                      "rgba(244,114,182,0.8)",
                    ][i % 6]
                  }`,
                  "0 0 0px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Larger glowing orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: [
                  "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
                  "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
                  "radial-gradient(circle, #34d399 0%, transparent 70%)",
                  "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
                  "radial-gradient(circle, #f472b6 0%, transparent 70%)",
                ][i % 5],
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Cosmic dust particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute w-0.5 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="container text-center z-10 max-w-4xl px-4 md:px-6 py-8 md:py-12 lg:py-16">
          {/* NoCountry Logo */}
          <motion.div
            className="mb-8 md:mb-12 lg:mb-16 mt-4 md:mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img src="/nocountry-logo.png" alt="NoCountry Logo" className="h-6 md:h-8 lg:h-10 mx-auto" />
          </motion.div>
          {/* Main headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-2 md:mb-3">
              <AnimatedSubtitle />
            </div>
            <div className="gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-8xl mt-4 md:mt-6 lg:mt-8">
              {t("hero.jobSimulation")}
            </div>
          </motion.h1>

          {/* Animated benefit tags */}
          <motion.div
            className="mb-8 md:mb-10 lg:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <AnimatedBenefit />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col gap-3 md:gap-4 justify-center mb-8 md:mb-12 lg:mb-16 mt-8 md:mt-10 lg:mt-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Primary CTA - See teams */}
            <div className="relative w-full">
              <Button
                size="lg"
                className="gradient-bg text-base md:text-lg py-4 md:py-6 px-6 md:px-8 w-full"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(true)}
              >
                {t("hero.cta.seeTeams")}
                <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>

              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 p-3 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg z-50 w-64 sm:w-80"
                  >
                    <div className="text-sm text-center">
                      <span className="text-primary font-medium">{t("hero.cta.comingSoon")}</span>
                      <p className="mt-1 text-muted-foreground">{t("hero.cta.comingSoonMessage")}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              <Button
                size="lg"
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 md:py-4 bg-background/50 backdrop-blur-sm border-primary/30 hover:bg-primary/10"
                onClick={() => {
                  window.open("https://tally.so/r/3EEp02", "_blank")
                }}
              >
                <div className="text-center">
                  <div className="font-medium text-sm md:text-base">{t("hero.cta.forCompanies")}</div>
                  <div className="text-xs text-muted-foreground">{t("hero.cta.uploadChallenge")}</div>
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex items-center justify-center gap-2 py-3 md:py-4 bg-background/50 backdrop-blur-sm border-secondary/30 hover:bg-secondary/10"
                onClick={() => {
                  window.open("https://discord.gg/5MTzmsNXvx", "_blank")
                }}
              >
                <div className="text-center">
                  <div className="font-medium text-sm md:text-base">{t("hero.cta.forTalent")}</div>
                  <div className="text-xs text-muted-foreground">{t("hero.cta.joinCommunity")}</div>
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
