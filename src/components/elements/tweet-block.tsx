/* eslint-disable @next/next/no-img-element */
import React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { ImageSchema } from "@/lib/validation/image-schema";
import { fontIdToClassName } from "@/lib/fonts-map";

export function TweetBlock({
  config,
  name,
  handle,
  avatar,
  className,
  nameSlot,
  handleSlot,
  onAvatarClick,
}: {
  config: z.infer<typeof ConfigSchema>;
  name: string;
  handle: string;
  avatar: z.infer<typeof ImageSchema>;
  className?: string;
  nameSlot?: React.ReactNode;
  handleSlot?: React.ReactNode;
  onAvatarClick?: (event: React.MouseEvent) => void;
}) {
  const avatarSrc = avatar?.source?.src;
  const avatarOpacity = (avatar?.style?.opacity ?? 100) / 100;
  const fontClass = fontIdToClassName(config.fonts.font2);

  return (
    <div
      className={cn(
        "flex flex-row gap-3 items-center w-full min-w-0",
        className
      )}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-muted"
        onClick={onAvatarClick}
        style={onAvatarClick ? { cursor: "pointer" } : undefined}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="w-full h-full object-cover"
            style={{ opacity: avatarOpacity }}
          />
        ) : null}
      </div>
      <div className="flex flex-col min-w-0 flex-1 leading-tight">
        {nameSlot ?? (
          <p
            className={cn("text-base font-bold truncate", fontClass)}
            style={{ color: config.theme.primary }}
          >
            {name}
          </p>
        )}
        {handleSlot ?? (
          <p
            className={cn("text-sm font-normal truncate", fontClass)}
            style={{ color: config.theme.secondary, opacity: 0.7 }}
          >
            {handle}
          </p>
        )}
      </div>
    </div>
  );
}
