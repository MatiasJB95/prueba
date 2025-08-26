export type CompanyLogo = { src: string; name: string }

export function getCompanyLogo(sector: string): CompanyLogo {
  const logoMap: Record<string, CompanyLogo> = {
    Fintech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oracle-6-logo-black-and-white-QhvwdkPfUxMfeI5gSFrKgWJC7jtGje.png",
      name: "Oracle",
    },
    Healthtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MercadoLibre-Grey-hXmUGSwIOo3txGHRWbRMnFA19jLhB5.png",
      name: "MercadoLibre",
    },
    Edtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portable-network-graphics-microsoft-corporation-transparency-logo-vector-graphics-png-favpng-j09ZSr1J8jPvdtKU43pHMxnit.jpg-T7zL85n8HpD8h2gcnAszIJbKywrZ4Y.jpeg",
      name: "Microsoft",
    },
    Retail: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MercadoLibre-Grey-hXmUGSwIOo3txGHRWbRMnFA19jLhB5.png",
      name: "MercadoLibre",
    },
    Crypto: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oracle-6-logo-black-and-white-QhvwdkPfUxMfeI5gSFrKgWJC7jtGje.png",
      name: "Oracle",
    },
    Insurtech: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portable-network-graphics-microsoft-corporation-transparency-logo-vector-graphics-png-favpng-j09ZSr1J8jPvdtKU43pHMxnit.jpg-T7zL85n8HpD8h2gcnAszIJbKywrZ4Y.jpeg",
      name: "Microsoft",
    },
  }
  return logoMap[sector] || { src: "/generic-company-logo.png", name: "Company" }
}