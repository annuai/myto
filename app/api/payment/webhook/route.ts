/**
 * Razorpay webhook — backup for missed payment.handler callbacks.
 * Idempotent: safe to call multiple times for the same payment.
 */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature") ?? "";

    // Verify webhook signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (
      expected.length !== signature.length ||
      !crypto.timingSafeEqual(
        Buffer.from(expected, "hex"),
        Buffer.from(signature, "hex")
      )
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const supabase = createAdminClient();

      // Find order by Razorpay order ID
      const { data: order } = await supabase
        .from("orders")
        .select("id, payment_status")
        .eq("razorpay_order_id", payment.order_id)
        .single();

      // Idempotent: only update if still pending
      if (order && order.payment_status === "pending") {
        await supabase
          .from("orders")
          .update({
            status: "confirmed",
            payment_status: "paid",
            razorpay_payment_id: payment.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", order.id);
      }
    }

    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;
      const supabase = createAdminClient();

      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", payment.order_id)
        .eq("payment_status", "pending");
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
