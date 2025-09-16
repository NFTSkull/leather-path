import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const target = ["hawaii","bali","milo","bora-bora","mallorca","armonia","adorada","liberty","orgullosa","dolly","risuena","palmira","santorini","milenia"];
  
  try {
    const rows = await prisma.product.findMany({
      where: { slug: { in: target } },
      select: { 
        slug: true, 
        title: true, 
        status: true, 
        variants: { 
          select: { 
            option2: true, 
            sku: true,
            priceMXN: true,
            stock: true
          } 
        } 
      }
    });
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Debug products error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}