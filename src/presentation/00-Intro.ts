import { Equal, Expect, Prettify } from "../helpers/type-utils";

// 1. Overview
// -----------------------------------------------

// 00  - Quick review of the basics
// 01  - Unknown vs Any - how to use them best
// 03  - Narrowing and Type Guards
// 04  - Zod - runtime validation
// 05  - Const Assertions and Satisfies
// 06a - Const Assertion Example - Putting it all together
// 06b - Counter Example

// Bonus: Wagmi Chains Demo
//        - a fun example of using the strategies discussed today
//          to optimize type-safety for a complex object that we use!

// Things we won't talk about today
// - Basics
// - Advanced generics
// - Overloads
// - Conditional types
// - Other advanced techniques
// ...maybe in a future workshop!

// 2. Quick Review
// -----------------------------------------------
// Basic Types
type PrimitiveType = string | number | boolean | null | undefined;
type ObjectType = Record<string, unknown>;
type ArrayyType = unknown[];
type FunctionType = (...args: unknown[]) => unknown;

// Basic Generics
type Maybe<T> = T | undefined;
type ToBeOrNotToBeAString = Maybe<string>;
//     ^?

// Built-in Utility Types
type NonNullableString = NonNullable<string>;
type ReadonlyString = Readonly<string>;
type PartialObject = Partial<{ foo: "foo" }>;
type RequiredObject = Required<{ foo?: "foo" }>;
type PickObject = Pick<{ foo: "foo"; bar: "bar" }, "foo">;
type RecordObject = Record<"foo" | "bar", string>;
type ExcludeType = Exclude<string | number, number>;
type ExtractType = Extract<string | number, number>;
type FunctionReturnType = ReturnType<() => "foo">;

// Check out the ../helpers/type-utils.ts file
type Prettified = Prettify<{ a: string } & { b: string } & { c: number }>;
//    ^?

// Templates
type Address = `0x${string}`;

// Literals
type TrueType = true;
type FalseType = false;
type BananaType = "banana";

// Array vs Tuple
type ArrayType = (string | number)[];
type TupleType = [string, number];

type FirstArrayItem = ArrayType[0];
//     ^?
type FirstTupleItem = TupleType[0];
//     ^?

// Union vs Intersection
type Foo = { foo: "foo"; hello: "world!" };
type Bar = { bar: "bar"; hello: "world!" };

type UnionType = Prettify<Foo | Bar>;
type IntersectionType = Prettify<Foo & Bar>;

// Basic narrowing - taking a wider type and making it more specific
function narrowType1(value: string | number) {
  if (typeof value === "string") {
    value;
    //  ^?
  } else {
    value;
    //  ^?
  }
}
