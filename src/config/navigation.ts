export const NAV = {
  mujer: {
    label: "Mujer",
    href: "/tienda/mujer",
    columns: [
      {
        title: "Calzado",
        links: [
          { label: "Sandalias", href: "/tienda/mujer/sandalias" },
          { label: "Botines", href: "/tienda/mujer/botines", disabled: true },
          { label: "Botas", href: "/tienda/mujer/botas", disabled: true },
          { label: "Bota Alta", href: "/tienda/mujer/bota-alta" }
        ]
      },
      {
        title: "Líneas",
        links: [
          { label: "Vaquera", href: "/coleccion/mujer/vaquera" },
          { label: "Casual", href: "/coleccion/mujer/casual", disabled: true },
          { label: "Exótica", href: "/coleccion/mujer/exotica", disabled: true },
          { label: "Rodeo Fashion", href: "/coleccion/mujer/rodeo-fashion", disabled: true }
        ]
      },
      {
        title: "Accesorios",
        links: [
          { label: "Bolsas", href: "/tienda/mujer/bolsas", disabled: true },
          { label: "Cintos", href: "/tienda/mujer/cintos", disabled: true },
          { label: "Chamarras", href: "/tienda/mujer/chamarras", disabled: true }
        ]
      }
    ],
    featured: [
      { label: "Sandalias destacadas", href: "/tienda/mujer/sandalias?destacados=1" },
      { label: "Vaquera destacada", href: "/coleccion/mujer/vaquera?destacados=1" }
    ]
  },
  hombre: {
    label: "Hombre",
    href: "/tienda/hombre",
    columns: [
      {
        title: "Calzado",
        links: [
          { label: "Botines", href: "/tienda/hombre/botines", disabled: true },
          { label: "Botas", href: "/tienda/hombre/botas", disabled: true }
        ]
      },
      {
        title: "Líneas",
        links: [
          { label: "Premium", href: "/coleccion/hombre/premium", disabled: true },
          { label: "VIP", href: "/coleccion/hombre/vip", disabled: true },
          { label: "Tenis VIP", href: "/tienda/hombre/tenis-vip", disabled: true }
        ]
      }
    ]
  }
};
