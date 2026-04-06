import * as z from "zod";
import {
  FontSizeType,
  TextALignType,
  TextStyleSchema,
} from "@/lib/validation/text-schema";

export function textStyleToClasses({
  style,
  sizes,
  globalFontSize,
}: {
  style: z.infer<typeof TextStyleSchema>;
  sizes: [string, string, string];
  globalFontSize?: FontSizeType;
}): string {
  const fontSize = style.fontSize ?? globalFontSize ?? FontSizeType.enum.Medium;
  const { align } = style;
  const classes = [];

  classes.push(
    fontSize == FontSizeType.enum.Large
      ? sizes[0]
      : fontSize == FontSizeType.enum.Medium
      ? sizes[1]
      : fontSize == FontSizeType.enum.Small
      ? sizes[2]
      : ""
  );
  classes.push(
    align == TextALignType.enum.Left
      ? "text-left"
      : align == TextALignType.enum.Center
      ? "text-center"
      : align == TextALignType.enum.Right
      ? "text-right"
      : ""
  );
  return classes.join(" ");
}
