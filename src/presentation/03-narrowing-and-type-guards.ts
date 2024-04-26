// Type Guards

// 1. What are type guards?
// -----------------------------------------------
// Type guards are some expression that performs a runtime check that guarantees the type in some scope.

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

type Thing = {
  name: string;
  value: number;
};

function isThing(value: unknown): value is Thing {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "value" in value
  );
}

// They are still dangerous! But at least it's controlled danger.
const myFruit = "banana";
const isBanana = (fruit: string): fruit is "banana" => {
  // ❌ This is wrong!  But no type error.
  return fruit === "apple";
};

// Why is this better than a type cast?
// - It's controlled.
// - It's more descriptive.
// - Avoids one-off type casts.
// ... but remember that they're still dangerous! Type Guards should have unit tests.
