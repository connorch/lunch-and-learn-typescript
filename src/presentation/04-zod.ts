// Runtime validation libraries, such as Zod or Joi,
// can be super useful for type-guarding
// https://zod.dev/

import { getAddress, isAddress } from "viem";
import { z } from "zod";

const tokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
});

// Drive the type from the zod schema - only define in one place
type Token = z.infer<typeof tokenSchema>;
const isToken = (value: unknown): value is Token => {
  return tokenSchema.safeParse(value).success;
};

// 2. What if I want to use a custom type in my schema?
// -----------------------------------------------
export const addressSchema = z.string().refine(isAddress);
export type Address = z.infer<typeof addressSchema>;
//           ^?

const fancyTokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: addressSchema,
});

// 3. When to use?
// -----------------------------------------------
// - When you need to validate data at runtime (ex: data from an external source)
// - When building type-guards for more complex types
