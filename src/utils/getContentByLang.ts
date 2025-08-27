export // funktion som hämtar lang === swe
const getContentByLang = (
  items: { lang: string; content: string }[] | undefined,
  lang = "swe"
) => items?.find((i) => i.lang === lang)?.content ?? null;
