"use server";

import { db } from "@/lib/db";

export const getCarsByOwnerId = async (email: string) => {
  const cars = await db.car.findMany({
    where: {
      owner: {
        email: email,
      },
    },
    include: {
      model: {
        include: {
          make: true,
        },
      },
      images: true,
    },
  });
  return cars;
};
