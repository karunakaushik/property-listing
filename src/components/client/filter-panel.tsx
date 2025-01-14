"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterPanel() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (location) query.set("location", location);
    if (price) query.set("price", price);

    router.push(`/properties?${query.toString()}`);
  };

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="top-0 sticky"
    >
      <div>
        <h1 onClick={() => router.push("/properties")}>Property Listings</h1>
      </div>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
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
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            backgroundColor: "#0070f3",
            color: "#fff",
          }}
        >
          Search
        </button>
      </form>
    </header>
  );
}
