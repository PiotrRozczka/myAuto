"use server";
import { TransmissionType } from "@prisma/client";

export const getTransmissionTypes = async () => {
  return Object.values(TransmissionType) as TransmissionType[];
};
