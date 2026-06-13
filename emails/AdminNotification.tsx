import {
  Html, Head, Body, Container, Section, Text, Hr, Row, Column,
} from "@react-email/components";
import { formatPaise } from "@/lib/order-utils";
import type { DBOrder, DBOrderItem } from "@/lib/types";

interface Props {
  order: DBOrder;
  items: DBOrderItem[];
}

export function AdminNotificationEmail({ order, items }: Props) {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://myto-moto.com"}/admin/orders/${order.id}`;

  return (
    <Html lang="en">
      <Head />
      <Body style={{ background: "#f8f7f4", fontFamily: "ui-sans-serif, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px" }}>

          <Section style={{ background: "#BE3A23", borderRadius: 24, padding: "28px 32px", marginBottom: 16 }}>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 6px" }}>
              New order
            </Text>
            <Text style={{ color: "#fff", fontSize: 26, fontWeight: 600, margin: "0 0 4px" }}>
              {order.order_number}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, margin: 0 }}>
              {formatPaise(order.total_paise)} · {order.is_pre_order ? "Pre-order" : "Regular"}
            </Text>
          </Section>

          {/* Customer */}
          <Section style={{ background: "#e3ddd4", borderRadius: 20, padding: "24px 28px", marginBottom: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b6560", margin: "0 0 12px" }}>
              Customer
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 500, margin: "0 0 2px", color: "#1a1a1a" }}>{order.customer_name}</Text>
            <Text style={{ fontSize: 13, color: "#6b6560", margin: "0 0 2px" }}>{order.customer_email}</Text>
            <Text style={{ fontSize: 13, color: "#6b6560", margin: 0 }}>{order.customer_phone}</Text>
          </Section>

          {/* Items */}
          <Section style={{ background: "#ede8de", borderRadius: 20, padding: "24px 28px", marginBottom: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b6560", margin: "0 0 12px" }}>
              Items
            </Text>
            {items.map((item) => (
              <Row key={item.id} style={{ marginBottom: 8 }}>
                <Column>
                  <Text style={{ fontSize: 13, margin: 0, color: "#1a1a1a" }}>
                    {item.product_name} × {item.quantity}
                    {item.is_pre_order ? " (pre-order)" : ""}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={{ fontSize: 13, fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
                    {formatPaise(item.subtotal_paise)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Hr style={{ borderColor: "rgba(0,0,0,0.08)", margin: "12px 0" }} />
            <Row>
              <Column><Text style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>Total</Text></Column>
              <Column align="right">
                <Text style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>
                  {formatPaise(order.total_paise)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping */}
          <Section style={{ background: "#e3ddd4", borderRadius: 20, padding: "20px 28px", marginBottom: 20 }}>
            <Text style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b6560", margin: "0 0 8px" }}>
              Ship to
            </Text>
            <Text style={{ fontSize: 13, margin: 0, color: "#1a1a1a", lineHeight: 1.6 }}>
              {order.shipping_name} · {order.shipping_address_line1}
              {order.shipping_address_line2 ? `, ${order.shipping_address_line2}` : ""}
              {" · "}{order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
            </Text>
          </Section>

          {/* View in admin */}
          <Text style={{ textAlign: "center" as const }}>
            <a
              href={adminUrl}
              style={{
                background: "#1a1a1a",
                color: "#f5f0e8",
                padding: "12px 28px",
                borderRadius: 16,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              View order in admin →
            </a>
          </Text>

        </Container>
      </Body>
    </Html>
  );
}

export default AdminNotificationEmail;
