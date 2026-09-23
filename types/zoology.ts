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

  /**
   * Future:
   * - 3D model
   * - 2D image
   * - SVG
   * - hotspot coordinates
   */
  assetType?: "none" | "2d" | "3d";
  assetUrl?: string;

  verified: boolean;
}

export interface AnimalAnatomy {
  animalSlug: string;

  systems: AnatomySystem[];

  structures: AnatomyStructure[];

  /**
   * Future virtual dissection flow.
   */
  dissectionAvailable: boolean;
}
