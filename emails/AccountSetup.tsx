import {
  Html, Head, Body, Container, Section, Text, Button,
} from "@react-email/components";

interface Props {
  name: string;
  actionLink: string;
  orderNumber: string;
}

export function AccountSetupEmail({ name, actionLink, orderNumber }: Props) {
  return (
    <Html lang="en">
      <Head />
      <Body style={{ background: "#f8f7f4", fontFamily: "ui-sans-serif, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 520, margin: "0 auto", padding: "40px 20px" }}>

          {/* Hero card */}
          <Section style={{ background: "#1c1c1a", borderRadius: 24, padding: "36px 40px", marginBottom: 20 }}>
            <Text style={{ color: "rgba(245,240,232,0.4)", fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.15em", margin: "0 0 8px" }}>
              Your account is ready
            </Text>
            <Text style={{ color: "#f5f0e8", fontSize: 26, fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2 }}>
              Welcome, {name.split(" ")[0]}.
            </Text>
            <Text style={{ color: "rgba(245,240,232,0.55)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              We created a myto-moto account for you so you can track{" "}
              <strong style={{ color: "#f5f0e8" }}>{orderNumber}</strong> and all
              future orders in one place. Activate it below.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ background: "#e3ddd4", borderRadius: 24, padding: "32px 40px", marginBottom: 20, textAlign: "center" as const }}>
            <Text style={{ fontSize: 14, color: "#3a3632", margin: "0 0 24px", lineHeight: 1.6 }}>
              Click the button to confirm your email and access your orders. The link
              is valid for <strong>24 hours</strong>.
            </Text>
            <Button
              href={actionLink}
              style={{
                background: "#BE3A23",
                color: "#fff",
                borderRadius: 14,
                padding: "14px 32px",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Activate account
            </Button>
          </Section>

          {/* Security note */}
          <Section style={{ background: "#ede8de", borderRadius: 20, padding: "20px 28px", marginBottom: 24 }}>
            <Text style={{ fontSize: 12, color: "#6b6560", margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: "#3a3632" }}>Didn&apos;t place this order?</strong>{" "}
              You can safely ignore this email. No account will be activated unless
              you click the button above.
            </Text>
          </Section>

          {/* Footer */}
          <Text style={{ fontSize: 12, color: "#6b6560", lineHeight: 1.6, textAlign: "center" as const }}>
            Questions?{" "}
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

export default AccountSetupEmail;
