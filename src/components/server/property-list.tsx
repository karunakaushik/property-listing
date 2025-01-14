"use server";
import { Property } from "@/lib/types";
import PropertyCard from "@/components/client/property-card";

export default async function PropertyList() {
  const res = await fetch("http://localhost:3000/api/properties");
  const properties: Property[] = await res.json();

  if (!properties.length) {
    return <div>No properties available</div>;
  }

  return (
    <main className="w-full flex flex-col gap-4 justify-center items-center">
      {properties.map((property) => (
        <PropertyCard key={property.id} data={property} />
      ))}
    </main>
  );
}
