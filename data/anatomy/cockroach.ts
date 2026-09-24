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
        "Verified external morphology visualization is pending.",
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

  dissectionLayers: [
    {
      id: "cockroach-external-layer",
      animalSlug: "cockroach",
      order: 1,
      name: "External Body",
      description:
        "Verified educational description for the external body is pending.",
      function: "Scientific functional information is pending verification.",
      relatedSystem: "external",
      status: "pending",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-covering-layer",
      animalSlug: "cockroach",
      order: 2,
      name: "Body Covering / Exoskeleton",
      description:
        "Verified educational description for the body covering is pending.",
      function: "Scientific functional information is pending verification.",
      relatedSystem: "external",
      status: "pending",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-muscular-layer",
      animalSlug: "cockroach",
      order: 3,
      name: "Muscular Layer",
      description:
        "Verified educational description for the muscular layer is pending.",
      function: "Scientific functional information is pending verification.",
      relatedSystem: "muscular",
      status: "pending",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-internal-layer",
      animalSlug: "cockroach",
      order: 4,
      name: "Internal Organs",
      description:
        "Verified educational description for internal organs is pending.",
      function: "Scientific functional information is pending verification.",
      status: "pending",
      assetType: "none",
      verified: false,
    },

    {
      id: "cockroach-systems-layer",
      animalSlug: "cockroach",
      order: 5,
      name: "Organ Systems",
      description: "Verified organ-system visualization is pending.",
      function: "Scientific functional information is pending verification.",
      status: "pending",
      assetType: "none",
      verified: false,
    },
  ],

  dissectionAvailable: true,
};
