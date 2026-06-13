"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { useCart, preOrderPrice } from "@/context/CartContext";
import { ProductRender } from "@/components/ProductRender";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(26,26,26,0.45)", backdropFilter: "blur(6px)" }}
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm flex flex-col"
            style={{
              background: "var(--color-card-cream)",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <span
                className="font-medium text-base"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Cart ({items.length})
              </span>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-xl transition-colors hover:bg-black/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "var(--color-card-stone)" }}
                  >
                    <ShoppingBag size={24} style={{ color: "var(--color-muted)" }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Your cart is empty</p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                      Find something worth carrying.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                    style={{ background: "var(--color-accent)", color: "#fff" }}
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map(({ product, quantity, isPreOrder }) => {
                    const displayPrice = isPreOrder
                      ? preOrderPrice(product.price)
                      : product.price;
                    return (
                      <li
                        key={`${product.id}-${isPreOrder ? "pre" : "reg"}`}
                        className="flex gap-4 p-4 rounded-2xl"
                        style={{ background: "var(--color-card-stone)" }}
                      >
                        <div
                          className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center"
                          style={{ background: "var(--color-card-cream)" }}
                        >
                          <ProductRender name={product.name} size="sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-medium leading-tight">{product.name}</p>
                            {isPreOrder && (
                              <span
                                className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md flex-shrink-0"
                                style={{ background: "var(--color-accent)", color: "#fff" }}
                              >
                                Pre-order
                              </span>
                            )}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
                              {formatPrice(displayPrice)}
                            </p>
                            {isPreOrder && (
                              <p className="text-xs line-through" style={{ color: "var(--color-muted)" }}>
                                {formatPrice(product.price)}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2.5">
                            <button
                              onClick={() => updateQty(product.id, isPreOrder, quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-black/10"
                              style={{ background: "var(--color-card-cream)" }}
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                            <button
                              onClick={() => updateQty(product.id, isPreOrder, quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-black/10"
                              style={{ background: "var(--color-card-cream)" }}
                            >
                              <Plus size={11} />
                            </button>
                            <button
                              onClick={() => removeItem(product.id, isPreOrder)}
                              className="ml-auto text-xs transition-opacity hover:opacity-60"
                              style={{ color: "var(--color-muted)" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                    Subtotal
                  </span>
                  <span className="font-bold text-base">{formatPrice(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3.5 rounded-2xl text-sm font-semibold text-white text-center transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--color-accent)" }}
                >
                  Proceed to checkout →
                </Link>
                <p className="text-center text-xs mt-3" style={{ color: "var(--color-muted)" }}>
                  Free shipping on all orders above ₹1,999
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
