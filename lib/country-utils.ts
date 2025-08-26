const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()

// Mapa de nombres comunes (ES/EN/alias) → ISO alpha-2
const COUNTRY_NAME_TO_ISO: Record<string, string> = {
  // América
  "argentina": "AR",
  "mexico": "MX",
  "méxico": "MX",
  "venezuela": "VE",
  "chile": "CL",
  "peru": "PE",
  "perú": "PE",
  "uruguay": "UY",
  "paraguay": "PY",
  "bolivia": "BO",
  "colombia": "CO",
  "ecuador": "EC",
  "brasil": "BR",
  "brazil": "BR",
  "guatemala": "GT",
  "costarica": "CR",
  "costa rica": "CR",
  "panama": "PA",
  "panamá": "PA",
  "dominican republic": "DO",
  "republica dominicana": "DO",
  "rep publica dominicana": "DO",
  "puerto rico": "PR",
  "canada": "CA",
  "canadá": "CA",
  "united states": "US",
  "usa": "US",
  "us": "US",
  "eeuu": "US",
  "estados unidos": "US",

  // Europa
  "espana": "ES",
  "españa": "ES",
  "spain": "ES",
  "france": "FR",
  "francia": "FR",
  "germany": "DE",
  "alemania": "DE",
  "italy": "IT",
  "italia": "IT",
  "united kingdom": "GB",
  "uk": "GB",
  "reino unido": "GB",
  "portugal": "PT",
  "ireland": "IE",
  "irlanda": "IE",
  "netherlands": "NL",
  "paises bajos": "NL",
  "países bajos": "NL",
  "belgium": "BE",
  "belgica": "BE",
  "bélgica": "BE",
  "sweden": "SE",
  "suecia": "SE",
  "norway": "NO",
  "noruega": "NO",
  "denmark": "DK",
  "dinamarca": "DK",
  "finland": "FI",
  "finlandia": "FI",

  // Asia & Oceanía
  "india": "IN",
  "china": "CN",
  "japan": "JP",
  "japon": "JP",
  "japón": "JP",
  "south korea": "KR",
  "corea del sur": "KR",
  "australia": "AU",
  "new zealand": "NZ",
  "nueva zelanda": "NZ",
  "nueva zelanda": "NZ",

  // África (algunos comunes)
  "egypt": "EG",
  "egipto": "EG",
  "south africa": "ZA",
  "sudafrica": "ZA",
  "sudáfrica": "ZA",
  "morocco": "MA",
  "marruecos": "MA",
}

export function isoToFlagEmoji(iso?: string): string {
  if (!iso || iso.length !== 2) return "🌍"
  const code = iso.toUpperCase()
  const A = 0x1F1E6 // Regional Indicator Symbol Letter A
  const first = code.charCodeAt(0) - 65 + A
  const second = code.charCodeAt(1) - 65 + A
  return String.fromCodePoint(first) + String.fromCodePoint(second)
}

export function guessIsoFromCountry(country?: string): string | null {
  if (!country) return null
  const key = norm(country)
  // match exact or without espacios
  const direct = COUNTRY_NAME_TO_ISO[key]
  if (direct) return direct
  const compact = COUNTRY_NAME_TO_ISO[key.replace(/\s+/g, "")]
  if (compact) return compact
  return null
}

export function countryToFlag(country?: string): string {
  const iso = guessIsoFromCountry(country) || null
  return isoToFlagEmoji(iso || undefined)
}

/**
 * Devuelve un objeto conveniente para UI:
 *  - flag: emoji
 *  - label: país original o 'Unknown'
 *  - iso: código ISO o null
 */
export function formatCountryWithFlag(country?: string) {
  const iso = guessIsoFromCountry(country)
  const flag = isoToFlagEmoji(iso || undefined)
  const label = country && country.trim() ? country : "Unknown"
  return { flag, label, iso }
}