import { clientContent } from "@/lib/content/company";

export type Coordinate = [longitude: number, latitude: number];
type Country = (typeof clientContent.network.countries)[number] | typeof clientContent.network.primaryCountry;

// Geographic points within each country, used as country markers only.
const coordinates: Record<Country, Coordinate> = {
  India: [78.96, 22.59],
  Kuwait: [47.5, 29.5],
  UAE: [54.3, 24.4],
  Egypt: [30.8, 26.8],
  Uganda: [32.3, 1.3],
  Kenya: [37.9, 0.5],
  "United Kingdom": [-2.5, 54.5],
};

export const networkLocations = [clientContent.network.primaryCountry, ...clientContent.network.countries].map((name) => ({
  name,
  coordinate: coordinates[name],
  primary: name === clientContent.network.primaryCountry,
}));

// A single connected, non-directional network motif. These arcs are not
// verified trade lanes, shipments, or office-to-office connections.
export const networkArcs = [
  [0, 3], [0, 4], [3, 2], [2, 1], [4, 5], [4, 6], [0, 6],
] as const;
