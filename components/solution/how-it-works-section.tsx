"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Users, Target, Rocket, BarChart } from "lucide-react"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function HowItWorksSection() {
  const { t } = useSolutionLanguage()

  const steps = [
    {
      number: "01",
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
      details: [
        t("howItWorks.steps.step1.details.0"),
        t("howItWorks.steps.step1.details.1"),
        t("howItWorks.steps.step1.details.2"),
      ],
      icon: Target,
      color: "bg-blue-500/20 text-blue-600",
    },
    {
      number: "02",
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
      details: [
        t("howItWorks.steps.step2.details.0"),
        t("howItWorks.steps.step2.details.1"),
        t("howItWorks.steps.step2.details.2"),
      ],
      icon: Users,
      color: "bg-green-500/20 text-green-600",
    },
    {
      number: "03",
      title: t("howItWorks.steps.step3.title"),
      description: t("howItWorks.steps.step3.description"),
      details: [
        t("howItWorks.steps.step3.details.0"),
        t("howItWorks.steps.step3.details.1"),
        t("howItWorks.steps.step3.details.2"),
      ],
      icon: Rocket,
      color: "bg-purple-500/20 text-purple-600",
    },
    {
      number: "04",
      title: t("howItWorks.steps.step4.title"),
      description: t("howItWorks.steps.step4.description"),
      details: [
        t("howItWorks.steps.step4.details.0"),
        t("howItWorks.steps.step4.details.1"),
        t("howItWorks.steps.step4.details.2"),
      ],
      icon: BarChart,
      color: "bg-orange-500/20 text-orange-600",
    },
  ]

  const timeline = [
    {
      phase: t("howItWorks.timeline.phase1.phase"),
      duration: t("howItWorks.timeline.phase1.duration"),
      activities: [
        t("howItWorks.timeline.phase1.activities.0"),
        t("howItWorks.timeline.phase1.activities.1"),
        t("howItWorks.timeline.phase1.activities.2"),
      ],
    },
    {
      phase: t("howItWorks.timeline.phase2.phase"),
      duration: t("howItWorks.timeline.phase2.duration"),
      activities: [
        t("howItWorks.timeline.phase2.activities.0"),
        t("howItWorks.timeline.phase2.activities.1"),
        t("howItWorks.timeline.phase2.activities.2"),
      ],
    },
    {
      phase: t("howItWorks.timeline.phase3.phase"),
      duration: t("howItWorks.timeline.phase3.duration"),
      activities: [
        t("howItWorks.timeline.phase3.activities.0"),
        t("howItWorks.timeline.phase3.activities.1"),
        t("howItWorks.timeline.phase3.activities.2"),
      ],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            {t("howItWorks.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("howItWorks.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("howItWorks.subtitle")}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${step.color}`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {Array.isArray(step.details) &&
                          step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t("howItWorks.timelineTitle")}</h3>
            <p className="text-muted-foreground">{t("howItWorks.timelineSubtitle")}</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-secondary h-full rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="text-xl font-bold">{item.phase}</h4>
                          <Badge variant="secondary">{item.duration}</Badge>
                        </div>
                        <ul className="space-y-2">
                          {item.activities.map((activity, activityIndex) => (
                            <li key={activityIndex} className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
