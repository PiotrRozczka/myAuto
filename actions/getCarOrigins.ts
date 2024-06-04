"use server";

import { db } from "@/lib/db";

export const getCarOrigins = async () => {
  return await db.origin.findMany();
};
