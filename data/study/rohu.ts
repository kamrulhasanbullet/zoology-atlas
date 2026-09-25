import type { StudyTopic } from "@/types/zoology";

export const rohuStudy: StudyTopic = {
  animalSlug: "rohu",

  overview: {
    id: "rohu-overview",
    title: "Overview",
    content: "Verified study content for Rohu is being prepared.",
    status: "pending",
  },

  detailedSections: [
    {
      id: "rohu-external-morphology",
      title: "External Morphology",
      content:
        "Verified educational content for external morphology is being prepared.",
      status: "pending",
    },
    {
      id: "rohu-internal-anatomy",
      title: "Internal Anatomy",
      content:
        "Verified educational content for internal anatomy is being prepared.",
      status: "pending",
    },
    {
      id: "rohu-organ-systems",
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
      id: "rohu-study-diagram",
      title: "Rohu Anatomy Diagram",
      description: "A verified anatomy diagram will be connected here.",
      assetType: "none",
      verified: false,
    },
  ],

  tables: [],
};
