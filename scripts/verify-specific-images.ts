import { promises as fs } from "fs";
import path from "path";

async function main() {
  console.log("🔍 Verificando imágenes específicas mencionadas:");
  console.log("");

  const baseDir = path.join(process.cwd(), "public", "img", "products", "bota-alta");
  
  const imagenesRequeridas = [
    "bandida-negro.png",
    "forajida-miel.png", 
    "forajida-negro.png",
    "gerbera-miel.png",
    "liberty-alta-negro.png",
    "liberty-alta-tabaco.png",
    "liberty-alta-blanca.png",
    "maddame-beige.png",
    "maddame-negro.png"
  ];

  let todasExisten = true;

  for (const imagen of imagenesRequeridas) {
    const fullPath = path.join(baseDir, imagen);
    try {
      await fs.access(fullPath);
      console.log(`✅ ${imagen} - EXISTE`);
    } catch {
      console.log(`❌ ${imagen} - FALTA`);
      todasExisten = false;
    }
  }

  console.log("");
  if (todasExisten) {
    console.log("🎉 ¡TODAS LAS IMÁGENES ESTÁN DISPONIBLES!");
    console.log("🔗 Ahora deberían mostrarse correctamente en:");
    console.log("   • /tienda/mujer/bota-alta (lista de productos)");
    console.log("   • /tienda/producto/bandida (PDP)");
    console.log("   • /tienda/producto/forajida (PDP)");
    console.log("   • /tienda/producto/gerbera (PDP)");
    console.log("   • /tienda/producto/liberty-alta (PDP)");
    console.log("   • /tienda/producto/maddame (PDP)");
  } else {
    console.log("⚠️  Algunas imágenes aún faltan");
  }
}

main().catch(console.error);
