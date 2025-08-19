export type SolutionLanguage = "en" | "es" | "pt"

export interface SolutionTranslations {
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    badges: string[]
    cta: {
      primary: string
      secondary: string
    }
    verticals: {
      title: string
      ai: string
      automation: string
      businessIntelligence: string
      webDevelopment: string
      softwareDevelopment: string
      gameDesign: string
      product: string
      mobileApps: string
      dataScience: string
      cybersecurity: string
    }
    dashboard: {
      title: string
      status: string
      project1: string
      project2: string
      project3: string
      teamTitle: string
    }
    stats: {
      projects: string
      projectsLabel: string
      professionals: string
      professionalsLabel: string
      success: string
      successLabel: string
    }
  }
  talentWatched: {
    badge: string
    title: string
    subtitle: string
    evidenceTitle: string
    description: string
    stats: {
      talentWatched: string
      talentWatchedDesc: string
      behavioralData: string
      behavioralDataDesc: string
    }
    valuePoints: {
      realPerformance: {
        title: string
        description: string
      }
      teamDynamics: {
        title: string
        description: string
      }
      behavioralData: {
        title: string
        description: string
      }
    }
    quote: {
      text: string
      source: string
      description: string
    }
  }
  problem: {
    title: string
    subtitle: string
    problems: {
      badHires: {
        title: string
        description: string
        stat: string
        statLabel: string
      }
      interviewCycles: {
        title: string
        description: string
        stat: string
        statLabel: string
      }
      resumeTheater: {
        title: string
        description: string
        stat: string
        statLabel: string
      }
      hiddenCosts: {
        title: string
        description: string
        stat: string
        statLabel: string
      }
    }
    result: {
      title: string
      description: string
    }
  }
  solution: {
    badge: string
    title: string
    subtitle: string
    transformation: {
      title: string
      traditional: string
      traditionalDesc: string
      simulation: string
      simulationDesc: string
    }
    benefits: {
      seeBeforeHire: {
        title: string
        description: string
      }
      teamDynamics: {
        title: string
        description: string
      }
      dataDecisions: {
        title: string
        description: string
      }
      fasterHiring: {
        title: string
        description: string
      }
    }
    collaboration: {
      title: string
      description: string
    }
  }
  howItWorks: {
    badge: string
    title: string
    subtitle: string
    timelineTitle: string
    timelineSubtitle: string
    steps: {
      step1: {
        title: string
        description: string
        details: string[]
      }
      step2: {
        title: string
        description: string
        details: string[]
      }
      step3: {
        title: string
        description: string
        details: string[]
      }
      step4: {
        title: string
        description: string
        details: string[]
      }
    }
    timeline: {
      phase1: {
        phase: string
        duration: string
        activities: string[]
      }
      phase2: {
        phase: string
        duration: string
        activities: string[]
      }
      phase3: {
        phase: string
        duration: string
        activities: string[]
      }
    }
  }
  continuousValue: {
    badge: string
    title: string
    subtitle: string
    quote: {
      text: string
      source: string
      description: string
    }
    metrics: {
      unlimited: {
        title: string
        description: string
      }
      continuous: {
        title: string
        description: string
      }
      actionable: {
        title: string
        description: string
      }
    }
    compounding: {
      title: string
      description: string
      timeline: {
        month1: string
        month1Desc: string
        month3: string
        month3Desc: string
        month6: string
        month6Desc: string
        year1: string
        year1Desc: string
      }
    }
  }
  deliverables: {
    title: string
    subtitle: string
    items: string[]
    slides: {
      skillsDashboard: {
        title: string
        description: string
      }
      prototypes: {
        title: string
        description: string
      }
      analytics: {
        title: string
        description: string
      }
      teamInsights: {
        title: string
        description: string
      }
      collaboration: {
        title: string
        description: string
      }
      behavioral: {
        title: string
        description: string
      }
    }
  }
  comparison: {
    title: string
    subtitle: string
    features: {
      timeToHire: string
      accuracy: string
      fees: string
      performanceData: string
      teamDynamics: string
      softSkills: string
      riskBadHire: string
      upfrontInvestment: string
      deliverables: string
      scalability: string
    }
    traditional: {
      timeToHire: string
      accuracy: string
      fees: string
      performanceData: string
      teamDynamics: string
      softSkills: string
      riskBadHire: string
      upfrontInvestment: string
      deliverables: string
      scalability: string
    }
    noCountry: {
      timeToHire: string
      accuracy: string
      fees: string
      performanceData: string
      teamDynamics: string
      softSkills: string
      riskBadHire: string
      upfrontInvestment: string
      deliverables: string
      scalability: string
    }
    bottomLine: {
      title: string
      savings: string
      savingsDesc: string
      roi: string
      roiDesc: string
      reduction: string
      reductionDesc: string
    }
  }
  product: {
    badge: string
    title: string
    subtitle: string
    platformTitle: string
    platformDesc: string
    stats: {
      teams: string
      teamsDesc: string
      metrics: string
      metricsDesc: string
      uptime: string
      uptimeDesc: string
    }
    features: {
      dashboard: {
        title: string
        description: string
      }
      analytics: {
        title: string
        description: string
      }
      performance: {
        title: string
        description: string
      }
      communication: {
        title: string
        description: string
      }
      security: {
        title: string
        description: string
      }
      matching: {
        title: string
        description: string
      }
    }
    integration: {
      title: string
      description: string
    }
    cta: {
      title: string
      description: string
      startSimulation: string
      scheduleDemo: string
    }
  }
}

export const solutionTranslations: Record<SolutionLanguage, SolutionTranslations> = {
  es: {
    hero: {
      badge: "Solución Empresarial",
      title: "Descubrí talento que ya resolvió tus problemas, antes de contratar",
      subtitle:
        "Mientras otros siguen leyendo CVs, vos podés ver cómo equipos de talento validado resuelven tus necesidades en tiempo real.",
      description:
        "Accede a desarrolladores, diseñadores, analistas y especialistas en múltiples sectores tecnológicos para impulsar la innovación en tu empresa.",
      badges: ["Sin entrevistas", "Sin headhunting", "Sin riesgo"],
      cta: {
        primary: "Iniciar Simulación",
        secondary: "Ver Demo",
      },
      verticals: {
        title: "Especialidades Disponibles",
        ai: "IA",
        automation: "Automatización",
        businessIntelligence: "BI",
        webDevelopment: "Web",
        softwareDevelopment: "Software",
        gameDesign: "Juegos",
        product: "Producto",
        mobileApps: "Mobile",
        dataScience: "Data",
        cybersecurity: "Seguridad",
      },
      dashboard: {
        title: "Proyectos Activos",
        status: "En Progreso",
        project1: "Plataforma IA",
        project2: "App E-commerce",
        project3: "Dashboard Analytics",
        teamTitle: "Equipo Asignado",
      },
      stats: {
        projects: "500+",
        projectsLabel: "Proyectos Completados",
        professionals: "2000+",
        professionalsLabel: "Profesionales Evaluados",
        success: "95%",
        successLabel: "Tasa de Éxito",
      },
    },
    talentWatched: {
      badge: "Talento Observado",
      title: "Cada Profesional es Evaluado",
      subtitle: "en Tiempo Real",
      evidenceTitle: "Decisiones Basadas en Evidencia",
      description:
        "Nuestro sistema de observación continua garantiza la calidad y el rendimiento de cada miembro del equipo a través de proyectos reales de simulación laboral.",
      stats: {
        talentWatched: "Talento Observado",
        talentWatchedDesc: "Profesionales evaluados en proyectos reales",
        behavioralData: "Puntos de Datos",
        behavioralDataDesc: "Métricas comportamentales por profesional",
      },
      valuePoints: {
        realPerformance: {
          title: "Rendimiento Real",
          description: "Observamos cómo trabajan los profesionales en proyectos reales, no en entrevistas teóricas.",
        },
        teamDynamics: {
          title: "Dinámicas de Equipo",
          description: "Evaluamos cómo colaboran, comunican y resuelven problemas en equipos multidisciplinarios.",
        },
        behavioralData: {
          title: "Datos Comportamentales",
          description: "Recopilamos más de 150 puntos de datos sobre el comportamiento profesional de cada persona.",
        },
      },
      quote: {
        text: "El futuro del trabajo requiere nuevas formas de evaluar el talento. La observación en tiempo real es clave.",
        source: "World Economic Forum",
        description:
          "Por eso desarrollamos un sistema que observa y evalúa el talento en acción, proporcionando insights únicos sobre el rendimiento real de cada profesional.",
      },
    },
    problem: {
      title: "El Problema de la Contratación Tradicional",
      subtitle: "Las empresas enfrentan desafíos críticos al formar equipos tecnológicos",
      problems: {
        badHires: {
          title: "Malas Contrataciones",
          description: "Los procesos tradicionales no predicen el rendimiento real",
          stat: "68%",
          statLabel: "de proyectos fallan por problemas de equipo",
        },
        interviewCycles: {
          title: "Ciclos Largos",
          description: "Procesos de entrevistas que se extienden por meses",
          stat: "3-6",
          statLabel: "meses promedio para contratar",
        },
        resumeTheater: {
          title: "Teatro de CVs",
          description: "Los CVs no reflejan las habilidades reales de trabajo en equipo",
          stat: "85%",
          statLabel: "de CVs contienen información inexacta",
        },
        hiddenCosts: {
          title: "Costos Ocultos",
          description: "El costo real de una mala contratación va más allá del salario",
          stat: "$240K",
          statLabel: "costo promedio de una mala contratación",
        },
      },
      result: {
        title: "El Resultado: Proyectos Fallidos y Recursos Desperdiciados",
        description:
          "Sin una forma confiable de evaluar el talento real, las empresas siguen tomando decisiones de contratación basadas en suposiciones.",
      },
    },
    solution: {
      badge: "Nuestra Solución",
      title: "Simulación Laboral Real",
      subtitle: "Observa el talento en acción antes de contratar",
      transformation: {
        title: "De Entrevistas a Evidencia",
        traditional: "Entrevistas Tradicionales",
        traditionalDesc: "Preguntas teóricas y evaluaciones subjetivas",
        simulation: "Simulación Laboral",
        simulationDesc: "Proyectos reales con equipos multidisciplinarios",
      },
      benefits: {
        seeBeforeHire: {
          title: "Ve Antes de Contratar",
          description: "Observa cómo trabajan en proyectos reales",
        },
        teamDynamics: {
          title: "Dinámicas de Equipo",
          description: "Evalúa la colaboración y comunicación real",
        },
        dataDecisions: {
          title: "Decisiones Basadas en Datos",
          description: "Más de 150 puntos de datos por profesional",
        },
        fasterHiring: {
          title: "Contratación Más Rápida",
          description: "Reduce el tiempo de contratación en 80%",
        },
      },
      collaboration: {
        title: "Colaboración en Tiempo Real",
        description: "Equipos trabajando juntos en proyectos reales",
      },
    },
    howItWorks: {
      badge: "Cómo Funciona",
      title: "Proceso Simple y Efectivo",
      subtitle: "Desde la definición hasta la entrega, te acompañamos en cada paso",
      timelineTitle: "Cronograma del Proyecto",
      timelineSubtitle: "Fases estructuradas para garantizar el éxito",
      steps: {
        step1: {
          title: "Definición del Proyecto",
          description: "Analizamos tus necesidades y definimos el alcance",
          details: [
            "Reunión de descubrimiento con stakeholders",
            "Análisis de requerimientos técnicos",
            "Definición de objetivos y métricas",
          ],
        },
        step2: {
          title: "Selección del Equipo",
          description: "Identificamos el equipo perfecto para tu proyecto",
          details: [
            "Matching basado en habilidades",
            "Revisión de proyectos anteriores",
            "Presentación del equipo propuesto",
          ],
        },
        step3: {
          title: "Desarrollo y Ejecución",
          description: "El equipo trabaja con metodologías ágiles",
          details: ["Sprints de desarrollo", "Reuniones de seguimiento", "Comunicación directa"],
        },
        step4: {
          title: "Entrega y Soporte",
          description: "Entregamos el proyecto completo",
          details: ["Testing y control de calidad", "Documentación completa", "Soporte post-entrega"],
        },
      },
      timeline: {
        phase1: {
          phase: "Planificación",
          duration: "1-2 semanas",
          activities: ["Análisis de requerimientos", "Arquitectura del proyecto", "Selección del equipo"],
        },
        phase2: {
          phase: "Desarrollo",
          duration: "4-12 semanas",
          activities: ["Desarrollo iterativo", "Testing continuo", "Revisiones semanales"],
        },
        phase3: {
          phase: "Entrega",
          duration: "1-2 semanas",
          activities: ["Testing final", "Documentación", "Transferencia de conocimiento"],
        },
      },
    },
    continuousValue: {
      badge: "Valor Continuo",
      title: "Resultados que Perduran",
      subtitle: "Nuestros equipos crean valor a largo plazo para tu empresa",
      quote: {
        text: "El futuro del trabajo requiere nuevas formas de evaluar y desarrollar el talento humano.",
        source: "World Economic Forum",
        description:
          "Por eso creamos un sistema que no solo evalúa, sino que desarrolla continuamente las habilidades de nuestros profesionales.",
      },
      metrics: {
        unlimited: {
          title: "Acceso Ilimitado",
          description: "A nuestra base de talento verificado",
        },
        continuous: {
          title: "Mejora Continua",
          description: "Desarrollo constante de habilidades",
        },
        actionable: {
          title: "Insights Accionables",
          description: "Datos que impulsan decisiones",
        },
      },
      compounding: {
        title: "Valor Compuesto",
        description: "Cada proyecto genera aprendizajes que benefician los siguientes",
        timeline: {
          month1: "Mes 1",
          month1Desc: "Primeros insights",
          month3: "Mes 3",
          month3Desc: "Patrones identificados",
          month6: "Mes 6",
          month6Desc: "Optimización completa",
          year1: "Año 1",
          year1Desc: "Transformación total",
        },
      },
    },
    deliverables: {
      title: "Qué Recibes",
      subtitle: "Entregables completos y documentación detallada",
      items: [
        "Dashboard de Habilidades del Equipo",
        "Prototipos y Productos Funcionales",
        "Análisis de Rendimiento Individual",
        "Insights de Dinámicas de Equipo",
        "Documentación de Colaboración",
        "Métricas Comportamentales Detalladas",
      ],
      slides: {
        skillsDashboard: {
          title: "Dashboard de Habilidades",
          description: "Visualización completa de las competencias del equipo",
        },
        prototypes: {
          title: "Prototipos Funcionales",
          description: "Productos desarrollados durante la simulación",
        },
        analytics: {
          title: "Análisis de Rendimiento",
          description: "Métricas detalladas de cada miembro del equipo",
        },
        teamInsights: {
          title: "Insights de Equipo",
          description: "Análisis de dinámicas y colaboración grupal",
        },
        collaboration: {
          title: "Documentación de Colaboración",
          description: "Registro completo de la comunicación y procesos",
        },
        behavioral: {
          title: "Métricas Comportamentales",
          description: "Datos profundos sobre patrones de trabajo",
        },
      },
    },
    comparison: {
      title: "NoCountry vs. Métodos Tradicionales",
      subtitle: "Descubre por qué las empresas nos eligen",
      features: {
        timeToHire: "Tiempo de Contratación",
        accuracy: "Precisión en la Evaluación",
        fees: "Costos de Reclutamiento",
        performanceData: "Datos de Rendimiento",
        teamDynamics: "Dinámicas de Equipo",
        softSkills: "Habilidades Blandas",
        riskBadHire: "Riesgo de Mala Contratación",
        upfrontInvestment: "Inversión Inicial",
        deliverables: "Entregables Tangibles",
        scalability: "Escalabilidad",
      },
      traditional: {
        timeToHire: "3-6 meses",
        accuracy: "Baja (basada en entrevistas)",
        fees: "$50K-150K por posición",
        performanceData: "No disponible",
        teamDynamics: "No evaluadas",
        softSkills: "Evaluación subjetiva",
        riskBadHire: "Alto (68% de falla)",
        upfrontInvestment: "Alto sin garantías",
        deliverables: "Solo CVs y referencias",
        scalability: "Limitada y costosa",
      },
      noCountry: {
        timeToHire: "48 horas",
        accuracy: "Alta (basada en evidencia)",
        fees: "$0 en reclutamiento",
        performanceData: "150+ puntos de datos",
        teamDynamics: "Completamente evaluadas",
        softSkills: "Medidas objetivamente",
        riskBadHire: "Bajo (95% de éxito)",
        upfrontInvestment: "Bajo con resultados garantizados",
        deliverables: "Productos + análisis completo",
        scalability: "Ilimitada y eficiente",
      },
      bottomLine: {
        title: "El Resultado Final",
        savings: "80%",
        savingsDesc: "Reducción en costos de contratación",
        roi: "300%",
        roiDesc: "Retorno de inversión promedio",
        reduction: "90%",
        reductionDesc: "Reducción en riesgo de mala contratación",
      },
    },
    product: {
      badge: "Plataforma",
      title: "Tecnología que Potencia Resultados",
      subtitle: "Nuestra plataforma ofrece visibilidad completa de tus proyectos",
      platformTitle: "Dashboard Empresarial NoCountry",
      platformDesc: "Gestiona todos tus proyectos con métricas en tiempo real",
      stats: {
        teams: "150+",
        teamsDesc: "Equipos activos",
        metrics: "24/7",
        metricsDesc: "Monitoreo continuo",
        uptime: "99.9%",
        uptimeDesc: "Disponibilidad",
      },
      features: {
        dashboard: {
          title: "Dashboard Ejecutivo",
          description: "Vista panorámica con métricas clave",
        },
        analytics: {
          title: "Analytics Avanzado",
          description: "Reportes detallados de rendimiento",
        },
        performance: {
          title: "Gestión de Equipos",
          description: "Herramientas de optimización",
        },
        communication: {
          title: "Comunicación Integrada",
          description: "Canales directos con equipos",
        },
        security: {
          title: "Seguridad Empresarial",
          description: "Protección y cumplimiento",
        },
        matching: {
          title: "Matching Inteligente",
          description: "IA para encontrar equipos perfectos",
        },
      },
      integration: {
        title: "Integraciones Empresariales",
        description: "Conecta con tus herramientas existentes",
      },
      cta: {
        title: "¿Listo para Transformar tu Desarrollo?",
        description: "Únete a las empresas que construyen el futuro con NoCountry",
        startSimulation: "Iniciar Simulación Gratuita",
        scheduleDemo: "Agendar Demo Personalizada",
      },
    },
  },
  en: {
    hero: {
      badge: "Enterprise Solution",
      title: "Discover talent that already solved your problems, before hiring",
      subtitle: "While others keep reading CVs, you can see how validated talent teams solve your needs in real time.",
      description:
        "Access developers, designers, analysts, and specialists across multiple technology sectors to drive innovation in your company.",
      badges: ["No interviews", "No headhunting", "No risk"],
      cta: {
        primary: "Start Simulation",
        secondary: "View Demo",
      },
      verticals: {
        title: "Available Specialties",
        ai: "AI",
        automation: "Automation",
        businessIntelligence: "BI",
        webDevelopment: "Web",
        softwareDevelopment: "Software",
        gameDesign: "Games",
        product: "Product",
        mobileApps: "Mobile",
        dataScience: "Data",
        cybersecurity: "Security",
      },
      dashboard: {
        title: "Active Projects",
        status: "In Progress",
        project1: "AI Platform",
        project2: "E-commerce App",
        project3: "Analytics Dashboard",
        teamTitle: "Assigned Team",
      },
      stats: {
        projects: "500+",
        projectsLabel: "Completed Projects",
        professionals: "2000+",
        professionalsLabel: "Evaluated Professionals",
        success: "95%",
        successLabel: "Success Rate",
      },
    },
    talentWatched: {
      badge: "Watched Talent",
      title: "Every Professional is Evaluated",
      subtitle: "in Real Time",
      evidenceTitle: "Evidence-Based Decisions",
      description:
        "Our continuous observation system guarantees the quality and performance of every team member through real work simulation projects.",
      stats: {
        talentWatched: "Watched Talent",
        talentWatchedDesc: "Professionals evaluated in real projects",
        behavioralData: "Data Points",
        behavioralDataDesc: "Behavioral metrics per professional",
      },
      valuePoints: {
        realPerformance: {
          title: "Real Performance",
          description: "We observe how professionals work on real projects, not in theoretical interviews.",
        },
        teamDynamics: {
          title: "Team Dynamics",
          description: "We evaluate how they collaborate, communicate and solve problems in multidisciplinary teams.",
        },
        behavioralData: {
          title: "Behavioral Data",
          description: "We collect over 150 data points about each person's professional behavior.",
        },
      },
      quote: {
        text: "The future of work requires new ways to evaluate talent. Real-time observation is key.",
        source: "World Economic Forum",
        description:
          "That's why we developed a system that observes and evaluates talent in action, providing unique insights into each professional's real performance.",
      },
    },
    problem: {
      title: "The Traditional Hiring Problem",
      subtitle: "Companies face critical challenges when building tech teams",
      problems: {
        badHires: {
          title: "Bad Hires",
          description: "Traditional processes don't predict real performance",
          stat: "68%",
          statLabel: "of projects fail due to team issues",
        },
        interviewCycles: {
          title: "Long Cycles",
          description: "Interview processes that extend for months",
          stat: "3-6",
          statLabel: "months average to hire",
        },
        resumeTheater: {
          title: "Resume Theater",
          description: "CVs don't reflect real teamwork skills",
          stat: "85%",
          statLabel: "of resumes contain inaccurate information",
        },
        hiddenCosts: {
          title: "Hidden Costs",
          description: "The real cost of a bad hire goes beyond salary",
          stat: "$240K",
          statLabel: "average cost of a bad hire",
        },
      },
      result: {
        title: "The Result: Failed Projects and Wasted Resources",
        description:
          "Without a reliable way to evaluate real talent, companies continue making hiring decisions based on assumptions.",
      },
    },
    solution: {
      badge: "Our Solution",
      title: "Real Work Simulation",
      subtitle: "Observe talent in action before hiring",
      transformation: {
        title: "From Interviews to Evidence",
        traditional: "Traditional Interviews",
        traditionalDesc: "Theoretical questions and subjective evaluations",
        simulation: "Work Simulation",
        simulationDesc: "Real projects with multidisciplinary teams",
      },
      benefits: {
        seeBeforeHire: {
          title: "See Before You Hire",
          description: "Observe how they work on real projects",
        },
        teamDynamics: {
          title: "Team Dynamics",
          description: "Evaluate real collaboration and communication",
        },
        dataDecisions: {
          title: "Data-Driven Decisions",
          description: "Over 150 data points per professional",
        },
        fasterHiring: {
          title: "Faster Hiring",
          description: "Reduce hiring time by 80%",
        },
      },
      collaboration: {
        title: "Real-Time Collaboration",
        description: "Teams working together on real projects",
      },
    },
    howItWorks: {
      badge: "How It Works",
      title: "Simple and Effective Process",
      subtitle: "From definition to delivery, we accompany you every step",
      timelineTitle: "Project Timeline",
      timelineSubtitle: "Structured phases to guarantee success",
      steps: {
        step1: {
          title: "Project Definition",
          description: "We analyze your needs and define the scope",
          details: [
            "Discovery meeting with stakeholders",
            "Technical requirements analysis",
            "Objectives and metrics definition",
          ],
        },
        step2: {
          title: "Team Selection",
          description: "We identify the perfect team for your project",
          details: ["Skills-based matching", "Previous projects review", "Proposed team presentation"],
        },
        step3: {
          title: "Development and Execution",
          description: "The team works with agile methodologies",
          details: ["Development sprints", "Follow-up meetings", "Direct communication"],
        },
        step4: {
          title: "Delivery and Support",
          description: "We deliver the complete project",
          details: ["Testing and quality control", "Complete documentation", "Post-delivery support"],
        },
      },
      timeline: {
        phase1: {
          phase: "Planning",
          duration: "1-2 weeks",
          activities: ["Requirements analysis", "Project architecture", "Team selection"],
        },
        phase2: {
          phase: "Development",
          duration: "4-12 weeks",
          activities: ["Iterative development", "Continuous testing", "Weekly reviews"],
        },
        phase3: {
          phase: "Delivery",
          duration: "1-2 weeks",
          activities: ["Final testing", "Documentation", "Knowledge transfer"],
        },
      },
    },
    continuousValue: {
      badge: "Continuous Value",
      title: "Results that Last",
      subtitle: "Our teams create long-term value for your company",
      quote: {
        text: "The future of work requires new ways to evaluate and develop human talent.",
        source: "World Economic Forum",
        description:
          "That's why we created a system that not only evaluates, but continuously develops our professionals' skills.",
      },
      metrics: {
        unlimited: {
          title: "Unlimited Access",
          description: "To our verified talent base",
        },
        continuous: {
          title: "Continuous Improvement",
          description: "Constant skills development",
        },
        actionable: {
          title: "Actionable Insights",
          description: "Data that drives decisions",
        },
      },
      compounding: {
        title: "Compound Value",
        description: "Each project generates learnings that benefit the next ones",
        timeline: {
          month1: "Month 1",
          month1Desc: "First insights",
          month3: "Month 3",
          month3Desc: "Patterns identified",
          month6: "Month 6",
          month6Desc: "Complete optimization",
          year1: "Year 1",
          year1Desc: "Total transformation",
        },
      },
    },
    deliverables: {
      title: "What You Receive",
      subtitle: "Complete deliverables and detailed documentation",
      items: [
        "Team Skills Dashboard",
        "Functional Prototypes and Products",
        "Individual Performance Analysis",
        "Team Dynamics Insights",
        "Collaboration Documentation",
        "Detailed Behavioral Metrics",
      ],
      slides: {
        skillsDashboard: {
          title: "Skills Dashboard",
          description: "Complete visualization of team competencies",
        },
        prototypes: {
          title: "Functional Prototypes",
          description: "Products developed during simulation",
        },
        analytics: {
          title: "Performance Analysis",
          description: "Detailed metrics for each team member",
        },
        teamInsights: {
          title: "Team Insights",
          description: "Analysis of group dynamics and collaboration",
        },
        collaboration: {
          title: "Collaboration Documentation",
          description: "Complete record of communication and processes",
        },
        behavioral: {
          title: "Behavioral Metrics",
          description: "Deep data on work patterns",
        },
      },
    },
    comparison: {
      title: "NoCountry vs. Traditional Methods",
      subtitle: "Discover why companies choose us",
      features: {
        timeToHire: "Time to Hire",
        accuracy: "Evaluation Accuracy",
        fees: "Recruitment Costs",
        performanceData: "Performance Data",
        teamDynamics: "Team Dynamics",
        softSkills: "Soft Skills",
        riskBadHire: "Bad Hire Risk",
        upfrontInvestment: "Upfront Investment",
        deliverables: "Tangible Deliverables",
        scalability: "Scalability",
      },
      traditional: {
        timeToHire: "3-6 months",
        accuracy: "Low (interview-based)",
        fees: "$50K-150K per position",
        performanceData: "Not available",
        teamDynamics: "Not evaluated",
        softSkills: "Subjective evaluation",
        riskBadHire: "High (68% failure)",
        upfrontInvestment: "High with no guarantees",
        deliverables: "Only CVs and references",
        scalability: "Limited and expensive",
      },
      noCountry: {
        timeToHire: "48 hours",
        accuracy: "High (evidence-based)",
        fees: "$0 in recruitment",
        performanceData: "150+ data points",
        teamDynamics: "Fully evaluated",
        softSkills: "Objectively measured",
        riskBadHire: "Low (95% success)",
        upfrontInvestment: "Low with guaranteed results",
        deliverables: "Products + complete analysis",
        scalability: "Unlimited and efficient",
      },
      bottomLine: {
        title: "The Bottom Line",
        savings: "80%",
        savingsDesc: "Reduction in hiring costs",
        roi: "300%",
        roiDesc: "Average return on investment",
        reduction: "90%",
        reductionDesc: "Reduction in bad hire risk",
      },
    },
    product: {
      badge: "Platform",
      title: "Technology that Powers Results",
      subtitle: "Our platform offers complete visibility of your projects",
      platformTitle: "NoCountry Enterprise Dashboard",
      platformDesc: "Manage all your projects with real-time metrics",
      stats: {
        teams: "150+",
        teamsDesc: "Active teams",
        metrics: "24/7",
        metricsDesc: "Continuous monitoring",
        uptime: "99.9%",
        uptimeDesc: "Availability",
      },
      features: {
        dashboard: {
          title: "Executive Dashboard",
          description: "Panoramic view with key metrics",
        },
        analytics: {
          title: "Advanced Analytics",
          description: "Detailed performance reports",
        },
        performance: {
          title: "Team Management",
          description: "Optimization tools",
        },
        communication: {
          title: "Integrated Communication",
          description: "Direct channels with teams",
        },
        security: {
          title: "Enterprise Security",
          description: "Protection and compliance",
        },
        matching: {
          title: "Smart Matching",
          description: "AI to find perfect teams",
        },
      },
      integration: {
        title: "Enterprise Integrations",
        description: "Connect with your existing tools",
      },
      cta: {
        title: "Ready to Transform Your Development?",
        description: "Join companies building the future with NoCountry",
        startSimulation: "Start Free Simulation",
        scheduleDemo: "Schedule Personalized Demo",
      },
    },
  },
  pt: {
    hero: {
      badge: "Solução Empresarial",
      title: "Descubra talento que já resolveu seus problemas, antes de contratar",
      subtitle:
        "Enquanto outros continuam lendo CVs, você pode ver como equipes de talento validado resolvem suas necessidades em tempo real.",
      description:
        "Acesse desenvolvedores, designers, analistas e especialistas em múltiplos setores tecnológicos para impulsionar a inovação em sua empresa.",
      badges: ["Sem entrevistas", "Sem headhunting", "Sem risco"],
      cta: {
        primary: "Iniciar Simulação",
        secondary: "Ver Demo",
      },
      verticals: {
        title: "Especialidades Disponíveis",
        ai: "IA",
        automation: "Automação",
        businessIntelligence: "BI",
        webDevelopment: "Web",
        softwareDevelopment: "Software",
        gameDesign: "Jogos",
        product: "Produto",
        mobileApps: "Mobile",
        dataScience: "Dados",
        cybersecurity: "Segurança",
      },
      dashboard: {
        title: "Projetos Ativos",
        status: "Em Progresso",
        project1: "Plataforma IA",
        project2: "App E-commerce",
        project3: "Dashboard Analytics",
        teamTitle: "Equipe Designada",
      },
      stats: {
        projects: "500+",
        projectsLabel: "Projetos Concluídos",
        professionals: "2000+",
        professionalsLabel: "Profissionais Avaliados",
        success: "95%",
        successLabel: "Taxa de Sucesso",
      },
    },
    talentWatched: {
      badge: "Talento Observado",
      title: "Cada Profissional é Avaliado",
      subtitle: "em Tempo Real",
      evidenceTitle: "Decisões Baseadas em Evidência",
      description:
        "Nosso sistema de observação contínua garante a qualidade e o desempenho de cada membro da equipe através de projetos reais de simulação de trabalho.",
      stats: {
        talentWatched: "Talento Observado",
        talentWatchedDesc: "Profissionais avaliados em projetos reais",
        behavioralData: "Pontos de Dados",
        behavioralDataDesc: "Métricas comportamentais por profissional",
      },
      valuePoints: {
        realPerformance: {
          title: "Desempenho Real",
          description: "Observamos como os profissionais trabalham em projetos reais, não em entrevistas teóricas.",
        },
        teamDynamics: {
          title: "Dinâmicas de Equipe",
          description: "Avaliamos como colaboram, comunicam e resolvem problemas em equipes multidisciplinares.",
        },
        behavioralData: {
          title: "Dados Comportamentais",
          description: "Coletamos mais de 150 pontos de dados sobre o comportamento profissional de cada pessoa.",
        },
      },
      quote: {
        text: "O futuro do trabalho requer novas formas de avaliar o talento. A observação em tempo real é fundamental.",
        source: "World Economic Forum",
        description:
          "Por isso desenvolvemos um sistema que observa e avalia o talento em ação, fornecendo insights únicos sobre o desempenho real de cada profissional.",
      },
    },
    problem: {
      title: "O Problema da Contratação Tradicional",
      subtitle: "As empresas enfrentam desafios críticos ao formar equipes tecnológicas",
      problems: {
        badHires: {
          title: "Más Contratações",
          description: "Processos tradicionais não preveem o desempenho real",
          stat: "68%",
          statLabel: "dos projetos falham por problemas de equipe",
        },
        interviewCycles: {
          title: "Ciclos Longos",
          description: "Processos de entrevista que se estendem por meses",
          stat: "3-6",
          statLabel: "meses em média para contratar",
        },
        resumeTheater: {
          title: "Teatro de CVs",
          description: "CVs não refletem habilidades reais de trabalho em equipe",
          stat: "85%",
          statLabel: "dos currículos contêm informações imprecisas",
        },
        hiddenCosts: {
          title: "Custos Ocultos",
          description: "O custo real de uma má contratação vai além do salário",
          stat: "$240K",
          statLabel: "custo médio de uma má contratação",
        },
      },
      result: {
        title: "O Resultado: Projetos Falhados e Recursos Desperdiçados",
        description:
          "Sem uma forma confiável de avaliar o talento real, as empresas continuam tomando decisões de contratação baseadas em suposições.",
      },
    },
    solution: {
      badge: "Nossa Solução",
      title: "Simulação de Trabalho Real",
      subtitle: "Observe o talento em ação antes de contratar",
      transformation: {
        title: "De Entrevistas para Evidência",
        traditional: "Entrevistas Tradicionais",
        traditionalDesc: "Perguntas teóricas e avaliações subjetivas",
        simulation: "Simulação de Trabalho",
        simulationDesc: "Projetos reais com equipes multidisciplinares",
      },
      benefits: {
        seeBeforeHire: {
          title: "Veja Antes de Contratar",
          description: "Observe como trabalham em projetos reais",
        },
        teamDynamics: {
          title: "Dinâmicas de Equipe",
          description: "Avalie colaboração e comunicação real",
        },
        dataDecisions: {
          title: "Decisões Baseadas em Dados",
          description: "Mais de 150 pontos de dados por profissional",
        },
        fasterHiring: {
          title: "Contratação Mais Rápida",
          description: "Reduza o tempo de contratação em 80%",
        },
      },
      collaboration: {
        title: "Colaboração em Tempo Real",
        description: "Equipes trabalhando juntas em projetos reais",
      },
    },
    howItWorks: {
      badge: "Como Funciona",
      title: "Processo Simples e Eficaz",
      subtitle: "Da definição à entrega, acompanhamos você em cada passo",
      timelineTitle: "Cronograma do Projeto",
      timelineSubtitle: "Fases estruturadas para garantir o sucesso",
      steps: {
        step1: {
          title: "Definição do Projeto",
          description: "Analisamos suas necessidades e definimos o escopo",
          details: [
            "Reunião de descoberta com stakeholders",
            "Análise de requisitos técnicos",
            "Definição de objetivos e métricas",
          ],
        },
        step2: {
          title: "Seleção da Equipe",
          description: "Identificamos a equipe perfeita para seu projeto",
          details: [
            "Matching baseado em habilidades",
            "Revisão de projetos anteriores",
            "Apresentação da equipe proposta",
          ],
        },
        step3: {
          title: "Desenvolvimento e Execução",
          description: "A equipe trabalha com metodologias ágeis",
          details: ["Sprints de desenvolvimento", "Reuniões de acompanhamento", "Comunicação direta"],
        },
        step4: {
          title: "Entrega e Suporte",
          description: "Entregamos o projeto completo",
          details: ["Testes e controle de qualidade", "Documentação completa", "Suporte pós-entrega"],
        },
      },
      timeline: {
        phase1: {
          phase: "Planejamento",
          duration: "1-2 semanas",
          activities: ["Análise de requisitos", "Arquitetura do projeto", "Seleção da equipe"],
        },
        phase2: {
          phase: "Desenvolvimento",
          duration: "4-12 semanas",
          activities: ["Desenvolvimento iterativo", "Testes contínuos", "Revisões semanais"],
        },
        phase3: {
          phase: "Entrega",
          duration: "1-2 semanas",
          activities: ["Testes finais", "Documentação", "Transferência de conhecimento"],
        },
      },
    },
    continuousValue: {
      badge: "Valor Contínuo",
      title: "Resultados que Perduram",
      subtitle: "Nossas equipes criam valor a longo prazo para sua empresa",
      quote: {
        text: "O futuro do trabalho requer novas formas de avaliar e desenvolver o talento humano.",
        source: "World Economic Forum",
        description:
          "Por isso criamos um sistema que não apenas avalia, mas desenvolve continuamente as habilidades de nossos profissionais.",
      },
      metrics: {
        unlimited: {
          title: "Acesso Ilimitado",
          description: "À nossa base de talento verificado",
        },
        continuous: {
          title: "Melhoria Contínua",
          description: "Desenvolvimento constante de habilidades",
        },
        actionable: {
          title: "Insights Acionáveis",
          description: "Dados que impulsionam decisões",
        },
      },
      compounding: {
        title: "Valor Composto",
        description: "Cada projeto gera aprendizados que beneficiam os próximos",
        timeline: {
          month1: "Mês 1",
          month1Desc: "Primeiros insights",
          month3: "Mês 3",
          month3Desc: "Padrões identificados",
          month6: "Mês 6",
          month6Desc: "Otimização completa",
          year1: "Ano 1",
          year1Desc: "Transformação total",
        },
      },
    },
    deliverables: {
      title: "O Que Você Recebe",
      subtitle: "Entregáveis completos e documentação detalhada",
      items: [
        "Dashboard de Habilidades da Equipe",
        "Protótipos e Produtos Funcionais",
        "Análise de Desempenho Individual",
        "Insights de Dinâmicas de Equipe",
        "Documentação de Colaboração",
        "Métricas Comportamentais Detalhadas",
      ],
      slides: {
        skillsDashboard: {
          title: "Dashboard de Habilidades",
          description: "Visualização completa das competências da equipe",
        },
        prototypes: {
          title: "Protótipos Funcionais",
          description: "Produtos desenvolvidos durante a simulação",
        },
        analytics: {
          title: "Análise de Desempenho",
          description: "Métricas detalhadas para cada membro da equipe",
        },
        teamInsights: {
          title: "Insights da Equipe",
          description: "Análise de dinâmicas e colaboração grupal",
        },
        collaboration: {
          title: "Documentação de Colaboração",
          description: "Registro completo de comunicação e processos",
        },
        behavioral: {
          title: "Métricas Comportamentais",
          description: "Dados profundos sobre padrões de trabalho",
        },
      },
    },
    comparison: {
      title: "NoCountry vs. Métodos Tradicionais",
      subtitle: "Descubra por que as empresas nos escolhem",
      features: {
        timeToHire: "Tempo para Contratar",
        accuracy: "Precisão da Avaliação",
        fees: "Custos de Recrutamento",
        performanceData: "Dados de Desempenho",
        teamDynamics: "Dinâmicas de Equipe",
        softSkills: "Habilidades Interpessoais",
        riskBadHire: "Risco de Má Contratação",
        upfrontInvestment: "Investimento Inicial",
        deliverables: "Entregáveis Tangíveis",
        scalability: "Escalabilidade",
      },
      traditional: {
        timeToHire: "3-6 meses",
        accuracy: "Baixa (baseada em entrevistas)",
        fees: "$50K-150K por posição",
        performanceData: "Não disponível",
        teamDynamics: "Não avaliadas",
        softSkills: "Avaliação subjetiva",
        riskBadHire: "Alto (68% de falha)",
        upfrontInvestment: "Alto sem garantias",
        deliverables: "Apenas CVs e referências",
        scalability: "Limitada e cara",
      },
      noCountry: {
        timeToHire: "48 horas",
        accuracy: "Alta (baseada em evidência)",
        fees: "$0 em recrutamento",
        performanceData: "150+ pontos de dados",
        teamDynamics: "Totalmente avaliadas",
        softSkills: "Medidas objetivamente",
        riskBadHire: "Baixo (95% de sucesso)",
        upfrontInvestment: "Baixo com resultados garantidos",
        deliverables: "Produtos + análise completa",
        scalability: "Ilimitada e eficiente",
      },
      bottomLine: {
        title: "O Resultado Final",
        savings: "80%",
        savingsDesc: "Redução nos custos de contratação",
        roi: "300%",
        roiDesc: "Retorno médio do investimento",
        reduction: "90%",
        reductionDesc: "Redução no risco de má contratação",
      },
    },
    product: {
      badge: "Plataforma",
      title: "Tecnologia que Potencializa Resultados",
      subtitle: "Nossa plataforma oferece visibilidade completa dos seus projetos",
      platformTitle: "Dashboard Empresarial NoCountry",
      platformDesc: "Gerencie todos os seus projetos com métricas em tempo real",
      stats: {
        teams: "150+",
        teamsDesc: "Equipes ativas",
        metrics: "24/7",
        metricsDesc: "Monitoramento contínuo",
        uptime: "99.9%",
        uptimeDesc: "Disponibilidade",
      },
      features: {
        dashboard: {
          title: "Dashboard Executivo",
          description: "Vista panorâmica com métricas-chave",
        },
        analytics: {
          title: "Analytics Avançado",
          description: "Relatórios detalhados de desempenho",
        },
        performance: {
          title: "Gestão de Equipes",
          description: "Ferramentas de otimização",
        },
        communication: {
          title: "Comunicação Integrada",
          description: "Canais diretos com equipes",
        },
        security: {
          title: "Segurança Empresarial",
          description: "Proteção e conformidade",
        },
        matching: {
          title: "Matching Inteligente",
          description: "IA para encontrar equipes perfeitas",
        },
      },
      integration: {
        title: "Integrações Empresariais",
        description: "Conecte com suas ferramentas existentes",
      },
      cta: {
        title: "Pronto para Transformar seu Desenvolvimento?",
        description: "Junte-se às empresas que constroem o futuro com NoCountry",
        startSimulation: "Iniciar Simulação Gratuita",
        scheduleDemo: "Agendar Demo Personalizada",
      },
    },
  },
}
