import type { AnimalAnatomy } from "@/types/zoology";

export const frogAnatomy: AnimalAnatomy = {
  animalSlug: "frog",

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
      id: "frog-external",
      animalSlug: "frog",
      system: "external",
      name: "External Morphology",
      shortDescription:
        "Verified external morphology visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "frog-skeletal",
      animalSlug: "frog",
      system: "skeletal",
      name: "Skeletal System",
      shortDescription: "Verified skeletal visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "frog-digestive",
      animalSlug: "frog",
      system: "digestive",
      name: "Digestive System",
      shortDescription: "Verified digestive-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "frog-respiratory",
      animalSlug: "frog",
      system: "respiratory",
      name: "Respiratory System",
      shortDescription: "Verified respiratory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "frog-circulatory",
      animalSlug: "frog",
      system: "circulatory",
      name: "Circulatory System",
      shortDescription: "Verified circulatory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },
  ],

  dissectionAvailable: false,
};
