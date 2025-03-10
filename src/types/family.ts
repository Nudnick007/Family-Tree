export interface FamilyMember {
    id: string;
    name: string;
    img: string;
    spouse?: string;
    spouseImg?: string;
    children: string[];
    parents: string[];
    gender: "male" | "female";
  }