import type { AnimalAnatomy } from "@/types/zoology";

export const rabbitAnatomy: AnimalAnatomy = {
  animalSlug: "rabbit",

  systems: [
    "external",
    "skeletal",
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
      id: "rabbit-external",
      animalSlug: "rabbit",
      system: "external",
      name: "External Morphology",
      shortDescription:
        "Verified external morphology visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rabbit-skeletal",
      animalSlug: "rabbit",
      system: "skeletal",
      name: "Skeletal System",
      shortDescription: "Verified skeletal visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rabbit-digestive",
      animalSlug: "rabbit",
      system: "digestive",
      name: "Digestive System",
      shortDescription: "Verified digestive-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rabbit-respiratory",
      animalSlug: "rabbit",
      system: "respiratory",
      name: "Respiratory System",
      shortDescription: "Verified respiratory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rabbit-nervous",
      animalSlug: "rabbit",
      system: "nervous",
      name: "Nervous System",
      shortDescription: "Verified nervous-system visualization is pending.",
      assetType: "none",
      verified: false,
    },
  ],

  dissectionAvailable: false,
};
