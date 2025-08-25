export interface LocalizedText {
  lang: string;
  content: string;
}

export interface CodeType {
  code: string;
  type: string;
}

export interface Subject {
  code: string;
  name?: string;
  type: string;
}

export interface Credits {
  system: CodeType;
  credits: number;
}

export interface Education {
  identifier: string;
  resultIsDegree: boolean;
  expires?: string;
  recommendedPriorKnowledge?: LocalizedText[];
  code?: string;
  configuration?: CodeType;
  subject?: Subject[];
  description?: LocalizedText[];
  lastEdited?: string;
  title?: LocalizedText[];
  isVocational?: boolean | null;
  urls?: string[];
  form?: CodeType;
  credits?: Credits;
  educationLevel?: CodeType;
  eligibleForStudentAid?: CodeType;
}

export interface ProviderSummary {
  providers: string[];
}

export interface Execution {
  start: string;
  end: string;
}

export interface EventSummary {
  regionCode?: string[];
  paceOfStudyPercentage?: number[];
  tuitionFee?: string[];
  executions?: Execution[];
  languageOfInstruction?: string[];
  distance?: boolean;
  timeOfStudy?: string[];
  municipalityCode?: string[];
  onlyAsPartOfProgram?: string[];
}

export interface ResponseData {
  id: string;
  education?: Education;
  providerSummary?: ProviderSummary;
  eventSummary?: EventSummary;
}
