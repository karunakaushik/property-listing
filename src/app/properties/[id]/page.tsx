"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full justify-center flex p-6">
      <div className="flex flex-col shadow p-4 w-1/2 rounded-sm h-fit ">
        <h2>{property?.title}</h2>
        <p>{property?.location}</p>
        <p>{property?.price}</p>
      </div>
    </div>
  );
}
