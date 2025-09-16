// Prisma client para API routes (sin server-only)
import { PrismaClient } from "@prisma/client";

declare global {
  var __prismaApi: PrismaClient | undefined;
}

let prismaApi: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaApi = new PrismaClient({
    log: ["error", "warn"],
  });
} else {
  if (!global.__prismaApi) {
    global.__prismaApi = new PrismaClient({
      log: ["error", "warn"],
    });
  }
  prismaApi = global.__prismaApi;
}

export { prismaApi };