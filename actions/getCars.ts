"use server";
import { z } from "zod";
import { searchValidator } from "@/lib/validators/search";
import { db } from "@/lib/db";

interface CarQuery {
  [key: string | number]: any;
}
type searchOptions = z.infer<typeof searchValidator>;

export const getCars = async (options: searchOptions) => {
  const where: CarQuery = {
    AND: [],
  };

  if (options.model) {
    where.AND.push({ carModelId: options.model });
  }
  if (options.make) {
    where.AND.push({
      model: {
        carMakeId: options.make,
      },
    });
  }
  if (options.milageFrom) {
    where.AND.push({
      milage: {
        gte: parseInt(options.milageFrom),
      },
    });
  }
  if (options.milageTo) {
    where.AND.push({
      milage: {
        lte: parseInt(options.milageTo),
      },
    });
  }

  const cars = await db.car.findMany({
    where: where,
    select: {
      id: true,
      milage: true,
      city: true,
      fuel_type: true,
      transmission_type: true,
      price: true,
      year: true,
      images: {
        select: {
          url: true,
        },
      },
      model: {
        select: {
          name: true,
          make: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return cars;
};
