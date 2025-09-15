import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

export function getPrisma() {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  } else {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    return global.__prisma;
  }
}
