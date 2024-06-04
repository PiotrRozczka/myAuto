import { z } from "zod";

export const searchValidator = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
});
