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

  return (
    <div className="min-h-screen w-full" style={{ background: "linear-gradient(135deg, #111 60%, #222 100%)" }}>
      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
            Welcome, Vendor! 
        </h1>

        {!orderConfirmed && (
          <>
            <IngredientSearch onSearch={setSelectedIngredient} />
            {/* SupplierList and Cart will go here later */}
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
