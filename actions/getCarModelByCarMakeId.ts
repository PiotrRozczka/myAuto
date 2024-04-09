"use server";

import { db } from "@/lib/db";

export async function getCarModelByCarMakeId(carMakeId: string) {
  try {
    const carModels: CarModel[] = await db.carModel.findMany({
      where: {
        carMakeId,
      },
    });
    return carModels;
  } catch (error) {
    console.error(error);
    return [];
  }
}
