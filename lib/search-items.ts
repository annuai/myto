export type SearchItem = {
  title: string;
  href: string;
  category: string;
  description: string;
};

export const searchItems: SearchItem[] = [
  { title: "Home", href: "/", category: "Pages", description: "Back to homepage" },
  { title: "Products", href: "/shop", category: "Pages", description: "Browse all products" },
  { title: "Journal", href: "/journal", category: "Pages", description: "Engineering deep-dives and riding dispatches" },
  { title: "Club", href: "/club", category: "Pages", description: "The Club Myto community" },
  { title: "About", href: "/about", category: "Pages", description: "Our story and how we work" },
  { title: "Support", href: "/support", category: "Pages", description: "Help, FAQs, and contact" },
  { title: "Trail Beam", href: "/products/trail-beam", category: "Products", description: "Auxiliary LED fog lamps — ₹7,000" },
  { title: "Trail Kit", href: "/products/trail-kit", category: "Products", description: "Modular adventure utility system — ₹5,000" },
  { title: "Navi", href: "/products/navi", category: "Products", description: "Dedicated motorcycle navigation — ₹11,000" },
  { title: "Contact us", href: "mailto:clubmyto@gmail.com", category: "Contact", description: "clubmyto@gmail.com" },
];

export function filterItems(query: string): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return searchItems;
  return searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
}
