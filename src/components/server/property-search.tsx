"use server";

import { Property } from "@/lib/types";
import PropertyCard from "@/components/client/property-card";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: { location?: string; price?: string; search?: string };
}) {
  const location = searchParams?.location || "";
  const price = searchParams?.price
    ? parseInt(searchParams.price, 10)
    : undefined;
  const search = searchParams?.search || "";

  const query = new URLSearchParams();
  if (location) query.set("location", location);
  if (price) query.set("price", price.toString());
  if (search) query.set("search", search);

  const res = await fetch(
    `http://localhost:3000/api/properties?${query.toString()}`
  );
  const properties: Property[] = await res.json();

  if (!properties.length) {
    return (
      <main className="w-full flex flex-col gap-4 justify-center items-center pt-6">
        No properties available
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col gap-4 justify-center items-center">
      {properties.map((property) => (
        <PropertyCard key={property.id} data={property} />
      ))}
    </main>
  );
}
