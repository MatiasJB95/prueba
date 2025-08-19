"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Clock, DollarSign, Users, Target } from "lucide-react"

export function CompaniesBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "95% de Tasa de Éxito",
      description: "Equipos pre-validados con historial comprobado",
      stat: "95%",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      title: "80% Menos Tiempo",
      description: "De meses a semanas en tu proceso de contratación",
      stat: "48h",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: DollarSign,
      title: "Sin Costos Ocultos",
      description: "No hay fees de reclutamiento ni sorpresas",
      stat: "$0",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "Riesgo Minimizado",
      description: "Ves exactamente lo que vas a obtener",
      stat: "100%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Equipos Completos",
      description: "No solo individuos, sino equipos que funcionan",
      stat: "5-8",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      icon: Target,
      title: "Resultados Tangibles",
      description: "Prototipos y productos reales, no solo promesas",
      stat: "100%",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/30 to-background">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Beneficios que <span className="gradient-text">Transforman</span> tu Negocio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No es solo una nueva forma de contratar, es una ventaja competitiva que te permite moverte más rápido que tu
            competencia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className={`${benefit.bgColor} p-4 rounded-xl w-fit mx-auto mb-4`}>
                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${benefit.color} mb-2`}>{benefit.stat}</div>
                  <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Calculá tu ROI</h3>
                <p className="text-muted-foreground">
                  Empresas similares ahorran en promedio $150K por equipo contratado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">$240K</div>
                  <div className="text-sm text-muted-foreground">Costo promedio de una mala contratación</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">6 meses</div>
                  <div className="text-sm text-muted-foreground">Tiempo perdido en procesos tradicionales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">$150K+</div>
                  <div className="text-sm text-muted-foreground">Ahorro promedio con NoCountry</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
