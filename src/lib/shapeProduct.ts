function variantSlug(name: string) {
  return (name ?? "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function shapeProductForPdp(product: any) {
  const isSandalia = product.categories?.some((c: any) => c?.category?.slug === "sandalias") ?? false;
  
  const variants = product.variants?.map((v: any) => {
    const variant = {
      id: String(v.id),
      sku: v.sku,
      option1: v.option1,
      option2: v.option2,
      priceMXN: typeof v.priceMXN === 'number' ? v.priceMXN : Number(v.priceMXN || 0),
      stock: v.stock,
    };
    
    // Agregar imageUrl solo para sandalias
    if (isSandalia && v.option2) {
      (variant as any).imageUrl = `/img/products/sandalias/${product.slug}-${variantSlug(v.option2)}.png`;
    }
    
    return variant;
  }) || [];
  
  // Calcular heroImage
  const heroImage = isSandalia 
    ? (variants[0] as any)?.imageUrl ?? "/img/placeholder.png"
    : product.images?.[0]?.url ?? "/img/placeholder.png";

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    status: product.status,
    isSandalia,
    heroImage,
    badge: isSandalia ? "Ladies" : 
           product.categories?.some((c: any) => c.category?.slug === "botas") ? "Vaquera" : "LeatherPath",
    variants,
    images: product.images?.map((i: any) => ({
      id: i.id,
      url: i.url,
    })) || [],
    categories: product.categories?.map((c: any) => ({
      id: c.category?.id,
      slug: c.category?.slug,
      name: c.category?.name,
    })) || [],
    collections: product.collections?.map((c: any) => ({
      id: c.collection?.id,
      slug: c.collection?.slug,
      name: c.collection?.name,
    })) || [],
  };
}
