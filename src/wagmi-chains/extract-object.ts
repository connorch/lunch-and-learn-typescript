/**
 * Extracts objects that meet a condition from a union of objects.
 *
 * Similar to `Extract`, but type-safe for objects
 */
export type ExtractObject<
  TObject extends Record<string, unknown>,
  TNarrowedObject extends Partial<TObject>
> = Extract<TObject, TNarrowedObject>;

/**
 * EXAMPLE USAGE:
 */
type AorB = { a: 1; foo: "foo" } | { b: 2; bar: "bar" };
type A = ExtractObject<AorB, { a: 1 }>;
//   ^?
