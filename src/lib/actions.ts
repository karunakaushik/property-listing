import { Property } from "./types";
import { generateHouseData } from "./utils";

const mockDatabase: Property[] = generateHouseData(30);

export async function searchProperties(filters: {
  location?: string;
  price?: number;
}) {
  return mockDatabase.filter((property) => {
    const matchesLocation = filters.location
      ? property.location.toLowerCase().includes(filters.location)
      : true;

    const matchesPrice = filters.price ? property.price <= filters.price : true;

    return matchesLocation && matchesPrice;
  });
}

export async function getPropertyById(id: string) {
  return mockDatabase.find((property) => property.id === id);
}

export async function favoritePropertyInDB(id: string) {
  const property = mockDatabase.find((property) => property.id === id);

  if (property) {
    property.isFavorite = !property.isFavorite;
    return property;
  }

  return null;
}

export async function favoriteProperty(id: string) {
  const res = await fetch(`/api/favorite/${id}`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to favorite the property");
  }

  const result = await res.json();
  return result;
}
