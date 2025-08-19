"use client"

import { motion } from "framer-motion"
import { Eye, Users, BarChart, Zap, ArrowRight, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CompaniesSolution() {
  const benefits = [
    {
      icon: Eye,
      title: "Ves Antes de Contratar",
      description: "Observá cómo trabajan en proyectos reales, no en entrevistas teóricas",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Equipos Validados",
      description: "Accedé a equipos que ya demostraron trabajar bien juntos",
      color: "text-green-500",
    },
    {
      icon: BarChart,
      title: "Datos Objetivos",
      description: "Más de 150 puntos de datos sobre el rendimiento de cada profesional",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Resultados Inmediatos",
      description: "Equipos listos para trabajar desde el primer día",
      color: "text-orange-500",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-green-50/30 to-background">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 text-sm font-medium mb-6">
            Nuestra Solución
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Simulación Laboral Real</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transformamos tus desafíos reales en simulaciones donde podés ver exactamente cómo los equipos resuelven
            problemas similares a los tuyos.
          </p>
        </motion.div>

        {/* Main Visual with Transformation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Before */}
                <div className="text-center">
                  <div className="bg-red-100 p-6 rounded-xl mb-4">
                    <h3 className="text-lg font-bold text-red-700 mb-2">Método Tradicional</h3>
                    <div className="space-y-2 text-sm text-red-600">
                      <div>❌ Entrevistas teóricas</div>
                      <div>❌ CVs sin validar</div>
                      <div>❌ Procesos largos</div>
                      <div>❌ Alto riesgo</div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowRight className="h-12 w-12 text-primary" />
                </div>

                {/* After */}
                <div className="text-center">
                  <div className="bg-green-100 p-6 rounded-xl mb-4">
                    <h3 className="text-lg font-bold text-green-700 mb-2">NoCountry</h3>
                    <div className="space-y-2 text-sm text-green-600">
                      <div>✅ Proyectos reales</div>
                      <div>✅ Equipos validados</div>
                      <div>✅ Resultados en 48hs</div>
                      <div>✅ Riesgo mínimo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  className="gradient-bg"
                  onClick={() => window.open("https://tally.so/r/3EEp02", "_blank")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Simulación en Acción
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 text-center border-green-200">
                <CardContent className="p-6">
                  <div className="bg-green-50 p-3 rounded-lg w-fit mx-auto mb-4">
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
