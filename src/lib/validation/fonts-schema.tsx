import * as z from "zod";
import { FontSizeType } from "@/lib/validation/text-schema";

export const FontStyleSchema = z.object({
  lineHeight: z.number().min(0.5).max(4).default(1.3),
  letterSpacing: z.number().min(-0.1).max(0.5).default(0),
  fontWeight: z.number().min(100).max(900).step(100).default(700),
  textBalance: z.boolean().default(false),
  fontSize: FontSizeType.default(FontSizeType.enum.Medium),
});

export const FontsSchema = z.object({
  font1: z.string(),
  font2: z.string(),
  font1Style: FontStyleSchema.default({}),
  font2Style: FontStyleSchema.default({}),
});
