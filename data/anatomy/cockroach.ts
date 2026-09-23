import type { AnimalAnatomy } from "@/types/zoology";

export const cockroachAnatomy: AnimalAnatomy = {
  animalSlug: "cockroach",

  systems: [
    "external",
    "muscular",
    "digestive",
    "respiratory",
    "circulatory",
    "excretory",
    "nervous",
    "reproductive",
  ],

  structures: [
    {
      id: "cockroach-external",
      animalSlug: "cockroach",
      system: "external",
      name: "External Morphology",
      shortDescription:
        "Interactive external anatomy asset will be added after scientific asset verification.",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-digestive",
      animalSlug: "cockroach",
      system: "digestive",
      name: "Digestive System",
      shortDescription: "Verified digestive-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-respiratory",
      animalSlug: "cockroach",
      system: "respiratory",
      name: "Respiratory System",
      shortDescription: "Verified respiratory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-nervous",
      animalSlug: "cockroach",
      system: "nervous",
      name: "Nervous System",
      shortDescription: "Verified nervous-system visualization is pending.",
      assetType: "none",
      verified: false,
    },
  ],

  dissectionAvailable: false,
};
