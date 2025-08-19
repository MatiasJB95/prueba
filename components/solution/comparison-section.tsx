"use client"

import { motion } from "framer-motion"
import { Check, X, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function ComparisonSection() {
  const { t } = useSolutionLanguage()

  const comparisonData = [
    {
      feature: t("comparison.features.timeToHire"),
      traditional: t("comparison.traditional.timeToHire"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.timeToHire"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.accuracy"),
      traditional: t("comparison.traditional.accuracy"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.accuracy"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.fees"),
      traditional: t("comparison.traditional.fees"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.fees"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.performanceData"),
      traditional: t("comparison.traditional.performanceData"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.performanceData"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.teamDynamics"),
      traditional: t("comparison.traditional.teamDynamics"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.teamDynamics"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.softSkills"),
      traditional: t("comparison.traditional.softSkills"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.softSkills"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.riskBadHire"),
      traditional: t("comparison.traditional.riskBadHire"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.riskBadHire"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.upfrontInvestment"),
      traditional: t("comparison.traditional.upfrontInvestment"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.upfrontInvestment"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.deliverables"),
      traditional: t("comparison.traditional.deliverables"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.deliverables"),
      noCountryIcon: Check,
    },
    {
      feature: t("comparison.features.scalability"),
      traditional: t("comparison.traditional.scalability"),
      traditionalIcon: X,
      noCountry: t("comparison.noCountry.scalability"),
      noCountryIcon: Check,
    },
  ]

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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("comparison.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("comparison.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-accent/30">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-muted-foreground">Característica</h3>
            </div>
            <div className="p-6 text-center border-l border-border">
              <h3 className="text-lg font-bold text-red-500">RRHH Tradicional</h3>
              <p className="text-sm text-muted-foreground mt-1">Agencias, RRHH Interno</p>
            </div>
            <div className="p-6 text-center border-l border-border bg-primary/10">
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">NoCountry</h3>
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mt-1">Simulación Laboral</Badge>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`grid grid-cols-3 border-t border-border ${
                index % 2 === 0 ? "bg-background" : "bg-accent/10"
              }`}
            >
              <div className="p-6">
                <h4 className="font-medium">{row.feature}</h4>
              </div>
              <div className="p-6 border-l border-border">
                <div className="flex items-center gap-3">
                  <row.traditionalIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{row.traditional}</span>
                </div>
              </div>
              <div className="p-6 border-l border-border bg-primary/5">
                <div className="flex items-center gap-3">
                  <row.noCountryIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium">{row.noCountry}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/20 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{t("comparison.bottomLine.title")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">{t("comparison.bottomLine.savings")}</div>
                  <div className="text-sm text-muted-foreground">{t("comparison.bottomLine.savingsDesc")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">{t("comparison.bottomLine.roi")}</div>
                  <div className="text-sm text-muted-foreground">{t("comparison.bottomLine.roiDesc")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">{t("comparison.bottomLine.reduction")}</div>
                  <div className="text-sm text-muted-foreground">{t("comparison.bottomLine.reductionDesc")}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
