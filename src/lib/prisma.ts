import "server-only"; // garantiza que esto no se importe en el cliente
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error", "warn"],
  });
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ["error", "warn"],
    });
  }
  prisma = global.__prisma;
}

export { prisma };
