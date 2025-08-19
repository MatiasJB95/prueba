export type Language = "en" | "es" | "pt"

export interface Translations {
  hero: {
    subtitles: string[]
    jobSimulation: string
    benefits: {
      plugAndPlay: string
      freeTrialBadge: string
      freeTrial: string
      behavioralInsights: string
      softSkills: string
      noRecruitmentFees: string
      remote: string
      lowRiskInnovation: string
    }
    cta: {
      seeTeams: string
      uploadChallenge: string
      forCompanies: string
      joinCommunity: string
      forTalent: string
      comingSoon: string
      comingSoonMessage: string
    }
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      subtitles: [
        "Hire better, start with real simulations",
        "See how teams solve real challenges before you hire",
        "Skip CVs and tests, watch them work before you hire",
        "Turn business problems into working prototypes",
        "No upfront cost, no recruitment fees",
        "Soft Skills, measured in action",
        "Plug & play for your business needs",
      ],
      jobSimulation: "Job Simulation",
      benefits: {
        plugAndPlay: "Plug & play for your business needs",
        noRecruitmentFeesBadge: "🚀 No recruitment fees!",
        noRecruitmentFeesText: "No recruitment fees",
        behavioralInsights: "Behavioral insights per team",
        softSkills: "Soft skills, measured in action",
        noRecruitmentFees: "No recruitment fees",
        remote: "100% remote",
        lowRiskInnovation: "Low-risk innovation",
      },
      cta: {
        seeTeams: "See teams solving real challenges",
        uploadChallenge: "Upload a challenge",
        forCompanies: "For Companies",
        joinCommunity: "Join the Community",
        forTalent: "For Talent",
        comingSoon: "✨ Coming soon! ✨",
        comingSoonMessage:
          "Soon you'll be able to explore teams solving real challenges from companies like yours.",
      },
    },
  },
  es: {
    hero: {
      subtitles: [
        "Contrata mejor, comienza con simulaciones laborales",
        "Observa cómo los equipos resuelven desafíos reales antes de contratar",
        "Salta los CV y tests, observa su trabajo antes de contratar",
        "Convierte problemas de negocio en prototipos funcionales",
      ],
      jobSimulation: "Simulación Laboral",
      benefits: {
        plugAndPlay: "Listo para usar en tu negocio",
        noRecruitmentFeesBadge: "🚀 ¡Sin tarifas de reclutamiento!",
        noRecruitmentFeesText: "Sin tarifas de reclutamiento",
        behavioralInsights: "Insights por equipo",
        softSkills: "Habilidades blandas, medidas en acción",
        noRecruitmentFees: "Sin tarifas de reclutamiento",
        remote: "100% remoto",
        lowRiskInnovation: "Innovación de bajo riesgo",
      },
      cta: {
        seeTeams: "Ver equipos resolviendo desafíos reales",
        uploadChallenge: "Subir un desafío",
        forCompanies: "Para Empresas",
        joinCommunity: "Unirse a la Comunidad",
        forTalent: "Para Talentos",
        comingSoon: "✨ ¡Próximamente! ✨",
        comingSoonMessage:
          "Pronto podrás explorar equipos resolviendo desafíos reales de empresas.",
      },
    },
  },
  pt: {
    hero: {
      subtitles: [
        "Contrate melhor, comece com simulações reais",
        "Veja como as equipes resolvem desafios reais antes de contratar",
        "Pule CVs e testes, observe o trabalho deles antes de contratar",
        "Transforme problemas de negócios em protótipos funcionais",
      ],
      jobSimulation: "Simulação de Trabalho",
      benefits: {
        plugAndPlay: "Pronto para usar no seu negócio",
        noRecruitmentFeesBadge: "🚀 Sem taxas de recrutamento!",
        noRecruitmentFeesText: "Sem taxas de recrutamento",
        behavioralInsights: "Insights comportamentais por equipe",
        softSkills: "Habilidades interpessoais, medidas em ação",
        noRecruitmentFees: "Sem taxas de recrutamento",
        remote: "100% remoto",
        lowRiskInnovation: "Inovação de baixo risco",
      },
      cta: {
        seeTeams: "Ver equipes resolvendo desafios reais",
        uploadChallenge: "Enviar um desafio",
        forCompanies: "Para Empresas",
        joinCommunity: "Junte-se à Comunidade",
        forTalent: "Para Talentos",
        comingSoon: "✨ Em breve! ✨",
        comingSoonMessage:
          "Em breve você poderá explorar equipes reais resolvendo desafios reais de empresas como a sua.",
      },
    },
  },
}
