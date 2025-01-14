import { searchProperties } from "../../../lib/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const location = searchParams.get("location");
  const price = searchParams.get("price")
    ? parseInt(searchParams.get("price")!, 10)
    : undefined;

  const lowercaseLocation = location ? location.toLowerCase() : "";

  const filters = { location: lowercaseLocation, price };

  const properties = await searchProperties(filters);

  const propertiesWithFavoriteStatus = properties.map((property) => ({
    ...property,
    isFavorite: property?.isFavorite || false,
  }));

  return NextResponse.json(propertiesWithFavoriteStatus);
}
