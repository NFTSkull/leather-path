import "server-only"; // garantiza que esto no se importe en el cliente
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"], // no 'query' en prod
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
