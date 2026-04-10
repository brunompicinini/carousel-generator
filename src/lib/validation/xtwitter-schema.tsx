import * as z from "zod";
import { ElementType } from "./element-type";

// XTwitter element pulls name/handle/avatar from config.brand at render time,
// so it has no editable fields of its own beyond the discriminator.
export const XTwitterSchema = z.object({
  type: z
    .literal(ElementType.enum.XTwitter)
    .default(ElementType.enum.XTwitter),
});

export const DEFAULT_XTWITTER: z.infer<typeof XTwitterSchema> =
  XTwitterSchema.parse({});
