import PropertyList from "@/components/server/property-list";
import PropertySearch from "@/components/server/property-search";
import { generateHouseData } from "@/lib/utils";

export default function Page({
  searchParams,
}: {
  searchParams: { location?: string; price?: string; search?: string };
}) {
  const houseData = generateHouseData(10);

  console.log(houseData, "house");
  if (!searchParams) {
    return <PropertyList />;
  }

  return <PropertySearch searchParams={searchParams} />;
}
