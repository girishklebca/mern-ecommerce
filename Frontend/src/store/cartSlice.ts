import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id?: string | number;
  img: string;
  title: string;
  company?: string;
  newPrice: number | string;
  prevPrice?: number | string;
  color?: string;
  category?: string;
};

export type CartItem = Product & { id: string | number; qty: number };

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const id = p.id ?? p.title;
      const existing = state.items.find((i) => String(i.id) === String(id));
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...(p as Product), id: id as any, qty: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter(
        (i) => String(i.id) !== String(action.payload)
      );
    },
    updateQty(
      state,
      action: PayloadAction<{ id: string | number; qty: number }>
    ) {
      const { id, qty } = action.payload;
      state.items = state.items
        .map((i) => (String(i.id) === String(id) ? { ...i, qty } : i))
        .filter((i) => i.qty > 0);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
