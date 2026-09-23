import type { AnimalAnatomy } from "@/types/zoology";

export const rohuAnatomy: AnimalAnatomy = {
  animalSlug: "rohu",

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
      id: "rohu-external",
      animalSlug: "rohu",
      system: "external",
      name: "External Morphology",
      shortDescription:
        "Verified external morphology visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rohu-skeletal",
      animalSlug: "rohu",
      system: "skeletal",
      name: "Skeletal System",
      shortDescription: "Verified skeletal visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rohu-digestive",
      animalSlug: "rohu",
      system: "digestive",
      name: "Digestive System",
      shortDescription: "Verified digestive-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rohu-respiratory",
      animalSlug: "rohu",
      system: "respiratory",
      name: "Respiratory System",
      shortDescription: "Verified respiratory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },

    {
      id: "rohu-circulatory",
      animalSlug: "rohu",
      system: "circulatory",
      name: "Circulatory System",
      shortDescription: "Verified circulatory-system visualization is pending.",
      assetType: "none",
      verified: false,
    },
  ],

  dissectionAvailable: false,
};
