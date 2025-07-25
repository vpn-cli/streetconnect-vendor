// components/IngredientSearch.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";

interface Props {
  onSearch: (value: string) => void;
}

export default function IngredientSearch({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch ingredients from TheMealDB API
  type MealDBIngredient = { strIngredient: string };
  useEffect(() => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          setIngredients(data.meals.map((item: MealDBIngredient) => item.strIngredient));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const fuse = useMemo(
    () => new Fuse(ingredients, { threshold: 0.4 }),
    [ingredients]
  );
  const results = value.trim() ? fuse.search(value).map((r) => r.item) : [];

  const handleSearch = () => {
    if (selected) {
      onSearch(selected);
      setValue("");
      setSelected(null);
      setShowDropdown(false);
    } else if (results.length > 0) {
      onSearch(results[0]);
      setValue("");
      setSelected(null);
      setShowDropdown(false);
    } else if (value.trim() !== "") {
      onSearch(value.trim());
      setValue("");
      setSelected(null);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropdown(true);
    setSelected(null);
  };

  const handleSelect = (ingredient: string) => {
    setSelected(ingredient);
    setValue(ingredient);
    setShowDropdown(false);
    onSearch(ingredient);
  };

  return (
    <div
      className="relative flex flex-col items-start gap-2 mb-6 w-full max-w-md"
    >
      <div className="flex w-full gap-2">
        <Input
          placeholder="Search for an ingredient..."
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="text-white placeholder-gray-400 border-gray-700 focus:border-blue-500 focus:ring-blue-500 rounded-full"
        />
        <Button
          className="font-semibold rounded-full px-6 py-2 shadow-lg text-white transition-all duration-200 hover:scale-105 hover:shadow-xl border-0 bg-blue-600 hover:bg-blue-700"
          onClick={handleSearch}
        >
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>
      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-[#23272f] border border-gray-700 rounded-xl shadow-lg mt-1 z-10 max-h-56 overflow-auto">
          {results.map((ingredient) => (
            <li
              key={ingredient}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-900 rounded-xl transition-all text-white"
              onMouseDown={() => handleSelect(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
