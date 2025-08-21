export interface Education {
  id: string; // Unikt id för utbildningen
  code?: string; // Programkod, t.ex. "YH00794"
  title?: string; // Utbildningens titel
  description?: string; // Beskrivning av utbildningen
  providers?: string[]; // Lista med utbildningsanordnare
  credits?: number; // Antal poäng (t.ex. 400)
  educationLevelCode?: string; // Utbildningsnivå, t.ex. "ISCED_5B"
  formCode?: string; // Form, t.ex. "yrkeshögskoleutbildning"
  distance?: boolean; // Om utbildningen är på distans
  executions?: { start: string; end: string }[]; // Start- och slutdatum för utbildningen
}

interface EventSummary {
  paceOfStudyPercentage?: number[]; //Studietakt
  regionCode?: string[]; //områdes kod
}

export interface ResponseData {
  education?: Education;
  eventSummary?: EventSummary;
}
