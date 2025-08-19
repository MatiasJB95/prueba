"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock, DollarSign, Users, TrendingDown, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function CompaniesProblem() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Contrataciones Fallidas",
      description: "68% de los proyectos tecnológicos fallan por problemas de equipo",
      stat: "$240K",
      statLabel: "Costo promedio de una mala contratación",
      color: "text-red-500",
    },
    {
      icon: Clock,
      title: "Procesos Largos",
      description: "Los procesos tradicionales de contratación toman meses",
      stat: "3-6",
      statLabel: "meses promedio para formar un equipo",
      color: "text-orange-500",
    },
    {
      icon: Users,
      title: "Falta de Evidencia",
      description: "Los CVs y entrevistas no predicen el rendimiento real",
      stat: "85%",
      statLabel: "de los CVs contienen información inexacta",
      color: "text-yellow-600",
    },
    {
      icon: DollarSign,
      title: "Costos Ocultos",
      description: "Fees de reclutamiento, tiempo perdido y rotación",
      stat: "150%",
      statLabel: "del salario anual en costos ocultos",
      color: "text-purple-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-red-50/30">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <X className="h-6 w-6 text-red-500" />
            <span className="text-red-500 font-medium">El Problema Actual</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            La Contratación Tradicional <span className="text-red-500">No Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Las empresas siguen perdiendo tiempo y dinero con métodos obsoletos que no predicen el éxito real de los
            equipos tecnológicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <problem.icon className={`h-6 w-6 ${problem.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground mb-4">{problem.description}</p>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${problem.color} mb-1`}>{problem.stat}</div>
                      <div className="text-sm text-muted-foreground">{problem.statLabel}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
