"use server";

// const car = {
//     make,
//     model,
//     fuelType,
//     carState,
//     milage,
//     horsepower,
//     color,
//     origin,
//     price,
//     year,
// };

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { FuelType, TransmissionType, CarState } from "@prisma/client";

export const createCar = async (input: {
  horse_power: number;
  color: string;
  milage: number;
  year: number;
  price: number;
  origin: string;
  model: string;
  state: CarState;
  fuel_type: FuelType;
  engine_capacity: number;
  transmission_type: TransmissionType;
  images: string[];
  city: string;
}) => {
  const session = await auth();
  const car = await db.car.create({
    data: {
      year: input.year,
      fuel_type: input.fuel_type as FuelType,
      state: input.state as CarState,
      price: input.price,
      milage: input.milage,
      horse_power: input.horse_power,
      color: input.color,
      transmission_type: input.transmission_type as TransmissionType,
      engine_capacity: input.engine_capacity,
      city: input.city,
      model: {
        connect: {
          id: input.model,
        },
      },
      owner: {
        connect: {
          email: session?.user?.email as string,
        },
      },
      origin: {
        connect: {
          id: input.origin,
        },
      },
      images: {
        createMany: {
          data: input.images.map((image, index) => ({
            url: image,
            isMain: index === 0,
          })),
        },
      },
    },
  });
  return car;
};
