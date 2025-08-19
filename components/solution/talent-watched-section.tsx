"use client"

import { motion } from "framer-motion"
import { Eye, Users, BarChart, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function TalentWatchedSection() {
  const { t } = useSolutionLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-accent/20 via-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl relative z-10 text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium mb-6">
            {t("talentWatched.badge")}
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text">{t("talentWatched.title")}</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-normal">
              {t("talentWatched.subtitle")}
            </span>
          </h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{t("talentWatched.evidenceTitle")}</p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              {t("talentWatched.description")}
            </p>
          </div>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">20K+</div>
            <div className="text-xl font-medium mb-2">{t("talentWatched.stats.talentWatched")}</div>
            <div className="text-muted-foreground">{t("talentWatched.stats.talentWatchedDesc")}</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
            <div className="text-5xl md:text-6xl font-bold gradient-text mb-4">150+</div>
            <div className="text-xl font-medium mb-2">{t("talentWatched.stats.behavioralData")}</div>
            <div className="text-muted-foreground">{t("talentWatched.stats.behavioralDataDesc")}</div>
          </div>
        </motion.div>

        {/* Value Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
            <div className="bg-primary/20 p-4 rounded-xl w-fit mb-6 mx-auto">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("talentWatched.valuePoints.realPerformance.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("talentWatched.valuePoints.realPerformance.description")}
            </p>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
            <div className="bg-primary/20 p-4 rounded-xl w-fit mb-6 mx-auto">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("talentWatched.valuePoints.teamDynamics.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("talentWatched.valuePoints.teamDynamics.description")}
            </p>
          </div>
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/50 transition-all duration-300">
            <div className="bg-primary/20 p-4 rounded-xl w-fit mb-6 mx-auto">
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t("talentWatched.valuePoints.behavioralData.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("talentWatched.valuePoints.behavioralData.description")}
            </p>
          </div>
        </motion.div>

        {/* World Economic Forum Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          
        </motion.div>
      </div>
    </section>
  )
}
