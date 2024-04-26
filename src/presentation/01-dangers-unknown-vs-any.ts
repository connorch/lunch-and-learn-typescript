// "unknown" vs "any"

// 1. The "any" Type
// -----------------
// The `any` type is the most permissive type in TypeScript. It allows you to perform any operations on values typed as `any`,
// bypassing the compiler's type checking.  This can lead to errors that TypeScript normally would catch.

// Examples:
let anything: any = "could be a string";
anything = 42; // now it's a number
anything = true; // now it's a boolean
anything.trim(); // ❌ no build error!  It will fail at runtime.

// 2. The "unknown" Type
// ---------------------
// The `unknown` type represents any value but unlike `any`, operations on an `unknown` value are not allowed until the type
// is asserted or narrowed to a more specific type.

// Example of using `unknown`:
let unknownValue: unknown = "could be anything";
// @ts-expect-error
unknownValue.trim(); // ✅ good error!

// Unknown forces us to narrow the type first to use it safely
if (typeof unknownValue === "string") {
  console.log(
    `unknownValue is a string and its length is: ${unknownValue.trim().length}`
  );
}

// 3. Comparison and When to Use
// -----------------------------
// - Use `any` if you need to quickly prototype and you are not concerned about type safety at all. Almost never use in universe.
// - Use `unknown` when you need to accept all types but still want to maintain type safety by forcing type checks before performing operations.

// Best Practices:
// - Prefer `unknown` over `any` to maintain type safety.
// - Use type guards to narrow down the type of `unknown` before performing operations.

// 4. When `any` is actually needed
// ---------------------------------
// Rarely truly needed in practice, except for these two cases:

// a. Type Argument Constraints
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// b. Returning Conditional Types From Generic Functions
const youSayGoodbyeISayHello = (input: "hello" | "goodbye") => {
  if (input === "goodbye") {
    return "hello";
  } else {
    return "goodbye";
  }
};

// Not going to get into them right now, but read this article for more info!
// https://www.totaltypescript.com/any-considered-harmful
