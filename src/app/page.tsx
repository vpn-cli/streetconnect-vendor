"use client";
import { useState } from "react";
import IngredientSearch from "../../components/IngredientSearch";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  // add other fields as needed
};

type Supplier = {
  id: string;
  name: string;
  rating: string;
  review: string;
};

// Helper to generate random supplier data
function generateSuppliers(ingredient: string, count = 3) {
  const supplierNames = [
    "FreshMart", "VeggieHub", "UrbanGrocer", "GreenBasket", "Farm2Table", "HarvestPro", "DailyGrocer", "MarketMakers", "PureProduce", "AgroConnect"
  ];
  const reviews = [
    `Great quality ${ingredient}, will order again!`,
    `Fast delivery and fresh ${ingredient}.`,
    `The ${ingredient} was top notch, highly recommend!`,
    `Good prices for ${ingredient}, but could be fresher.`,
    `Excellent service and the ${ingredient} was perfect.`,
    `Very satisfied with the ${ingredient} quality.`,
    `The ${ingredient} was okay, but delivery was slow.`,
    `Loved the packaging and the ${ingredient} freshness.`,
    `Best place for ${ingredient} in town!`,
    `Would buy ${ingredient} from them again.`
  ];
  const usedNames = new Set();
  return Array.from({ length: count }).map(() => {
    let name;
    do {
      name = supplierNames[Math.floor(Math.random() * supplierNames.length)];
    } while (usedNames.has(name));
    usedNames.add(name);
    return {
      id: Math.random().toString(36).slice(2),
      name,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      review: reviews[Math.floor(Math.random() * reviews.length)],
    };
  });
}

export default function Home() {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Generate new suppliers when a new ingredient is searched
  function handleIngredientSearch(ingredient: string) {
    setSelectedIngredient(ingredient);
    setSuppliers(
      generateSuppliers(ingredient, 3 + Math.floor(Math.random() * 3))
    );
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(135deg, #111 60%, #222 100%)" }}
    >
      <main className="p-4 max-w-4xl mx-auto text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome, Vendor!</h1>

        {!orderConfirmed && (
          <>
            <IngredientSearch onSearch={handleIngredientSearch} />
            {/* SupplierList and Cart will go here later */}
            {selectedIngredient && suppliers.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-[#18181b] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        {supplier.name}
                      </span>
                      <span className="text-yellow-400 font-bold">
                        ★ {supplier.rating}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm italic">
                      &quot;{supplier.review}&quot;
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {orderConfirmed && (
          <div className="text-green-600 text-lg font-semibold">
            ✅ Order confirmed!
          </div>
        )}
      </main>
    </div>
  );
}
