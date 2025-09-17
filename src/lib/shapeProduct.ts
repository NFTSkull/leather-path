export function shapeProductForPdp(product: any) {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    status: product.status,
    badge: product.categories?.some((c: any) => c.category?.slug === "sandalias") ? "Ladies" : 
           product.categories?.some((c: any) => c.category?.slug === "botas") ? "Vaquera" : "LeatherPath",
    variants: product.variants?.map((v: any) => ({
      id: String(v.id),
      sku: v.sku,
      option1: v.option1,
      option2: v.option2,
      priceMXN: typeof v.priceMXN === 'number' ? v.priceMXN : Number(v.priceMXN || 0),
      stock: v.stock,
    })) || [],
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
