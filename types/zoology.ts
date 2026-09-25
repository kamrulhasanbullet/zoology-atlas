export type AnimalStatus = "available" | "coming-soon";

export type AnatomySystem =
  | "external"
  | "skeletal"
  | "muscular"
  | "digestive"
  | "respiratory"
  | "circulatory"
  | "excretory"
  | "nervous"
  | "reproductive";

export interface Animal {
  slug: string;
  commonName: string;
  scientificName: string;
  phylum: string;
  className: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;

  description: string;
  habitat?: string;

  systems: AnatomySystem[];

  status: AnimalStatus;
}

export interface TaxonomyNode {
  name: string;

  rank:
    | "Kingdom"
    | "Phylum"
    | "Class"
    | "Order"
    | "Family"
    | "Genus"
    | "Species";

  children?: TaxonomyNode[];

  organisms?: {
    slug: string;
    commonName: string;
    scientificName: string;
  }[];
}

export interface AnatomyStructure {
  id: string;
  animalSlug: string;
  system: AnatomySystem;

  name: string;
  shortDescription?: string;

  assetType?: "none" | "2d" | "3d";
  assetUrl?: string;

  verified: boolean;
}

export interface DissectionLayer {
  id: string;

  animalSlug: string;

  order: number;

  name: string;

  description: string;

  function: string;

  relatedSystem?: AnatomySystem;

  status: "available" | "pending";

  assetType?: "none" | "2d" | "3d";

  assetUrl?: string;

  verified: boolean;
}

export interface AnimalAnatomy {
  animalSlug: string;

  systems: AnatomySystem[];

  structures: AnatomyStructure[];

  dissectionLayers: DissectionLayer[];

  dissectionAvailable: boolean;
}

export type ComparisonCategory =
  | "classification"
  | "habitat"
  | "bodyCovering"
  | "skeleton"
  | "heart"
  | "circulation"
  | "respiration"
  | "digestion"
  | "excretion"
  | "reproduction"
  | "fertilization"
  | "development";

export interface ComparativeData {
  animalSlug: string;

  classification: string;
  habitat: string;
  bodyCovering: string;
  skeleton: string;
  heart: string;
  circulation: string;
  respiration: string;
  digestion: string;
  excretion: string;
  reproduction: string;
  fertilization: string;
  development: string;
}

export interface StudySection {
  id: string;
  title: string;
  content: string;
  status: "available" | "pending";
}

export interface StudyTopic {
  animalSlug: string;

  overview: StudySection;

  detailedSections: StudySection[];

  importantTerms: string[];

  keyCharacteristics: string[];

  importantFacts: string[];

  diagrams: {
    id: string;
    title: string;
    description: string;
    assetType: "none" | "image" | "svg" | "3d";
    assetUrl?: string;
    verified: boolean;
  }[];

  tables: {
    id: string;
    title: string;
    columns: string[];
    rows: string[][];
    verified: boolean;
  }[];
}

export type QuizQuestionType = "mcq" | "true-false" | "classification";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  animalSlug: string;

  type: QuizQuestionType;

  question: string;

  options: QuizOption[];

  correctAnswer: string;

  explanation: string;

  verified: boolean;
}

export interface VivaQuestion {
  id: string;
  animalSlug: string;
  question: string;
  answer: string;
  hint?: string;
  verified: boolean;
}
