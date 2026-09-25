import type { StudyTopic } from "@/types/zoology";

export const frogStudy: StudyTopic = {
  animalSlug: "frog",

  overview: {
    id: "frog-overview",
    title: "Overview",
    content: "Verified study content for Frog is being prepared.",
    status: "pending",
  },

  detailedSections: [
    {
      id: "frog-external-morphology",
      title: "External Morphology",
      content:
        "Verified educational content for external morphology is being prepared.",
      status: "pending",
    },
    {
      id: "frog-internal-anatomy",
      title: "Internal Anatomy",
      content:
        "Verified educational content for internal anatomy is being prepared.",
      status: "pending",
    },
    {
      id: "frog-organ-systems",
      title: "Organ Systems",
      content:
        "Verified educational content for organ systems is being prepared.",
      status: "pending",
    },
  ],

  importantTerms: [],

  keyCharacteristics: [],

  importantFacts: [],

  diagrams: [
    {
      id: "frog-study-diagram",
      title: "Frog Anatomy Diagram",
      description: "A verified anatomy diagram will be connected here.",
      assetType: "none",
      verified: false,
    },
  ],

  tables: [],
};
