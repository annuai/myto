import {
  Html, Head, Body, Container, Section, Text, Hr, Row, Column, Img,
} from "@react-email/components";
import { formatPaise } from "@/lib/order-utils";
import type { DBOrder, DBOrderItem } from "@/lib/types";

interface Props {
  order: DBOrder;
  items: DBOrderItem[];
}

export function OrderConfirmationEmail({ order, items }: Props) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myto-moto.com";

  return (
    <Html lang="en">
      <Head />
      <Body style={{ background: "#f8f7f4", fontFamily: "ui-sans-serif, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "40px 20px" }}>

          {/* Logo / header */}
          <Section style={{ marginBottom: 32 }}>
            <Img
              src={`${siteUrl}/myto-logo.svg`}
              alt="myto-moto"
              width={80}
              height={36}
              style={{ filter: "brightness(0)" }}
            />
          </Section>

          {/* Hero card */}
          <Section style={{ background: "#1c1c1a", borderRadius: 24, padding: "36px 40px", marginBottom: 20 }}>
            <Text style={{ color: "rgba(245,240,232,0.4)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 8px" }}>
              Order confirmed
            </Text>
            <Text style={{ color: "#f5f0e8", fontSize: 28, fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2 }}>
              Thank you, {order.customer_name.split(" ")[0]}.
            </Text>
            <Text style={{ color: "rgba(245,240,232,0.55)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Your order <strong style={{ color: "#f5f0e8" }}>{order.order_number}</strong> has been
              received and is being processed.
            </Text>
          </Section>

          {/* Items */}
          <Section style={{ background: "#e3ddd4", borderRadius: 24, padding: "28px 32px", marginBottom: 12 }}>
            <Text style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b6560", margin: "0 0 20px" }}>
              Items ordered
            </Text>
            {items.map((item) => (
              <Row key={item.id} style={{ marginBottom: 12 }}>
                <Column>
                  <Text style={{ fontSize: 14, fontWeight: 500, margin: 0, color: "#1a1a1a" }}>
                    {item.product_name}{item.quantity > 1 ? ` × ${item.quantity}` : ""}
                  </Text>
                  {item.is_pre_order && (
                    <Text style={{ fontSize: 10, color: "#BE3A23", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "2px 0 0" }}>
                      Pre-order · 20% off
                    </Text>
                  )}
                </Column>
                <Column align="right">
                  <Text style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "#1a1a1a" }}>
                    {formatPaise(item.subtotal_paise)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Hr style={{ borderColor: "rgba(0,0,0,0.08)", margin: "16px 0" }} />
            <Row>
              <Column>
                <Text style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>Total paid</Text>
              </Column>
              <Column align="right">
                <Text style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>
                  {formatPaise(order.total_paise)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping */}
          <Section style={{ background: "#ede8de", borderRadius: 24, padding: "24px 32px", marginBottom: 28 }}>
            <Text style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b6560", margin: "0 0 12px" }}>
              Shipping to
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 500, margin: 0, color: "#1a1a1a" }}>
              {order.shipping_name}
            </Text>
            <Text style={{ fontSize: 13, color: "#6b6560", margin: "4px 0 0", lineHeight: 1.6 }}>
              {order.shipping_address_line1}
              {order.shipping_address_line2 ? `, ${order.shipping_address_line2}` : ""}<br />
              {order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
            </Text>
          </Section>

          {/* Footer */}
          <Text style={{ fontSize: 12, color: "#6b6560", lineHeight: 1.6, textAlign: "center" as const }}>
            Questions? Reply to this email or write to{" "}
            <a href="mailto:clubmyto@gmail.com" style={{ color: "#BE3A23" }}>
              clubmyto@gmail.com
            </a>
          </Text>
          <Text style={{ fontSize: 11, color: "rgba(107,101,96,0.5)", textAlign: "center" as const, marginTop: 8 }}>
            © {new Date().getFullYear()} myto-moto · Made in Kerala, India
          </Text>

        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;
