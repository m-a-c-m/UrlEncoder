import type { Metadata } from "next";
import UrlEncoder from "../components/UrlEncoder";
import { MdLink } from "react-icons/md";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/url-encoder";
const EMBED_URL = process.env.NEXT_PUBLIC_EMBED_URL || "https://miguelacm.es/embed/url-encoder";

export const metadata: Metadata = {
  title: "Codificador y Decodificador de URLs Online Gratis",
  description:
    "Codifica y decodifica URLs con encodeURIComponent o encodeURI al instante. Percent-encoding completo. Sin registro, gratis, 100% en el navegador.",
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Codificador URL Gratis Online",
  url: SITE_URL,
  description:
    "Codifica y decodifica URLs con encodeURIComponent y encodeURI. Sin registro, 100% en el navegador.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: {
    "@type": "Person",
    name: "Miguel Ángel Colorado Marin",
    url: "https://miguelacm.es",
  },
  featureList: [
    "Codificador URL",
    "Decodificador URL",
    "encodeURIComponent",
    "encodeURI / Full URI",
    "Intercambio input/output",
    "Diferencia de caracteres",
    "Copiar al portapapeles",
    "Sin registro",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <MdLink className="text-base" />
              Herramienta gratuita · Código abierto
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              Codificador y Decodificador de URLs Online Gratis
            </h1>
            <p className="mb-2 text-lg text-text-muted">
              Codifica y decodifica URLs con encodeURIComponent o encodeURI. Percent-encoding al instante.
            </p>
            <p className="text-sm text-text-muted/60">
              Hecho por{" "}
              <a
                href="https://miguelacm.es"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                MACM
              </a>{" "}
              · Sin registro · Sin anuncios · 100% en el navegador
            </p>
          </div>

          {/* Tool */}
          <div className="glass rounded-2xl border border-border/20 p-6 md:p-8">
            <UrlEncoder locale="es" />
          </div>

          {/* Feature cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🔤",
                title: "encodeURIComponent",
                desc: "Codifica todos los caracteres especiales incluyendo : / ? # & = perfectos para valores de parámetros de query string.",
              },
              {
                icon: "🌐",
                title: "encodeURI completa",
                desc: "Preserva la estructura de la URL completa. Solo codifica caracteres que nunca pueden aparecer en una URL.",
              },
              {
                icon: "⇄",
                title: "Intercambio instant",
                desc: "El botón ⇄ mueve el output al input y cambia el modo automáticamente. Ideal para verificar codificaciones.",
              },
            ].map((item) => (
              <div key={item.icon} className="glass rounded-xl border border-border/15 p-5">
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How to use */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Cómo usar el codificador de URLs</h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "Selecciona el modo Codificar para convertir una URL con caracteres especiales, o Decodificar para obtener la URL original legible." },
                { n: 2, text: "Elige el tipo: encodeURIComponent para valores de parámetros (codifica todo), o encodeURI para URLs completas (preserva estructura)." },
                { n: 3, text: "Pega tu URL en el panel izquierdo. El resultado aparece en tiempo real en el panel derecho con el contador de diferencia de caracteres." },
                { n: 4, text: "Usa Copiar para llevarte el resultado al portapapeles, o ⇄ para intercambiar input y output y cambiar el modo automáticamente." },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
            {[
              {
                q: "¿Qué es el percent-encoding?",
                a: "El percent-encoding (o URL encoding) es el mecanismo que convierte caracteres no permitidos en una URL en su representación hexadecimal precedida por %. Por ejemplo, el espacio se convierte en %20, la ñ en %C3%B1 y el símbolo € en %E2%82%AC.",
              },
              {
                q: "¿Cuál es la diferencia entre encodeURIComponent y encodeURI?",
                a: "encodeURI preserva los caracteres reservados que forman la estructura de la URL (: / ? # [ ] @ ! $ & ' ( ) * + , ; =). encodeURIComponent los codifica todos, siendo ideal para valores de parámetros de query string.",
              },
              {
                q: "¿Cuándo debo usar el codificador de URLs?",
                a: "Cuando construyes URLs dinámicamente en JavaScript antes de un fetch, cuando formas query strings con valores que pueden contener caracteres especiales, o cuando necesitas decodificar una URL codificada para leerla.",
              },
              {
                q: "¿Por qué el espacio se codifica como %20 y no como +?",
                a: "El estándar RFC 3986 (URLs) usa %20 para el espacio. El símbolo + se usa para espacios solo en el formato application/x-www-form-urlencoded (formularios HTML). Esta herramienta sigue el estándar RFC 3986.",
              },
              {
                q: "¿Se envían mis datos a algún servidor?",
                a: "No. Toda la codificación se realiza en tu navegador usando las funciones nativas encodeURIComponent, encodeURI, decodeURIComponent y decodeURI. Ningún dato se envía a ningún servidor.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border/20 bg-white/3 p-5">
                <h3 className="mb-2 font-medium text-white">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Embed */}
          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-2 font-semibold text-white">Integra el codificador en tu web</h2>
            <p className="mb-4 text-sm text-text-muted">
              Puedes embeber este codificador de URLs en cualquier web con un simple iframe.
            </p>
            <div className="mb-3 rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Iframe (integración directa):</p>
              <code className="break-all text-xs text-green-400">
                {`<iframe src="${EMBED_URL}" width="100%" height="600" style="border:none;border-radius:12px;" title="URL Encoder Decoder — miguelacm.es" loading="lazy"></iframe>`}
              </code>
            </div>
            <div className="rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Enlace con atribución:</p>
              <code className="break-all text-xs text-green-400">
                {`<a href="${SITE_URL}" target="_blank" rel="noopener">Codificador URL gratis por MACM</a>`}
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
