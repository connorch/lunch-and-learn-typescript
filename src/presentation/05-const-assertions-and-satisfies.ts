// Const Assertions and Satisfies

type Animal = {
  name: string;
  legs: number;
};

type Fruit = {
  name: string;
  color: string;
};

// 2. Casts vs Assertions
// ----------------------
// cast = a way for you to tell the compiler that you know better than it does.
// assertion = a way for you to provide hints to the compiler on how you want your code to be analyzed.
//
// ...these two definitions are actually debated in the TypeScript community.  But for the purposes of this presentation, we'll use these definitions.

// Cast - tells typescript to trust us and use the type we're casting to
const imposterOrange = {
  name: "orange",
  // where did the color go?
} as Fruit;

// Assertion - tells typescript to use the narrowest representation of the type (a literal)
const orangeLiteral = {
  name: "orange",
  color: "orange",
} as const;

// 2. `as const`
// ----------------------
// But wait... didn't we just talk about how "as Fruit" is bad???  Why can we use `as const`?
// `as const` isn't a cast.  It's an assertion.
//
// cast = a way for you to tell the compiler that you know better than it does.
// assertion = a way for you to provide hints to the compiler on how you want your code to be analyzed.
//
// `as const` is a way to assert that a value is a literal type.  This is a good thing because it narrows the type of the value.

const apple1 = {
  name: "apple",
  color: "red",
} as const;

const apple2 = {
  name: "apple",
  color: "red",
};

// Why is it `readonly`?
// @ts-expect-error
apple1.color = "green"; // Errors - good! 🚀
apple2.color = "green"; // Mutable - usually bad

// 3. Satisfies
// ------------
// `as const` is a form of assertion.  Another form of assertion is `satisfies`.
// `satisfies` is a way to assert that a value meets a certain condition without changing the type of the value.
const banana1 = {
  name: "banana",
  color: "yellow",
} satisfies Fruit; // Passes - good! 😁

const banana2 = {
  name: "banana",
  // @ts-expect-error
  color: "yellow", // Errors - good! 🚀
} satisfies Animal;

// 4. `as const satisfies` power combo
// -----------------------------------
// `as const` and `satisfies` can be combined to create powerful assertions.
// This is useful when you want to assert that a value meets a certain condition, but also want to maintain the type's most-narrow representation (literal type)

const lemon1 = {
  name: "lemon",
  // @ts-expect-error
  color: "yellow", // Errors - good!
} as const satisfies Animal;

// lemon2 is a literal!
const lemon2 = {
  name: "lemon",
  color: "yellow",
} as const satisfies Fruit;
