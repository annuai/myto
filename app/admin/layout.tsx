import Link from "next/link";
import Image from "next/image";
import { logoutAdmin } from "./login/actions";
import { LayoutDashboard, ShoppingBag, Package, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Products", href: "/admin/products", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-background)" }}>

      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col border-r"
        style={{ background: "var(--color-card-dark)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="relative h-6 w-20">
            <Image src="/myto-logo.svg" alt="myto-moto" fill className="object-contain object-left" />
          </div>
          <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "rgba(245,240,232,0.3)" }}>
            Admin
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5"
              style={{ color: "rgba(245,240,232,0.65)" }}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t" style={{ borderColor: "rgba(255,255,255,0.05)", paddingTop: 12 }}>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white/5"
              style={{ color: "rgba(245,240,232,0.4)" }}
            >
              <LogOut size={15} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>

    </div>
  );
}
