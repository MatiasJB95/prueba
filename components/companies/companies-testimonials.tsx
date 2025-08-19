"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function CompaniesTestimonials() {
  const testimonials = [
    {
      name: "María González",
      role: "CTO",
      company: "TechStart",
      avatar: "/confident-professional-woman.png",
      rating: 5,
      text: "En 6 semanas tuvimos un equipo completo trabajando en nuestro MVP. Lo que nos hubiera tomado 6 meses de contratación tradicional, lo resolvimos viendo exactamente cómo trabajaban antes de contratarlos.",
    },
    {
      name: "Carlos Mendoza",
      role: "Head of Product",
      company: "InnovateCorp",
      avatar: "/confident-hispanic-professional.png",
      rating: 5,
      text: "La diferencia es abismal. No solo contratamos un equipo, sino que vimos cómo resolvían problemas reales similares a los nuestros. El nivel de confianza es incomparable.",
    },
    {
      name: "Ana Silva",
      role: "Founder & CEO",
      company: "DataFlow",
      avatar: "/confident-woman-portrait.png",
      rating: 5,
      text: "Ahorramos más de $200K en fees de reclutamiento y tiempo. Pero lo más valioso fue ver la calidad del trabajo antes de tomar la decisión. Es el futuro de la contratación tech.",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-purple-50/30">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Lo que Dicen Nuestros <span className="gradient-text">Clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empresas que ya transformaron su forma de contratar talento tecnológico
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-primary/20 mb-4" />

                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} en {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Proyectos Completados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción del Cliente</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">$2M+</div>
                  <div className="text-sm text-muted-foreground">Ahorrado en Costos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">48h</div>
                  <div className="text-sm text-muted-foreground">Tiempo de Respuesta</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
