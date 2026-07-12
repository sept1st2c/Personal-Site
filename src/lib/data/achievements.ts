export type Achievement = {
  category: string;
  items: string[];
  /** Optional image path for achievements that have supporting photos
   * (e.g. hackathon trophies, event photos, certificates). More are
   * expected to be appended later, with images. */
  image?: string;
};

export const achievements: Achievement[] = [
  {
    category: "LeetCode",
    items: ["1830+ rating, 400+ problems solved"],
  },
  {
    category: "Hackathons",
    items: [
      "Winner — Hackacino (2025)",
      "2nd place — Code Dust (2025)",
      "4th place — Smart India Hackathon, BU (2024)",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Tech Head @ Google Developer Groups, BU",
      "Full Stack Club, BU",
    ],
  },
];
