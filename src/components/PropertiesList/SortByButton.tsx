interface SortButtonProps {
  sortBy: SortOption;
  onClick: () => void;
  options: Record<SortOption, { label: string; icon: React.ReactNode }>;
}

import React from "react";
import Button from "../ui/button";
import { SortOption } from "./PropertiesList";

export default function SortByButton({
  sortBy,
  onClick,
  options,
}: SortButtonProps) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      aria-label={`Ordenar por ${options[sortBy].label}`}
    >
      {options[sortBy].icon}
      {options[sortBy].label}
    </Button>
  );
}
