import { prisma } from "@/lib/prisma";

const productos = [
  { title: "Armonia",  slug: "armonia" },
  { title: "Adorada",  slug: "adorada" },
  { title: "Liberty",  slug: "liberty" },
  { title: "Orgullosa",slug: "orgullosa" },
  { title: "Dolly",    slug: "dolly" },
  { title: "Risueña",  slug: "risuena" }, // slug sin acento
  { title: "Palmira",  slug: "palmira" },
  { title: "Santorini",slug: "santorini" },
  { title: "Milenia",  slug: "milenia" },
];

const variantes: Record<string, { name: string; sku: string }[]> = {
  armonia:   [{ name:"Tabaco", sku:"LP-M-VQ-ARM-TBC" }, { name:"Shedron", sku:"LP-M-VQ-ARM-SHD" }],
  adorada:   [{ name:"Negro",  sku:"LP-M-VQ-ADR-NGR" }, { name:"Tan",     sku:"LP-M-VQ-ADR-TAN" }],
  liberty:   [{ name:"Tabaco", sku:"LP-M-VQ-LIB-TBC" }, { name:"Negro",   sku:"LP-M-VQ-LIB-NGR" }],
  orgullosa: [{ name:"Tan",    sku:"LP-M-VQ-ORG-TAN" }, { name:"Shedron", sku:"LP-M-VQ-ORG-SHD" }],
  dolly:     [{ name:"Gris",   sku:"LP-M-VQ-DOL-GRS" }, { name:"Miel",    sku:"LP-M-VQ-DOL-MIE" }],
  risuena:   [{ name:"Café",   sku:"LP-M-VQ-RIS-CAF" }, { name:"Nogal",   sku:"LP-M-VQ-RIS-NOG" }],
  palmira:   [{ name:"Glam",   sku:"LP-M-VQ-PAL-GLA" }, { name:"Chocolate", sku:"LP-M-VQ-PAL-CHC" }],
  santorini: [{ name:"Miel",   sku:"LP-M-VQ-SAN-MIE" }, { name:"Negro",   sku:"LP-M-VQ-SAN-NGR" }],
  milenia:   [{ name:"Miel",   sku:"LP-M-VQ-MIL-MIE" }],
};

async function main() {
  
  console.log("🌱 Iniciando seed de Vaquera · Damas...");
  
  for (const p of productos) {
    const det =
      p.slug === "armonia"   ? "Vaquera · Piel res · WELT · Suela de cuero" :
      p.slug === "adorada"   ? "Vaquera · Piel res · WELT · Tacón cuero/tapa antiderrapante · Estoperoles y bordado" :
      p.slug === "liberty"   ? "Vaquera · Piel res · WELT · Refuerzo en tubos · Suela de cuero troquelada" :
      p.slug === "orgullosa" ? "Vaquera · Piel res · WELT · Acabados a mano" :
      p.slug === "dolly"     ? "Vaquera · Piel res · WELT · Diseño con estoperoles" :
      p.slug === "risuena"   ? "Vaquera · Piel res · WELT · Diseño floral bordado · Punta rodeo" :
      p.slug === "palmira"   ? "Vaquera · Piel res · WELT · Diseño bordado" :
      p.slug === "santorini" ? "Vaquera · Piel res · WELT · Tubo bordado" :
      "Vaquera · Piel res · WELT";

    console.log(`📦 Procesando ${p.title} (${p.slug})...`);

    const up = await prisma.product.upsert({
      where: { slug: p.slug },
      update: { 
        title: p.title, 
        gender: "mujer", 
        status: "published" 
      },
      create: { 
        title: p.title, 
        slug: p.slug, 
        sku: `LP-M-VQ-${p.slug.toUpperCase()}`,
        gender: "mujer", 
        status: "published" 
      },
    });

    const vts = variantes[p.slug] ?? [];
    for (const [idx, v] of vts.entries()) {
      await prisma.variant.upsert({
        where: { sku: v.sku },
        update: { 
          option2: v.name, 
          priceMXN: 380000, 
          stock: 30, 
          productId: up.id
        },
        create: { 
          option2: v.name, 
          sku: v.sku, 
          priceMXN: 380000, 
          stock: 30, 
          productId: up.id
        },
      });
      console.log(`  ✅ Variante: ${v.name} (${v.sku})`);
    }
  }
  
  console.log("🎉 Seed de Vaquera · Damas completado!");
}

main().then(() => process.exit(0)).catch(e => {
  console.error("❌ Error en seed:", e);
  process.exit(1);
});
