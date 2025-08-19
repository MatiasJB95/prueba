"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function DeliverablesSection() {
  const { t } = useSolutionLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const deliverables = t("deliverables.items")

  const slides = [
    {
      title: t("deliverables.slides.skillsDashboard.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.skillsDashboard.description"),
    },
    {
      title: t("deliverables.slides.prototypes.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.prototypes.description"),
    },
    {
      title: t("deliverables.slides.analytics.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.analytics.description"),
    },
    {
      title: t("deliverables.slides.teamInsights.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.teamInsights.description"),
    },
    {
      title: t("deliverables.slides.collaboration.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.collaboration.description"),
    },
    {
      title: t("deliverables.slides.behavioral.title"),
      image: "/placeholder.svg?height=400&width=600",
      description: t("deliverables.slides.behavioral.description"),
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">{t("deliverables.title")}</h2>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8">{t("deliverables.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Deliverables List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {deliverables.map((deliverable: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary/10 border border-primary/30 shadow-lg"
                    : "bg-card/30 border border-border/50 hover:bg-card/50"
                }`}
              >
                <div className={`flex-shrink-0 mt-1 ${index === currentSlide ? "text-primary" : "text-green-500"}`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold mb-2 ${index === currentSlide ? "text-primary" : "text-foreground"}`}
                  >
                    {deliverable.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{deliverable.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-80 md:h-96">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay with title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <h4 className="text-xl font-bold text-foreground mb-2">{slides[currentSlide].title}</h4>
                  <p className="text-sm text-muted-foreground">{slides[currentSlide].description}</p>
                </div>

                {/* Navigation arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center gap-2 p-4 bg-card/50">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
