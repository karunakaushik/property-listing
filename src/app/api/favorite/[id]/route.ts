import { favoritePropertyInDB } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const result = await favoritePropertyInDB(id);

    if (!result) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    const { isFavorite } = result;
    return NextResponse.json({
      message: "Property favorited successfully",
      isFavorite,
      id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to favorite property" },
      { status: 500 }
    );
  }
}
