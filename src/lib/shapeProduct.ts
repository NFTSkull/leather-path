function variantSlug(name: string) {
  return (name ?? "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type VariantView = {
  id: string
  sku: string
  option2: string | null
  priceMXN: number
  stock: number
}

export type ProductView = {
  id: string
  slug: string
  title: string
  description?: string
  imageSrc: string
  variants: VariantView[]
  categories: string[]
  collections: string[]
}

function isSandaliaFromShape(categories: string[]) {
  return categories.includes("sandalias");
}
function isVaqueraFromShape(categories: string[]) {
  // en nuestra taxonomía "vaquera damas" está bajo categoría "botas"
  return categories.includes("botas");
}

export function shapeProductForPdp(product: any) {
  const categories: string[] =
    (product?.categories ?? [])
      .map((pc: any) => pc?.category?.slug)
      .filter(Boolean);

  const variants: VariantView[] = (product?.variants ?? []).map((v: any) => ({
    id: String(v.id),
    sku: v.sku,
    option2: v.option2,
    priceMXN: Number(v.priceMXN ?? 0),
    stock: Number(v.stock ?? 0),
  }));

  // IMAGEN CORRECTA SEGÚN CATEGORÍA
  let imageSrc: string;
  if (isSandaliaFromShape(categories)) {
    const firstVar = variants[0]?.option2 ?? "";
    imageSrc = `/img/products/sandalias/${product.slug}-${variantSlug(firstVar)}.png`;
  } else if (isVaqueraFromShape(categories)) {
    imageSrc = `/img/products/vaquera/${product.slug}.png`;
  } else {
    imageSrc = product?.images?.[0]?.url ?? "/img/placeholder-bota.png";
  }

  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    description: product.description ?? "",
    imageSrc,
    variants,
    categories,
    collections: (product?.collections ?? []).map((pc: any) => pc?.collection?.slug).filter(Boolean),
  };
}
