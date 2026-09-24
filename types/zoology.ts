export type AnimalStatus = "available" | "coming-soon";

export type AnatomySystem =
  | "external"
  | "skeletal"
  | "muscular"
  | "digestive"
  | "respiratory"
  | "circulatory"
  | "excretory"
  | "nervous"
  | "reproductive";

export interface Animal {
  slug: string;
  commonName: string;
  scientificName: string;
  phylum: string;
  className: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;

  description: string;
  habitat?: string;

  systems: AnatomySystem[];

  status: AnimalStatus;
}

export interface TaxonomyNode {
  name: string;

  rank:
    | "Kingdom"
    | "Phylum"
    | "Class"
    | "Order"
    | "Family"
    | "Genus"
    | "Species";

  children?: TaxonomyNode[];

  organisms?: {
    slug: string;
    commonName: string;
    scientificName: string;
  }[];
}

export interface AnatomyStructure {
  id: string;
  animalSlug: string;
  system: AnatomySystem;

  name: string;
  shortDescription?: string;

  assetType?: "none" | "2d" | "3d";
  assetUrl?: string;

  verified: boolean;
}

export interface DissectionLayer {
  id: string;

  animalSlug: string;

  order: number;

  name: string;

  description: string;

  function: string;

  relatedSystem?: AnatomySystem;

  status: "available" | "pending";

  assetType?: "none" | "2d" | "3d";

  assetUrl?: string;

  verified: boolean;
}

export interface AnimalAnatomy {
  animalSlug: string;

  systems: AnatomySystem[];

  structures: AnatomyStructure[];

  dissectionLayers: DissectionLayer[];

  dissectionAvailable: boolean;
}
