import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/url-encoder";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codificador URL Gratis Online",
    template: "%s | URL Encoder",
  },
  description:
    "Codifica y decodifica URLs al instante con encodeURIComponent y encodeURI. Herramienta gratuita, sin registro, 100% en el navegador.",
  keywords: [
    "url encoder",
    "url decoder",
    "codificador url",
    "url encode online",
    "urlencode",
    "percent encoding",
    "encodeURIComponent online",
    "url encoder gratis",
    "encode url online",
    "url decode online free",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Codificador URL Gratis Online",
    description:
      "Codifica y decodifica URLs con encodeURIComponent o encodeURI. Sin registro, gratis. Por MACM.",
    url: SITE_URL,
    siteName: "URL Encoder — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codificador URL Gratis Online",
    description: "Codifica y decodifica URLs gratis. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/UrlEncoder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
