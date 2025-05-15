import type { AddCartProductType } from "../types";
import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface CartState {
    cart: AddCartProductType[];
    addProduct: (product: AddCartProductType) => void;
    removeProduct: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            addProduct: (product) => {
                const currentCart = get().cart;

                const existingProduct = currentCart.find(p => p.id === product.id);

                if (existingProduct) {
                    // aumentar la cantidad si ya existe
                    const updatedCart = currentCart.map(p =>
                        p.id === product.id ? { ...p, amount: (p.amount || 1) + 1 } : p
                    );
                    set({ cart: updatedCart });
                } else {
                    // agregarlo si no existe
                    set({ cart: [...currentCart, { ...product, amount: 1 }] });
                }
            },
            removeProduct: (id) => {
                const currentCart = get().cart;

                const existingProduct = currentCart.find(p => p.id === id);

                if (!existingProduct) return;

                if ((existingProduct.amount || 1) > 1) {
                    // restar si hay mas de uno
                    const updatedCart = currentCart.map(p =>
                        p.id === id ? { ...p, amount: (p.amount || 1) - 1 } : p
                    );
                    set({ cart: updatedCart });
                } else {
                    // eliminar si solo hay 1
                    const updatedCart = currentCart.filter(p => p.id !== id);
                    set({ cart: updatedCart });
                }
            },
            clearCart: () => {
                set({ cart: [] });
            }
        }),
        {
            name: "product-store",
        }
    )
);
