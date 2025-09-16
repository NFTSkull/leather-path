import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config(); // respeta DATABASE_URL del entorno donde se ejecute
export const prisma = new PrismaClient({ log: ["error", "warn"] });
