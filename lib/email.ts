import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";
import { AdminNotificationEmail } from "@/emails/AdminNotification";
import { AccountSetupEmail } from "@/emails/AccountSetup";
import type { DBOrder, DBOrderItem } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = `${process.env.RESEND_FROM_NAME ?? "myto-moto"} <${
  process.env.RESEND_FROM_EMAIL ?? "orders@myto-moto.com"
}>`;

export async function sendOrderConfirmationEmail(
  order: DBOrder,
  items: DBOrderItem[]
) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: order.customer_email,
    subject: `Order confirmed – ${order.order_number}`,
    react: OrderConfirmationEmail({ order, items }),
  });

  if (error) throw error;
}

export async function sendAdminNotificationEmail(
  order: DBOrder,
  items: DBOrderItem[]
) {
  const to =
    process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.RESEND_FROM_EMAIL!;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `New order ${order.order_number} – ${items.map((i) => i.product_name).join(", ")}`,
    react: AdminNotificationEmail({ order, items }),
  });

  if (error) throw error;
}

export async function sendAccountSetupEmail(
  email: string,
  name: string,
  orderNumber: string,
  actionLink: string
) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Activate your myto-moto account",
    react: AccountSetupEmail({ name, actionLink, orderNumber }),
  });

  if (error) throw error;
}
