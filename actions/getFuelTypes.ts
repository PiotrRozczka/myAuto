"use server";
import { FuelType } from "@prisma/client";

export const getFuelTypes = async () => {
  return Object.values(FuelType) as FuelType[];
};
