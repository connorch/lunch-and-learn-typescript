// Type Casts! 💀

// Type casts allow developers to override the inferred type
// by TypeScript and treat a variable as a different type.
// This can be helpful in certain situations but also poses
// risks if not used carefully.

// 1. Basic Type Casts
// -------------------
// Example of angle-bracket syntax:
let someValue: unknown = "foo";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;

// 2. Other forms of Type Casts
// -------------------
const maybeString: string | undefined = "foo";
const definitelyString: string = maybeString!;
const plsDontDoThis = maybeString as unknown as { potato: "potato" }; // 😱😱😱

// 3. Risks of Using Type Casts
// ----------------------------
// Type casts can lead to issues if the cast is incorrect at runtime. This can result in runtime errors that TypeScript
// would typically prevent.

// Risky example - This will compile but can lead to runtime errors:
let num: any = "hello";
let numAsNumber: number = num as number; // Incorrect cast, num is actually a string
console.log(`Number after incorrect cast: ${numAsNumber * 2}`); // Output will be NaN

// 2. Best Practices
// -------------------------
// Below is my ↪️oPiNiOn↩️.  This may differ from others' philosophy, but we should come to general alignment as a team.

// a. You're building a quick prototype (hackathons, but not in universe).
// b. You are using an external "trusted" data source of type `any`
//     ↪️ "trusted" is rare.
//     ↪️ "any" is a code smell.
//     ↪️ Consider using runtime validation instead (`instanceOf Error`, zod/joi, type-narrowing, type-guards).
// c. You've tried everything else (including asking your team for help) and can't get it to work - don't let the perfect be the enemy of the good.
//     ↪️ TypeScript can be tricky.
//     ↪️ Usually this is avoidable.
//     ↪️ If you're here, double-check the runtime edge cases and at add unit tests.
