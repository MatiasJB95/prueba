"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Clock, DollarSign, Users, TrendingDown } from "lucide-react"
import { useSolutionLanguage } from "@/contexts/solution-language-context"

export function ProblemSection() {
  const { t } = useSolutionLanguage()

  const problems = [
    {
      icon: AlertTriangle,
      title: t("problem.problems.badHires.title"),
      description: t("problem.problems.badHires.description"),
      stat: t("problem.problems.badHires.stat"),
      statLabel: t("problem.problems.badHires.statLabel"),
    },
    {
      icon: Clock,
      title: t("problem.problems.interviewCycles.title"),
      description: t("problem.problems.interviewCycles.description"),
      stat: t("problem.problems.interviewCycles.stat"),
      statLabel: t("problem.problems.interviewCycles.statLabel"),
    },
    {
      icon: Users,
      title: t("problem.problems.resumeTheater.title"),
      description: t("problem.problems.resumeTheater.description"),
      stat: t("problem.problems.resumeTheater.stat"),
      statLabel: t("problem.problems.resumeTheater.statLabel"),
    },
    {
      icon: DollarSign,
      title: t("problem.problems.hiddenCosts.title"),
      description: t("problem.problems.hiddenCosts.description"),
      stat: t("problem.problems.hiddenCosts.stat"),
      statLabel: t("problem.problems.hiddenCosts.statLabel"),
    },
  ]

  return (
    
  )
}
