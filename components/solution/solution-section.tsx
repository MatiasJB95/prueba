"use client"

import { motion } from "framer-motion"
import { CheckCircle, Eye, Users, BarChart, Zap, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function SolutionSection() {
  const { t } = useSolutionLanguage()

  const benefits = [
    {
      icon: Eye,
      title: t("solution.benefits.seeBeforeHire.title"),
      description: t("solution.benefits.seeBeforeHire.description"),
    },
    {
      icon: Users,
      title: t("solution.benefits.teamDynamics.title"),
      description: t("solution.benefits.teamDynamics.description"),
    },
    {
      icon: BarChart,
      title: t("solution.benefits.dataDecisions.title"),
      description: t("solution.benefits.dataDecisions.description"),
    },
    {
      icon: Zap,
      title: t("solution.benefits.fasterHiring.title"),
      description: t("solution.benefits.fasterHiring.description"),
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium mb-6">
            {t("solution.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t("solution.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("solution.subtitle")}</p>
        </motion.div>

        {/* Main Visual with Team Dynamics Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-8">{t("solution.transformation.title")}</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-500/20 p-3 rounded-full">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-medium text-red-500 line-through text-lg">
                        {t("solution.transformation.traditional")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("solution.transformation.traditionalDesc")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-green-500 text-lg">
                        {t("solution.transformation.simulation")}
                      </div>
                      <div className="text-sm text-muted-foreground">{t("solution.transformation.simulationDesc")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Dynamics Illustration */}
              <div className="relative">
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden">
                  {/* Animated Team Collaboration Visual */}
                  <div className="relative h-64">
                    {/* Central Project Hub */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 20px rgba(var(--primary), 0.3)",
                          "0 0 30px rgba(var(--primary), 0.5)",
                          "0 0 20px rgba(var(--primary), 0.3)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center"
                    >
                      <div className="text-xs font-bold text-primary">PROJECT</div>
                    </motion.div>

                    {/* Team Members Around the Hub */}
                    {[
                      { top: "10%", left: "20%", delay: 0, color: "bg-blue-500" },
                      { top: "10%", right: "20%", delay: 0.5, color: "bg-green-500" },
                      { bottom: "10%", left: "20%", delay: 1, color: "bg-purple-500" },
                      { bottom: "10%", right: "20%", delay: 1.5, color: "bg-orange-500" },
                    ].map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: [0, -5, 0],
                        }}
                        transition={{
                          delay: member.delay,
                          duration: 0.5,
                          y: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: member.delay },
                        }}
                        className={`absolute w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                        style={{
                          top: member.top,
                          left: member.left,
                          right: member.right,
                          bottom: member.bottom,
                        }}
                      >
                        {index + 1}
                      </motion.div>
                    ))}

                    {/* Connection Lines */}
                    {[0, 1, 2, 3].map((index) => (
                      <motion.div
                        key={`line-${index}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          delay: index * 0.5,
                          duration: 2,
                          opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                        }}
                        className={`absolute w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent transform origin-bottom ${
                          index === 0
                            ? "top-6 left-1/2 -rotate-45"
                            : index === 1
                              ? "top-6 left-1/2 rotate-45"
                              : index === 2
                                ? "bottom-6 left-1/2 rotate-45"
                                : "bottom-6 left-1/2 -rotate-45"
                        }`}
                      />
                    ))}

                    {/* Data Flow Indicators */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dashed border-primary/30 rounded-full"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <div className="text-sm font-medium text-primary">{t("solution.collaboration.title")}</div>
                    <div className="text-xs text-muted-foreground">{t("solution.collaboration.description")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="bg-primary/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
