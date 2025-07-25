"use client";
import { useState } from "react";
import IngredientSearch from "../../components/IngredientSearch";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  // add other fields as needed
};

export default function Home() {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Mock supplier data
  const suppliers = [
    {
      id: 1,
      name: "FreshMart",
      rating: 4.7,
      review: "Always delivers on time and the quality is top notch!",
    },
    {
      id: 2,
      name: "VeggieHub",
      rating: 4.5,
      review: "Great selection of fresh produce and friendly service.",
    },
    {
      id: 3,
      name: "UrbanGrocer",
      rating: 4.2,
      review: "Good prices and reliable, but sometimes out of stock.",
    },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "linear-gradient(135deg, #111 60%, #222 100%)" }}
    >
      <main className="p-4 max-w-4xl mx-auto text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome, Vendor!</h1>

        {!orderConfirmed && (
          <>
            <IngredientSearch onSearch={setSelectedIngredient} />
            {/* SupplierList and Cart will go here later */}
            {selectedIngredient && (
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
                    <div className="text-gray-300 text-sm italic">&quot;{supplier.review}&quot;</div>
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
