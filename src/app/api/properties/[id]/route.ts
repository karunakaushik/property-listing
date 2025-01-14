import { getPropertyById } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const property = await getPropertyById(id);

  if (property) {
    return NextResponse.json(property);
  } else {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
}
