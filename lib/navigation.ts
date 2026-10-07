export type NavigationItem = {
  label: string;
  href: string | null;
};

// Enable destinations as real routes are published. Null never creates a broken URL.
export const navigationItems: readonly NavigationItem[] = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Global Reach", href: "/global-reach" },
  { label: "Contact", href: "/contact" },
];

export const enquiryHref: string | null = "/contact";
