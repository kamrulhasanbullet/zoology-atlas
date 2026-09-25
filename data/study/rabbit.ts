import type { StudyTopic } from "@/types/zoology";

export const rabbitStudy: StudyTopic = {
  animalSlug: "rabbit",

  overview: {
    id: "rabbit-overview",
    title: "Overview",
    content: "Verified study content for Rabbit is being prepared.",
    status: "pending",
  },

  detailedSections: [
    {
      id: "rabbit-external-morphology",
      title: "External Morphology",
      content:
        "Verified educational content for external morphology is being prepared.",
      status: "pending",
    },
    {
      id: "rabbit-internal-anatomy",
      title: "Internal Anatomy",
      content:
        "Verified educational content for internal anatomy is being prepared.",
      status: "pending",
    },
    {
      id: "rabbit-organ-systems",
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
      id: "rabbit-study-diagram",
      title: "Rabbit Anatomy Diagram",
      description: "A verified anatomy diagram will be connected here.",
      assetType: "none",
      verified: false,
    },
  ],

  tables: [],
};
