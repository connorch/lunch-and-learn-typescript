// Const Assertion Magic - Counter Example
// This is just a showcase of how the same code looks without using
// const assertions and satisfies.

import { ExtractObject, Prettify } from "../helpers/type-utils";

type Sport = {
  name: string;
  equipment: string;
  isBallsport: boolean;
};

const hockey: Sport = {
  name: "basketball",
  equipment: "puck",
  isBallsport: false,
};

const soccer: Sport = {
  name: "soccer",
  equipment: "ball",
  isBallsport: true,
};

const basketball: Sport = {
  name: "basketball",
  equipment: "ball",
  isBallsport: true,
};

const skiing: Sport = {
  name: "skiing",
  equipment: "skis",
  isBallsport: false,
};

const mySports: Sport[] = [
  skiing,
  hockey,
  soccer,
  basketball,
] as const satisfies Sport[];
// MySport can't be narrowed - just keeping this here for comparison with the const-asserted other example
// export type MySport<
//   partialChain extends Partial<(typeof mySports)[number]> = Partial<
//     (typeof mySports)[number]
//   >
// > = Prettify<ExtractObject<(typeof mySports)[number], partialChain>>;

// Accepts a property of Sport
function useEquipment(equipment: Sport["equipment"]) {
  // 🟡 any string can be passed in - not just equipment.
  console.log(`Using equipment: ${equipment}`);
}

// ❌ Can't accepts a variant of Sport like this
// // `sport` is now "never", i.e. it's not a valid type.
// function useBallSport(sport: Sport<{ isBallsport: true }>) {
//   console.log(
//     // @ts-expect-error Can't do this!
//     `The ball sports are ${sport.name}, and they use ${sport.equipment}`
//   );
// }

// Instead we would do this (or use a generic to handle this in a slightly safer format)
type BaseSport = {
  name: string;
};
type AnySport = BaseSport & {
  equipment: string;
  isBallsport: boolean;
};
type BallSport = BaseSport & {
  equipment: "ball";
  isBallsport: true;
};

function useBallSport(sport: BallSport) {
  console.log(
    // And this is still less type-safe than literals.  And we don't get any type inference for the other properties (without doing extra work to define more type variants)
    `The ball sports are ${sport.name}, and they use ${sport.equipment}`
  );
}

// A lot to worry about and maintain:
// - Need a new type for every variant, or you need to deal with complex generics to get it working?
// - Lots of new type names, and naming things is hard.
// - What properties belong on the base vs each variant?
// - No type inference for the other properties, so you need to handle those specially
// - Make sure that the properties are correct for each variant, or use a generic utility type to keep them aligned
// - Even after all of this, your types are only as narrow as you explicitly define, never as narrow (and thus never as safe) as the literal.
