"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Users, Play, BarChart, CheckCircle } from "lucide-react"

export function CompaniesHowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Subís tu Proyecto",
      description: "Nos contás tu desafío y definimos los objetivos",
      icon: Upload,
      details: [
        "Describís tu problema o necesidad",
        "Definimos el alcance y objetivos",
        "Establecemos criterios de éxito",
      ],
      color: "bg-blue-500/20 text-blue-600",
    },
    {
      number: "02",
      title: "Seleccionamos el Equipo",
      description: "Elegimos el equipo perfecto para tu simulación",
      icon: Users,
      details: [
        "Matching basado en tu industria",
        "Equipos con experiencia relevante",
        "Presentación del equipo seleccionado",
      ],
      color: "bg-green-500/20 text-green-600",
    },
    {
      number: "03",
      title: "Ejecutan la Simulación",
      description: "El equipo trabaja en tu proyecto durante 4-6 semanas",
      icon: Play,
      details: ["Trabajo en metodologías ágiles", "Seguimiento en tiempo real", "Comunicación directa disponible"],
      color: "bg-purple-500/20 text-purple-600",
    },
    {
      number: "04",
      title: "Recibís Resultados",
      description: "Entregables + análisis completo del equipo",
      icon: BarChart,
      details: [
        "Prototipo o producto funcional",
        "Análisis de rendimiento individual",
        "Reporte de dinámicas de equipo",
      ],
      color: "bg-orange-500/20 text-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-blue-50/30">
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
            Proceso Simple
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Cómo Funciona?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso transparente y eficiente que te da resultados concretos en semanas, no meses.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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
                        {step.details.map((detail, detailIndex) => (
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
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Cronograma Típico</h3>
                <p className="text-muted-foreground">De la idea a los resultados en 6-8 semanas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { phase: "Semana 1", activity: "Definición y Setup" },
                  { phase: "Semanas 2-5", activity: "Desarrollo y Simulación" },
                  { phase: "Semana 6", activity: "Entrega y Análisis" },
                  { phase: "Semana 7-8", activity: "Decisión de Contratación" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{item.phase}</h4>
                    <p className="text-sm text-muted-foreground">{item.activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
