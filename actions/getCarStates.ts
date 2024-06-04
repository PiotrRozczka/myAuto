"use server";
import { CarState } from "@prisma/client";

export const getCarStates = async () => {
  return Object.values(CarState) as CarState[];
};
