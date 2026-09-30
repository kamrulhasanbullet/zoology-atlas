import type { EvolutionNode } from "@/types/zoology";

export const evolutionNodes: EvolutionNode[] = [
  {
    id: "protozoa",
    name: "Protozoa",
    group: "Early Eukaryotic Organisms",
    description:
      "Evolutionary data for this group is currently being prepared and verified.",
    verified: false,
  },

  {
    id: "porifera",
    name: "Porifera",
    group: "Invertebrates",
    description:
      "Evolutionary position and relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "cnidaria",
    name: "Cnidaria",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "platyhelminthes",
    name: "Platyhelminthes",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "annelida",
    name: "Annelida",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "arthropoda",
    name: "Arthropoda",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "mollusca",
    name: "Mollusca",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "echinodermata",
    name: "Echinodermata",
    group: "Invertebrates",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },

  {
    id: "chordata",
    name: "Chordata",
    group: "Deuterostomes",
    description:
      "Evolutionary relationships are pending scientific verification.",
    verified: false,
  },
];

export function getEvolutionNode(id: string) {
  return evolutionNodes.find((node) => node.id === id);
}
