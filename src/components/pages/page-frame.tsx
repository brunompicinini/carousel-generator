import React from "react";
import { cn } from "@/lib/utils";
import { usePagerContext } from "@/lib/providers/pager-context";
import { getParent, getSlideNumber } from "@/lib/field-path";
import { useSelection } from "@/lib/hooks/use-selection";
import { useSelectionContext } from "@/lib/providers/selection-context";

export function PageFrame({
  children,
  fieldName,
  className,
  style,
}: {
  children: React.ReactNode;
  fieldName: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { setCurrentPage } = usePagerContext();
  const { setCurrentSelection } = useSelectionContext();
  const pageNumber = getSlideNumber(fieldName);

  return (
    <div
      className={cn("grid h-full w-full", className)}
      style={{
        ...style,
        gridTemplateRows: "1fr auto",
      }}
      onClick={(event) => {
        setCurrentPage(pageNumber);
        setCurrentSelection(fieldName, event);
      }}
    >
      {children}
    </div>
  );
}
