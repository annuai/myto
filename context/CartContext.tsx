"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { Product } from "@/lib/products";

// Import from shared lib (no "use client" / "use server" directive)
import { PRE_ORDER_DISCOUNT, preOrderPrice } from "@/lib/pricing";
// Re-export so client components can keep importing from here
export { PRE_ORDER_DISCOUNT, preOrderPrice };

export type CartItem = {
  product: Product;
  quantity: number;
  isPreOrder: boolean;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product; isPreOrder: boolean }
  | { type: "REMOVE_ITEM"; id: string; isPreOrder: boolean }
  | { type: "UPDATE_QTY"; id: string; isPreOrder: boolean; quantity: number }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "CLEAR" };

function itemKey(id: string, isPreOrder: boolean) {
  return `${id}__${isPreOrder ? "pre" : "reg"}`;
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = itemKey(action.product.id, action.isPreOrder);
      const existing = state.items.find(
        (i) => itemKey(i.product.id, i.isPreOrder) === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            itemKey(i.product.id, i.isPreOrder) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, isPreOrder: action.isPreOrder },
        ],
      };
    }
    case "REMOVE_ITEM": {
      const key = itemKey(action.id, action.isPreOrder);
      return {
        ...state,
        items: state.items.filter(
          (i) => itemKey(i.product.id, i.isPreOrder) !== key
        ),
      };
    }
    case "UPDATE_QTY": {
      const key = itemKey(action.id, action.isPreOrder);
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.isPreOrder) !== key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          itemKey(i.product.id, i.isPreOrder) === key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "HYDRATE":
      return { ...state, items: action.items };
    case "CLEAR":
      return { ...state, items: [], isOpen: false };
    default:
      return state;
  }
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  total: number;
  addItem: (product: Product, isPreOrder?: boolean) => void;
  removeItem: (id: string, isPreOrder?: boolean) => void;
  updateQty: (id: string, isPreOrder: boolean, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "myto_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        if (Array.isArray(items) && items.length > 0) {
          dispatch({ type: "HYDRATE", items });
        }
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change (after initial hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  const addItem = useCallback(
    (product: Product, isPreOrder = false) =>
      dispatch({ type: "ADD_ITEM", product, isPreOrder }),
    []
  );
  const removeItem = useCallback(
    (id: string, isPreOrder = false) =>
      dispatch({ type: "REMOVE_ITEM", id, isPreOrder }),
    []
  );
  const updateQty = useCallback(
    (id: string, isPreOrder: boolean, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", id, isPreOrder, quantity }),
    []
  );
  const toggleCart = useCallback(
    () => dispatch({ type: "TOGGLE_CART" }),
    []
  );
  const closeCart = useCallback(
    () => dispatch({ type: "CLOSE_CART" }),
    []
  );
  const clearCart = useCallback(
    () => dispatch({ type: "CLEAR" }),
    []
  );

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce((sum, i) => {
    const price = i.isPreOrder
      ? preOrderPrice(i.product.price)
      : i.product.price;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        total,
        addItem,
        removeItem,
        updateQty,
        toggleCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
