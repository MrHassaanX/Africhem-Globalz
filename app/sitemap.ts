import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/site";
import { chemicalProducts } from "@/lib/chemical-catalogue";
import { productCategorySlugs } from "@/app/products/catalogue";
import { otherBusinesses } from "@/lib/businesses";
export default function sitemap(): MetadataRoute.Sitemap { return indexable ? ["", "/products", ...productCategorySlugs.map(slug => `/products/${slug}`), ...chemicalProducts.map(product => `/products/${product.family}/${product.slug}`), "/other-businesses", ...otherBusinesses.filter(business => business.status === "documented").map(business => `/other-businesses/${business.slug}`), "/how-it-works", "/global-reach", "/about", "/contact", "/privacy", "/terms"].map(path => ({ url: siteUrl + path })) : []; }
