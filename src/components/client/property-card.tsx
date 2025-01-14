"use client";

import { favoriteProperty } from "@/lib/actions";
import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PropertyCardProps {
  data: Property;
}

export default function PropertyCard({ data }: PropertyCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  const handleFavorite = async () => {
    try {
      const result = await favoriteProperty(data.id);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error favoriting property:", error);
      setIsFavorite(false);
    }
  };

  return (
    <div className="flex flex-col shadow  w-1/2 rounded-sm h-fit p-6">
      <div className="flex w-full justify-between">
        <h2>{data.title}</h2>
        <button onClick={handleFavorite}>
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>{" "}
      </div>
      <p>{data.location}</p>
      <p>{data.price}</p>
      <button
        onClick={() => {
          router.push(`/properties/${data.id}?id=${data.id}`);
        }}
      >
        View Details
      </button>
    </div>
  );
}
