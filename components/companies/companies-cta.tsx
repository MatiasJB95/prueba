"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, MessageCircle, Calendar, ArrowRight } from "lucide-react"

export function CompaniesCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/30 to-background">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="gradient-text">Transformar</span> tu Contratación?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Únete a las empresas que ya están contratando talento basándose en evidencia real, no en suposiciones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Empezá Hoy Mismo</h3>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Subí tu proyecto y en 48 horas tendrás una propuesta de equipo con simulación incluida. Sin
                  compromisos, sin pagos adelantados.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Subí tu Proyecto</h4>
                  <p className="text-sm opacity-80">Contanos tu desafío en 5 minutos</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Recibí Propuesta</h4>
                  <p className="text-sm opacity-80">Equipo + plan de simulación en 48hs</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Iniciá Simulación</h4>
                  <p className="text-sm opacity-80">Ves resultados reales en 4-6 semanas</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4 group"
                  onClick={() => window.open("https://tally.so/r/3EEp02", "_blank")}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Subí tu Proyecto Gratis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm">✅ Sin pagos adelantados</div>
            <div className="text-sm">✅ Sin compromisos a largo plazo</div>
            <div className="text-sm">✅ Resultados garantizados</div>
            <div className="text-sm">✅ Soporte 24/7</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
