export const debounce = (callback: () => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export function generateHouseData(count: number) {
  const houses = [];

  for (let i = 0; i < count; i++) {
    const images = Array.from({ length: 3 }, () =>
      faker.image.urlPicsumPhotos(640, 480, "city", true)
    );
    houses.push({
      id: uuidv4(),
      title: `${faker.address.street()} House`,
      price: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
      location: `${faker.address.city()}`,
      specs: {
        beds: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        baths: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
        area: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
      },
      images,
      status: faker.helpers.arrayElement(["available", "sold", "pending"]),
      isFavorite: faker.datatype.boolean(),
    });
  }

  return houses;
}
