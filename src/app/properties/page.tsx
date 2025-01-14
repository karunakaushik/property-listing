import PropertyList from "@/components/server/property-list";
import PropertySearch from "@/components/server/property-search";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { location?: string; price?: string; search?: string };
}) {
  if (!searchParams) {
    return <PropertyList />;
  }

  return (
    <Suspense
      fallback={
        <p className="w-full flex justify-center text-xl">
          Loading Properties...
        </p>
      }
    >
      <PropertySearch searchParams={searchParams} />
    </Suspense>
  );
}
