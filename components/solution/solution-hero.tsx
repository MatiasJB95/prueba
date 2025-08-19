"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Play,
  Brain,
  Cog,
  BarChart3,
  Globe,
  Code,
  Gamepad2,
  Package,
  Smartphone,
  Database,
  Shield,
  CheckCircle,
} from "lucide-react"
import { useSolutionLanguage } from "@/contexts/solution-language-context"
import { SolutionLanguageSwitcher } from "./solution-language-switcher"

export function SolutionHero() {
  const { t } = useSolutionLanguage()

  const verticals = [
    { icon: Brain, name: t("hero.verticals.ai"), color: "text-purple-500" },
    { icon: Cog, name: t("hero.verticals.automation"), color: "text-blue-500" },
    { icon: BarChart3, name: t("hero.verticals.businessIntelligence"), color: "text-green-500" },
    { icon: Globe, name: t("hero.verticals.webDevelopment"), color: "text-cyan-500" },
    { icon: Code, name: t("hero.verticals.softwareDevelopment"), color: "text-orange-500" },
    { icon: Gamepad2, name: t("hero.verticals.gameDesign"), color: "text-pink-500" },
    { icon: Package, name: t("hero.verticals.product"), color: "text-indigo-500" },
    { icon: Smartphone, name: t("hero.verticals.mobileApps"), color: "text-red-500" },
    { icon: Database, name: t("hero.verticals.dataScience"), color: "text-yellow-500" },
    { icon: Shield, name: t("hero.verticals.cybersecurity"), color: "text-gray-500" },
  ]

  // Get badges with fallback
  const badgesData = t("hero.badges")
  const badges = Array.isArray(badgesData) ? badgesData : ["Sin entrevistas", "Sin headhunting", "Sin riesgo"]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <SolutionLanguageSwitcher />
      </div>

      <div className="container relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 text-sm px-4 py-2">
              {t("hero.badge")}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{t("hero.title")}</h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">{t("hero.subtitle")}</p>

            {/* Value Proposition Badges */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">{badge}</span>
                </motion.div>
              ))}
            </div>

            {/* Verticals Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{t("hero.verticals.title")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {verticals.map((vertical, index) => {
                  const IconComponent = vertical.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex flex-col items-center p-3 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                    >
                      <IconComponent className={`h-6 w-6 mb-2 ${vertical.color}`} />
                      <span className="text-xs font-medium text-center leading-tight">{vertical.name}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="gradient-bg text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("https://tally.so/r/3EEp02", "_blank")}
              >
                {t("hero.cta.primary")}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5"
              >
                <Play className="mr-2 h-5 w-5" />
                {t("hero.cta.secondary")}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{t("hero.stats.projects")}</div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.projectsLabel")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                  {t("hero.stats.professionals")}
                </div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.professionalsLabel")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-500 mb-1">{t("hero.stats.success")}</div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.successLabel")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{t("hero.dashboard.title")}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {t("hero.dashboard.status")}
                    </Badge>
                  </div>

                  {/* Project Cards */}
                  <div className="space-y-4">
                    {[
                      { name: t("hero.dashboard.project1"), progress: 85, color: "bg-purple-500" },
                      { name: t("hero.dashboard.project2"), progress: 60, color: "bg-blue-500" },
                      { name: t("hero.dashboard.project3"), progress: 40, color: "bg-green-500" },
                    ].map((project, index) => (
                      <div key={index} className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${project.color}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Section */}
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-medium mb-3">{t("hero.dashboard.teamTitle")}</h4>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-white"
                        >
                          {i}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                        +3
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-primary/20 backdrop-blur-sm rounded-full p-3 border border-primary/30"
            >
              <Brain className="h-6 w-6 text-primary" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-secondary/20 backdrop-blur-sm rounded-full p-3 border border-secondary/30"
            >
              <Code className="h-6 w-6 text-secondary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
