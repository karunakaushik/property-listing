"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";
import Layout from "./layout";
import Image from "next/image";
import { favoriteProperty } from "@/lib/actions";

export default function PropertyDetailPage() {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(router, searchParams, "router", id);
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();
        setProperty(data);
      };

      fetchProperty();
    }
  }, [id]);

  const [isFavorite, setIsFavorite] = useState(property?.isFavorite);

  const handleFavorite = async () => {
    try {
      const result = await favoriteProperty(property?.id);
      setIsFavorite(!!result.isFavorite);
    } catch (error) {
      console.error("Error favoriting property:", error);
      setIsFavorite(false);
    }
  };

  if (!property) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="flex flex-col shadow  w-1/2 rounded-sm h-fit p-6 relative">
        <div className={`flex w-full justify-between flex-col`}>
          <div className="w-[400px] h-[300px]">
            <Image
              src={property?.images[0]}
              alt={`Propertyy${property?.title}`}
              width={500}
              height={100}
              className="!w-full !h-full"
            />
          </div>
          <h2 className="text-xl">
            {property?.title} <span>($ {property?.price})</span>
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
          </div>
        </div>
        <div className="flex gap-6">
          <p>Bath : {property?.specs?.baths}</p>
          <p>Beds : {property?.specs?.beds}</p>
        </div>
        <p>Location : {property?.location}</p>
      </div>
    </Layout>
  );
}
