"use client";

import { useState, useEffect } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { MdSwapHoriz } from "react-icons/md";

interface Props {
  locale?: string;
}

const SAMPLES = {
  encode: "https://example.com/búsqueda?q=hola mundo&categoría=tecnología&precio=10€",
  decode: "https%3A%2F%2Fexample.com%2Fb%C3%BAsqueda%3Fq%3Dhola%20mundo%26categor%C3%ADa%3Dtecnolog%C3%ADa%26precio%3D10%E2%82%AC",
};

export default function UrlEncoder({ locale = "es" }: Props) {
  const isEs = locale === "es";
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [type, setType] = useState<"component" | "uri">("component");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copiedOut, setCopiedOut] = useState(false);

  useEffect(() => {
    if (!input.trim()) { setOutput(""); setError(""); return; }
    try {
      let result: string;
      if (mode === "encode") {
        result = type === "component" ? encodeURIComponent(input) : encodeURI(input);
      } else {
        result = type === "component" ? decodeURIComponent(input) : decodeURI(input);
      }
      setOutput(result);
      setError("");
    } catch {
      setOutput("");
      setError(isEs ? "URL inválida — revisa el input" : "Invalid URL — check your input");
    }
  }, [input, mode, type, isEs]);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedOut(true);
    setTimeout(() => setCopiedOut(false), 2000);
  }

  function swap() {
    if (!output || error) return;
    setInput(output);
    setMode(m => (m === "encode" ? "decode" : "encode"));
  }

  const diff = input && output && !error ? output.length - input.length : null;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border border-border/30 bg-surface/60 p-1">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === m ? "bg-primary text-background" : "text-text-muted hover:text-text"
              }`}
            >
              {m === "encode" ? (isEs ? "Codificar" : "Encode") : (isEs ? "Decodificar" : "Decode")}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl border border-border/30 bg-surface/60 p-1">
          {(["component", "uri"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                type === t ? "bg-primary/20 text-primary" : "text-text-muted hover:text-text"
              }`}
            >
              {t === "component" ? "Component" : "Full URI"}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => { setInput(SAMPLES[mode === "encode" ? "encode" : "decode"]); }}
            className="rounded-xl border border-border/30 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text"
          >
            {isEs ? "Ejemplo" : "Sample"}
          </button>
          <button
            onClick={() => { setInput(""); setOutput(""); setError(""); }}
            className="rounded-xl border border-border/30 bg-surface/60 px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-text"
          >
            {isEs ? "Limpiar" : "Clear"}
          </button>
          <button
            onClick={swap}
            title={isEs ? "Intercambiar" : "Swap"}
            className="rounded-xl border border-border/30 bg-surface/60 p-1.5 text-text-muted transition-colors hover:text-text"
          >
            <MdSwapHoriz className="text-lg" />
          </button>
        </div>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted/60">
            {mode === "encode" ? (isEs ? "URL original" : "Original URL") : (isEs ? "URL codificada" : "Encoded URL")}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? (isEs ? "https://example.com/buscar?q=hola mundo" : "https://example.com/search?q=hello world")
                : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
            }
            className="min-h-[200px] w-full resize-y rounded-xl border border-border/30 bg-surface/60 p-4 font-mono text-sm text-text placeholder:text-text-muted/40 outline-none transition-colors focus:border-primary/50 focus:bg-surface/80"
          />
          <span className="text-xs text-text-muted/50">
            {input.length.toLocaleString()} {isEs ? "caracteres" : "chars"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-text-muted/60">
            {mode === "encode" ? (isEs ? "URL codificada" : "Encoded URL") : (isEs ? "URL original" : "Original URL")}
          </label>
          <textarea
            readOnly
            value={error || output}
            placeholder={isEs ? "El resultado aparecerá aquí…" : "Result will appear here…"}
            className={`min-h-[200px] w-full resize-y rounded-xl border p-4 font-mono text-sm outline-none transition-colors placeholder:text-text-muted/40 ${
              error
                ? "border-red-500/30 bg-red-500/5 text-red-400"
                : "border-border/30 bg-surface/40 text-text"
            }`}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted/50">
              {output.length.toLocaleString()} {isEs ? "caracteres" : "chars"}
              {diff !== null && (
                <span className={diff > 0 ? "text-amber-400/70" : "text-green-400/70"}>
                  {" "}({diff > 0 ? "+" : ""}{diff})
                </span>
              )}
            </span>
            <button
              onClick={() => copy(output)}
              disabled={!output || !!error}
              className="flex items-center gap-1.5 rounded-lg border border-border/20 bg-surface/60 px-3 py-1 text-xs text-text-muted transition-colors hover:text-text disabled:opacity-30"
            >
              {copiedOut ? <FiCheck className="text-green-400" /> : <FiCopy />}
              {copiedOut ? (isEs ? "Copiado" : "Copied") : (isEs ? "Copiar" : "Copy")}
            </button>
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="rounded-xl border border-border/15 bg-surface/30 p-4 text-xs leading-relaxed text-text-muted/60">
        <p>
          <strong className="text-text-muted/80">encodeURIComponent</strong>
          {isEs
            ? " codifica todos los caracteres especiales (incluyendo "
            : " encodes all special characters (including "}
          <code className="text-primary/80">: / ? # [ ] @ ! $ & ' ( ) * + , ; =</code>
          {isEs ? "). Ideal para valores de parámetros." : "). Best for parameter values."}
        </p>
        <p className="mt-1">
          <strong className="text-text-muted/80">encodeURI</strong>
          {isEs
            ? " preserva la estructura completa de una URL (no codifica : / ? # etc.). Ideal para URLs completas."
            : " preserves the full URL structure (does not encode : / ? # etc.). Best for complete URLs."}
        </p>
      </div>
    </div>
  );
}
