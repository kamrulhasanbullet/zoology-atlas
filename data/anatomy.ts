import { AnatomyStructure, AnatomySystem } from "@/types/zoology";

export const anatomySystems: {
  id: AnatomySystem;
  label: string;
}[] = [
  {
    id: "external",
    label: "External Morphology",
  },
  {
    id: "muscular",
    label: "Muscular System",
  },
  {
    id: "skeletal",
    label: "Skeletal System",
  },
  {
    id: "digestive",
    label: "Digestive System",
  },
  {
    id: "respiratory",
    label: "Respiratory System",
  },
  {
    id: "circulatory",
    label: "Circulatory System",
  },
  {
    id: "nervous",
    label: "Nervous System",
  },
  {
    id: "reproductive",
    label: "Reproductive System",
  },
];

export const anatomyStructures: AnatomyStructure[] = [
  {
    id: "demo-external",
    name: "External Structure",
    system: "external",
    description:
      "Verified anatomical content will be connected here when the corresponding educational asset is available.",
    function:
      "Structure information will be added from a verified zoological source.",
    verified: false,
  },
];
