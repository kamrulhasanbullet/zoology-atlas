import { TaxonomyNode } from "@/types/zoology";

export const taxonomy: TaxonomyNode = {
  name: "Animalia",
  rank: "Kingdom",

  children: [
    {
      name: "Protozoa",
      rank: "Group",
      children: [
        {
          name: "Amoeba",
          rank: "Organism",
        },
        {
          name: "Paramecium",
          rank: "Organism",
        },
        {
          name: "Euglena",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Porifera",
      rank: "Phylum",
      children: [
        {
          name: "Sycon",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Cnidaria",
      rank: "Phylum",
      children: [
        {
          name: "Hydra",
          rank: "Organism",
        },
        {
          name: "Aurelia",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Platyhelminthes",
      rank: "Phylum",
      children: [
        {
          name: "Fasciola hepatica",
          rank: "Organism",
        },
        {
          name: "Taenia",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Nematoda",
      rank: "Phylum",
      children: [
        {
          name: "Ascaris",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Annelida",
      rank: "Phylum",
      children: [
        {
          name: "Hirudinaria",
          rank: "Organism",
        },
        {
          name: "Pheretima",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Arthropoda",
      rank: "Phylum",
      children: [
        {
          name: "Cockroach",
          rank: "Organism",
        },
        {
          name: "Prawn",
          rank: "Organism",
        },
        {
          name: "Honey Bee",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Mollusca",
      rank: "Phylum",
      children: [
        {
          name: "Unio",
          rank: "Organism",
        },
        {
          name: "Pila",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Echinodermata",
      rank: "Phylum",
      children: [
        {
          name: "Asterias",
          rank: "Organism",
        },
      ],
    },

    {
      name: "Chordata",
      rank: "Phylum",
      children: [
        {
          name: "Branchiostoma",
          rank: "Organism",
        },
        {
          name: "Rohu",
          rank: "Organism",
        },
        {
          name: "Frog",
          rank: "Organism",
        },
        {
          name: "Pigeon",
          rank: "Organism",
        },
        {
          name: "Rabbit",
          rank: "Organism",
        },
      ],
    },
  ],
};
