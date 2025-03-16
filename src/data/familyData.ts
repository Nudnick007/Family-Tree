import { FamilyMember } from '../types/family';

export const familyData: FamilyMember[] = [
  { 
    id: "1", 
    name: "Kurian", 
    img: "https://via.placeholder.com/100", 
    spouse: "", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["2"], 
    gender: "male",
    parents: []
  },
  { 
    id: "2", 
    name: "Paapi", 
    img: "https://via.placeholder.com/100", 
    spouse: "", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["3"], 
    parents: ["1"],
    gender: "male" 
  },
  { 
    id: "3", 
    name: "Prince Philip", 
    img: "https://via.placeholder.com/100", 
    spouse: "Elizabeth II", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["4"], 
    parents: ["2"],
    gender: "male" 
  },
  { 
    id: "4", 
    name: "Charles III", 
    img: "https://via.placeholder.com/100", 
    spouse: "Diana, Princess of Wales", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["5", "6"], 
    parents: ["3"],
    gender: "male" 
  },
  { 
    id: "5", 
    name: "William, Prince of Wales", 
    img: "https://via.placeholder.com/100", 
    spouse: "Catherine, Princess of Wales", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["7", "8", "9"], 
    parents: ["4"],
    gender: "male" 
  },
  { 
    id: "6", 
    name: "Prince Harry", 
    img: "https://via.placeholder.com/100", 
    spouse: "Meghan, Duchess of Sussex", 
    spouseImg: "https://via.placeholder.com/100",
    children: ["10", "11"], 
    parents: ["4"],
    gender: "male" 
  },
  { 
    id: "7", 
    name: "Prince George of Wales", 
    img: "https://via.placeholder.com/100", 
    parents: ["5"],
    gender: "male",
    children: []
  },
  { 
    id: "8", 
    name: "Princess Charlotte of Wales", 
    img: "https://via.placeholder.com/100", 
    parents: ["5"],
    gender: "female",
    children: []
  },
  { 
    id: "9", 
    name: "Prince Louis of Wales", 
    img: "https://via.placeholder.com/100", 
    parents: ["5"],
    gender: "male",
    children: []
  },
  { 
    id: "10", 
    name: "Prince Archie of Sussex", 
    img: "https://via.placeholder.com/100", 
    parents: ["6"],
    gender: "male",
    children: []
  },
  { 
    id: "11", 
    name: "Princess Lilibet of Sussex", 
    img: "https://via.placeholder.com/100", 
    parents: ["6"],
    gender: "female",
    children: []
  },
  { 
    id: "12",
    name: "Itaak",
    img: "https://via.placeholder.com/100", 
    spouse: "", 
    spouseImg: "https://via.placeholder.com/100",
    children: [], 
    parents: ["1"],
    gender: "male" 
  }
];