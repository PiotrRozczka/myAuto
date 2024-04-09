"use server";

import { db } from "@/lib/db";

export async function getCarMakes() {
  try {
    const carMakes: CarMake[] = await db.carMake.findMany();
    return carMakes;
  } catch (error) {
    console.error(error);
    return [];
  }
}
