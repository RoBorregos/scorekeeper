export type CompetitionField = {
  id: string;
  label: string;
  description: string;
  score: number;
  maxCount: number;
  includeInCoreTotal?: boolean;
};

export type Competition = {
  id: string;
  name: string;
  description: string;
  referenceTotal: number;
  fields: CompetitionField[];
};

export type ScoreBreakdown = CompetitionField & {
  value: number;
  contribution: number;
};

export const sectionOrder = [
  "Greeting",
  "Introduction",
  "Guiding",
  "Penalties",
  "Special penalties & bonuses",
] as const;

export const competitions: Competition[] = [
  {
    id: "home-hri",
    name: "@Home - Human Robot Interaction Challenge",
    description:
      "Action Score for the first @Home competition, with special penalties and bonuses tracked separately.",
    referenceTotal: 1450,
    fields: [
      {
        id: "greeting-doorbell",
        label: "Detect the doorbell sound as a signal that a guest has arrived",
        description: "Greeting",
        score: 30,
        maxCount: 2,
      },
      {
        id: "greeting-door",
        label: "Open the entrance door for a guest",
        description: "Greeting",
        score: 200,
        maxCount: 2,
      },
      {
        id: "greeting-eye-contact",
        label: "Look at the person talking, when receiving a guest",
        description: "Greeting",
        score: 50,
        maxCount: 2,
      },
      {
        id: "greeting-seat",
        label: "Offer a free seat to the new guest",
        description: "Greeting",
        score: 100,
        maxCount: 2,
      },
      {
        id: "greeting-navigation",
        label: "Look in the direction of navigation or at the navigation goal",
        description: "Greeting",
        score: 15,
        maxCount: 2,
      },
      {
        id: "greeting-visual-correct",
        label: "Correct attribute",
        description:
          "Tell a visual attribute of the first guest to the second guest.",
        score: 20,
        maxCount: 4,
      },
      {
        id: "greeting-visual-incorrect",
        label: "Incorrect attribute",
        description:
          "Tell a visual attribute of the first guest to the second guest.",
        score: -20,
        maxCount: 4,
      },
      {
        id: "greeting-visual-no-questions",
        label:
          "Not asking non-essential questions to confirm or correct information",
        description:
          "Tell a visual attribute of the first guest to the second guest.",
        score: 15,
        maxCount: 4,
      },
      {
        id: "introduction-name-drink",
        label:
          "Say name and favorite drink of each guest (during introduction)",
        description: "Introduction",
        score: 30,
        maxCount: 4,
      },
      {
        id: "introduction-eye-contact",
        label:
          "While introducing guests, look to the correct guest while talking about the other guest",
        description: "Introduction",
        score: 50,
        maxCount: 2,
      },
      {
        id: "guiding-handover",
        label: "Grab the bag via natural handover from the guest",
        description: "Guiding",
        score: 50,
        maxCount: 1,
      },
      {
        id: "guiding-host-follow",
        label: "Following the host to the bag drop area",
        description: "Guiding",
        score: 200,
        maxCount: 1,
      },
      {
        id: "guiding-drop-bag-following",
        label: "Drop the bag while following the host",
        description: "Guiding",
        score: -50,
        maxCount: 1,
      },
      {
        id: "guiding-rediscover-operator",
        label: "Rediscovering the operator by natural interaction",
        description: "Guiding",
        score: -50,
        maxCount: 1,
      },
      {
        id: "guiding-ask-wait",
        label: "Asking the operator to wait",
        description: "Guiding",
        score: -50,
        maxCount: 1,
      },
      {
        id: "guiding-physical-contact",
        label: "Guiding the robot with physical contact (take by the hand)",
        description: "Guiding",
        score: -150,
        maxCount: 1,
      },
      {
        id: "guiding-drop-correct-area",
        label: "Drop the bag in the correct area",
        description: "Guiding",
        score: 50,
        maxCount: 1,
      },
      {
        id: "penalties-wrong-info",
        label: "Wrong guest information was memorized",
        description: "Penalties",
        score: -40,
        maxCount: 4,
      },
      {
        id: "penalties-alternative-hri",
        label: "Alternative HRI",
        description: "Penalties",
        score: -20,
        maxCount: 6,
      },
      {
        id: "penalties-not-acknowledging",
        label: "Not acknowledging people",
        description: "Penalties",
        score: -200,
        maxCount: 2,
      },
      {
        id: "penalties-bag-on-robot",
        label: "Ask the guest to place the bag somewhere on the robot",
        description: "Penalties",
        score: -25,
        maxCount: 1,
      },
      {
        id: "special-not-attending",
        label: "Not attending (see sec. 3.8.1)",
        description: "Special penalties & bonuses",
        score: -500,
        maxCount: 1,
        includeInCoreTotal: false,
      },
      {
        id: "special-outstanding-performance",
        label: "Outstanding performance (see sec. 3.8.3)",
        description: "Special penalties & bonuses",
        score: 145,
        maxCount: 1,
        includeInCoreTotal: false,
      },
    ],
  },
];
