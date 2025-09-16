import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import { generateOrganizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Leather Path - Calzado y Accesorios de Cuero Premium",
  description: "Tienda premium de calzado y accesorios de cuero con estética western elegante. Botas, cintos, bolsas y más en cuero de la más alta calidad.",
  keywords: "cuero, botas, western, cintos, bolsas, calzado premium, accesorios de cuero",
  authors: [{ name: "Leather Path" }],
  creator: "Leather Path",
  publisher: "Leather Path",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    title: "Leather Path - Calzado y Accesorios de Cuero Premium",
    description: "Tienda premium de calzado y accesorios de cuero con estética western elegante.",
    siteName: "Leather Path",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leather Path - Calzado y Accesorios de Cuero Premium",
    description: "Tienda premium de calzado y accesorios de cuero con estética western elegante.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="es-MX">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
