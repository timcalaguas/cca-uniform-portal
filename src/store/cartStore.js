// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // remove item if quantity is zero or negative
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
