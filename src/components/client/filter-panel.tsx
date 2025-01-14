"use client";

import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function FilterPanel() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = useCallback(() => {
    const query = new URLSearchParams();
    if (location) query.set("location", location);
    if (price) query.set("price", price);

    router.push(`/properties?${query.toString()}`);
  }, [location, price, router]);

  const debouncedSearch = useCallback(debounce(handleSearch, 700), [
    handleSearch,
  ]);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel && debouncedSearch.cancel();
    };
  }, [location, price, debouncedSearch]);

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="top-0 sticky !z-20 "
    >
      <div className="flex gap-4">
        {" "}
        <h1 className="cursor-pointer" onClick={() => router.push("/")}>
          Home
        </h1>
        <h1
          className="cursor-pointer"
          onClick={() => router.push("/properties")}
        >
          Property Listings
        </h1>{" "}
      </div>

      <form className="lg:flex-row flex-col flex gap-2 justify-end items-center">
        <div className="flex gap-2 items-center">
          <label>Location : </label>
          <input
            type="text"
            placeholder="Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>{" "}
        <div className="flex gap-2 items-center">
          <label>Max Price($) : </label>
          <input
            type="number"
            placeholder="Max price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {(location || price) && (
          <p
            className="text-xs cursor-pointer"
            onClick={() => {
              setLocation("");
              setPrice("");
              router.push(`/properties`);
            }}
          >
            Clear filter
          </p>
        )}
      </form>
    </header>
  );
}
