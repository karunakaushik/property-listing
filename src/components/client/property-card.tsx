"use client";

import { Property } from "@/lib/types";
import { useRouter } from "next/navigation";

interface PropertyCardProps {
  data: Property;
  onFavorite?: () => Promise<void>;
}

export default function PropertyCard({ data, onFavorite }: PropertyCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col shadow  w-1/2 rounded-sm h-fit p-6">
      <div>
        <h2>{data.title}</h2>
        <button onClick={onFavorite}>Favorite</button>
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
