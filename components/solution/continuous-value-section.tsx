"use client"

import { motion } from "framer-motion"
import { Globe, TrendingUp, Infinity, Clock, BarChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function ContinuousValueSection() {
  const { t } = useSolutionLanguage()

  return (
    <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-4 py-2 text-sm font-medium mb-6">
            {t("continuousValue.badge")}
          </Badge>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="gradient-text">{t("continuousValue.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("continuousValue.subtitle")}</p>
        </motion.div>

        {/* World Economic Forum Quote - Featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-accent/30 to-primary/20 border border-accent/40 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                "{t("continuousValue.quote.text")}"
              </blockquote>
              <cite className="text-lg text-muted-foreground font-medium">{t("continuousValue.quote.source")}</cite>

              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t("continuousValue.quote.description")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="bg-primary/20 p-4 rounded-xl w-fit mx-auto mb-6">
              <Infinity className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">∞</div>
            <div className="text-lg font-medium mb-2">{t("continuousValue.metrics.unlimited.title")}</div>
            <div className="text-sm text-muted-foreground">{t("continuousValue.metrics.unlimited.description")}</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="bg-secondary/20 p-4 rounded-xl w-fit mx-auto mb-6">
              <Clock className="h-8 w-8 text-secondary" />
            </div>
            <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-lg font-medium mb-2">{t("continuousValue.metrics.continuous.title")}</div>
            <div className="text-sm text-muted-foreground">{t("continuousValue.metrics.continuous.description")}</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="bg-green-500/20 p-4 rounded-xl w-fit mx-auto mb-6">
              <BarChart className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-4xl font-bold text-green-500 mb-2">100%</div>
            <div className="text-lg font-medium mb-2">{t("continuousValue.metrics.actionable.title")}</div>
            <div className="text-sm text-muted-foreground">{t("continuousValue.metrics.actionable.description")}</div>
          </div>
        </motion.div>

        {/* Compound Value Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8"
        >
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">{t("continuousValue.compounding.title")}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("continuousValue.compounding.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  {t("continuousValue.compounding.timeline.month1")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("continuousValue.compounding.timeline.month1Desc")}
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {t("continuousValue.compounding.timeline.month3")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("continuousValue.compounding.timeline.month3Desc")}
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {t("continuousValue.compounding.timeline.month6")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("continuousValue.compounding.timeline.month6Desc")}
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-500 mb-1">
                  {t("continuousValue.compounding.timeline.year1")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("continuousValue.compounding.timeline.year1Desc")}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
