export interface Animal {
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;

  kingdom: string;
  phylum: string;
  class?: string;
  order?: string;
  family?: string;

  description: string;

  habitat?: string;

  systems: string[];

  image?: string;

  status?: "available" | "coming-soon";
}

export interface TaxonomyNode {
  name: string;
  rank: string;
  children?: TaxonomyNode[];
}
