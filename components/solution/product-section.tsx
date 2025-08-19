"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Shield, Zap, MessageSquare, Brain, ArrowRight, CheckCircle } from "lucide-react"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function ProductSection() {
  const { t } = useSolutionLanguage()

  const features = [
    {
      icon: BarChart3,
      title: t("product.features.dashboard.title"),
      description: t("product.features.dashboard.description"),
      color: "bg-blue-500/20 text-blue-600",
    },
    {
      icon: Brain,
      title: t("product.features.analytics.title"),
      description: t("product.features.analytics.description"),
      color: "bg-purple-500/20 text-purple-600",
    },
    {
      icon: Users,
      title: t("product.features.performance.title"),
      description: t("product.features.performance.description"),
      color: "bg-green-500/20 text-green-600",
    },
    {
      icon: MessageSquare,
      title: t("product.features.communication.title"),
      description: t("product.features.communication.description"),
      color: "bg-orange-500/20 text-orange-600",
    },
    {
      icon: Shield,
      title: t("product.features.security.title"),
      description: t("product.features.security.description"),
      color: "bg-red-500/20 text-red-600",
    },
    {
      icon: Zap,
      title: t("product.features.matching.title"),
      description: t("product.features.matching.description"),
      color: "bg-yellow-500/20 text-yellow-600",
    },
  ]

  const stats = [
    {
      value: t("product.stats.teams"),
      label: t("product.stats.teamsDesc"),
    },
    {
      value: t("product.stats.metrics"),
      label: t("product.stats.metricsDesc"),
    },
    {
      value: t("product.stats.uptime"),
      label: t("product.stats.uptimeDesc"),
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
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
            {t("product.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("product.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("product.subtitle")}</p>
        </motion.div>

        {/* Platform Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t("product.platformTitle")}</h3>
                  <p className="text-muted-foreground mb-6">{t("product.platformDesc")}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">NoCountry Dashboard</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Live</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-primary/5 rounded">
                        <span className="text-sm">Active Projects</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/5 rounded">
                        <span className="text-sm">Team Members</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-500/5 rounded">
                        <span className="text-sm">Success Rate</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{t("product.integration.title")}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("product.integration.description")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Slack", "Microsoft Teams", "Jira", "GitHub", "Figma", "Notion"].map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">{t("product.cta.title")}</h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">{t("product.cta.description")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group"
                  onClick={() => window.open("https://tally.so/r/3EEp02", "_blank")}
                >
                  {t("product.cta.startSimulation")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  {t("product.cta.scheduleDemo")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
