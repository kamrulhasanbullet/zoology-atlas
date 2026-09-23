export interface Animal {
  id: string;
  commonName: string;
  scientificName: string;
  slug: string;
  phylum: string;
  className: string;
  habitat: string;
  shortDescription: string;
  status: "available" | "coming-soon";
}

export interface TaxonomyNode {
  name: string;
  rank: string;
  children?: TaxonomyNode[];
  organisms?: string[];
}

export type AnatomySystem =
  | "external"
  | "muscular"
  | "skeletal"
  | "digestive"
  | "respiratory"
  | "circulatory"
  | "nervous"
  | "reproductive";

export interface AnatomyStructure {
  id: string;
  name: string;
  system: AnatomySystem;
  description: string;
  function: string;
  verified: boolean;
}
