import PropertyList from "@/components/server/property-list";
import PropertySearch from "@/components/server/property-search";

export default function Page({
  searchParams,
}: {
  searchParams: { location?: string; price?: string; search?: string };
}) {
  if (!searchParams) {
    return <PropertyList />;
  }

  return <PropertySearch searchParams={searchParams} />;
}
