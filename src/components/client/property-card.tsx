"use client";

import { favoriteProperty } from "@/lib/actions";
import { Property } from "@/lib/types";
import Image from "next/image";
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
      setIsFavorite(!!result.isFavorite);
    } catch (error) {
      console.error("Error favoriting property:", error);
      setIsFavorite(false);
    }
  };

  return (
    <div className="flex flex-col shadow  lg:w-1/2 w-fit rounded-sm h-fit p-6 relative">
      <div className={`flex w-full justify-between flex-col`}>
        <div className="w-[400px] h-[300px]">
          <Image
            src={data.images[0]}
            alt={`Propertyy${data?.title}`}
            width={100}
            height={100}
            className="!w-full !h-full"
          />
        </div>
        <h2 className="lg:text-xl text-base">
          {data.title} <span>($ {data.price})</span>
        </h2>
        <div className="absolute flex gap-2 flex-col top-4  right-[16px]">
          <button
            onClick={handleFavorite}
            className="flex text-sm text-black gap-1 items-center  bg-red-200   px-2 rounded-sm"
          >
            Mark as :{" "}
            {!isFavorite ? (
              <p className="text-white "> &#10084;</p>
            ) : (
              <p className="text-red-600"> &#10084;</p>
            )}
          </button>
          <button
            className="text-sm underline"
            onClick={() => {
              router.push(`/properties/${data.id}?id=${data.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="flex gap-6">
        <p>Bath : {data.specs.baths}</p>
        <p>Beds : {data.specs.beds}</p>
      </div>
      <p>Location : {data.location}</p>
    </div>
  );
}
