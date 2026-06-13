/** Shared pricing utilities — no "use client" / "use server" directive.
 *  Safe to import in both Server Actions and Client Components.
 */

export const PRE_ORDER_DISCOUNT = 0.2;

/** Price after pre-order discount, in whole rupees. */
export function preOrderPrice(priceRupees: number): number {
  return Math.round(priceRupees * (1 - PRE_ORDER_DISCOUNT));
}
