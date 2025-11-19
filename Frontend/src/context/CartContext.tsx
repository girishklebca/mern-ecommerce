import React, { createContext, useContext, useState } from "react";

// Types
export type Product = {
  id?: string | number;
  img: string;
  title: string;
  company?: string;
  newPrice: number | string;
  prevPrice?: number | string;
};

export type CartItem = Product & {
  id: string | number;
  qty: number;
};

type State = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string | number } }
  | { type: "UPDATE_QTY"; payload: { id: string | number; qty: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (p: Product) => void;
  removeItem: (id: string | number) => void;
  updateQty: (id: string | number, qty: number) => void;
  clearCart: () => void;
} | null>(null);

export const CartProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Keep things simple for now: in-memory only (no localStorage)
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (p: Product) => {
    const id = p.id ?? p.title;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      const newItem: CartItem = { ...(p as Product), id, qty: 1 } as CartItem;
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string | number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string | number, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default CartContext;
