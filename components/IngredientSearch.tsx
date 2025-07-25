// components/IngredientSearch.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function IngredientSearch({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value.trim() !== "") {
      onSearch(value.trim());
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <Input
        placeholder="Search for an ingredient..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
