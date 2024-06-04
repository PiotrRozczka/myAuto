"use server";
import { z } from "zod";
import { searchValidator } from "@/lib/validators/search";
import { db } from "@/lib/db";

interface CarQuery {
  [key: string]: any;
}
type searchOptions = z.infer<typeof searchValidator>;

export const getCars = async (options: searchOptions) => {
  const where: CarQuery = {
    AND: [],
  };

  if (options.model) {
    where.AND.push({ modelId: options.model });
  }
  if (options.make) {
    where.AND.push({
      makeId: options.make,
    });
  }

  const cars = await db.car.findMany({
    where: where,
  });

  return cars;
};
