import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }

  db = globalThis.prisma;
}

export { db };
