// Const Assertion Magic!
// ---------------------
// Okay, now let's talk about why this stuff is actually so powerful.

import { ExtractObject, Prettify } from "../helpers/type-utils";

type Sport = {
  name: string;
  equipment: string;
  isBallsport: boolean;
};

const hockey = {
  name: "basketball",
  equipment: "puck",
  isBallsport: false,
} as const satisfies Sport;

const soccer = {
  name: "soccer",
  equipment: "ball",
  isBallsport: true,
} as const satisfies Sport;

const basketball = {
  name: "basketball",
  equipment: "ball",
  isBallsport: true,
} as const satisfies Sport;

const skiing = {
  name: "skiing",
  equipment: "skis",
  isBallsport: false,
} as const satisfies Sport;

const mySports = [
  skiing,
  hockey,
  soccer,
  basketball,
] as const satisfies Sport[];
export type MySport<
  partialChain extends Partial<(typeof mySports)[number]> = Partial<
    (typeof mySports)[number]
  >
> = Prettify<ExtractObject<(typeof mySports)[number], partialChain>>;

// Accepts a property of MySport
function useEquipment(equipment: MySport["equipment"]) {
  // ✅ A non-equipment string can never accidentally be passed in.
  console.log(`Using equipment: ${equipment}`);
}

// Accepts a variant of MySport
// Don't need custom names for each variant
function useBallSport(sport: MySport<{ isBallsport: true }>) {
  console.log(
    // Infer the type of other properties! (sport.equipment)
    `The ball sports are ${sport.name}, and they use ${sport.equipment}`
  );
}
