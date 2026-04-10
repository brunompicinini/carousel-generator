"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  DocumentFormReturn,
  ElementFieldPath,
} from "@/lib/document-form-types";
import { TweetBlock } from "@/components/elements/tweet-block";
import { useSelectionContext } from "@/lib/providers/selection-context";
import { usePagerContext } from "@/lib/providers/pager-context";
import { getSlideNumber } from "@/lib/field-path";

export function XTwitter({
  fieldName,
  className,
}: {
  fieldName: ElementFieldPath;
  className?: string;
}) {
  const form: DocumentFormReturn = useFormContext();
  const config = form.watch("config");
  const { currentSelection, setCurrentSelection } = useSelectionContext();
  const { setCurrentPage } = usePagerContext();
  const pageNumber = getSlideNumber(fieldName);
  const isSelected = currentSelection === fieldName;

  return (
    <div
      className={cn(
        "w-full rounded-md outline-transparent ring-offset-background mb-2",
        isSelected && "outline-input ring-2 ring-offset-2 ring-ring",
        className
      )}
      onClick={(event) => {
        setCurrentPage(pageNumber);
        setCurrentSelection(fieldName, event);
      }}
    >
      <TweetBlock
        config={config}
        name={config.brand.name}
        handle={config.brand.handle}
        avatar={config.brand.avatar}
      />
    </div>
  );
}
