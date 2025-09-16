import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const rows = await prisma.product.findMany({
      where: { 
        gender: "mujer", 
        status: "published",
        collections: {
          some: {
            collection: {
              slug: "vaquera"
            }
          }
        }
      },
      select: { slug: true, title: true, variants: { select: { option1: true, option2: true, sku: true } } }
    });
    return NextResponse.json(rows);
  } catch (e:any) {
    return new NextResponse("DB error: "+e.message, { status: 500 });
  }
}