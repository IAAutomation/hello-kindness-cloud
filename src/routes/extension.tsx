import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/extension")({
  head: () => ({
    meta: [
      { title: "Unlimitly — Extension preview" },
      {
        name: "description",
        content:
          "Live preview of the Unlimitly Chrome extension side panel — verify the redesigned UI, download the .zip, and load it unpacked into Chrome.",
      },
      { property: "og:title", content: "Unlimitly — Extension preview" },
      {
        property: "og:description",
        content: "Preview the Unlimitly extension side panel and download the build.",
      },
    ],
  }),
  component: ExtensionPreview,
});

function ExtensionPreview() {
  const download = () => {
    fetch("/unlimitly-extension.zip")
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "unlimitly-extension.zip";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <main className="min-h-screen bg-[color:var(--color-cream)] text-[color:var(--color-espresso)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <a
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)] hover:text-[color:var(--color-gold)] transition-colors"
        >
          ← Back to home
        </a>

        <header className="mt-6 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
            Chrome extension · v1.1.7
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.95]">
            Unlimitly <span className="italic-serif">side panel</span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-[color:var(--color-muted-ink)] leading-relaxed">
            Live static preview of the redesigned extension surface — theme
            tokens, fonts, spacing and buttons rendered from the exact same
            <code className="mx-1 rounded bg-[color:var(--color-butter)] px-1.5 py-0.5 text-[11px]">
              theme.css
            </code>
            the built extension ships. Interactive Chrome APIs (license,
            prompt bypass, feature calls) only run once loaded into Chrome.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-espresso)] px-6 py-3 text-sm font-medium text-[color:var(--color-cream)] shadow-lg hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-espresso)] transition-colors"
          >
            ⬇ Download extension (.zip)
          </button>
          <a
            href="/extension-preview/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-gold)]/40 bg-transparent px-6 py-3 text-sm font-medium text-[color:var(--color-espresso)] hover:bg-[color:var(--color-butter)] transition-colors"
          >
            Open preview in new tab ↗
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-8 items-start">
          {/* Install steps */}
          <section className="rounded-2xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-lavender)] p-8">
            <h2 className="font-display italic-serif text-3xl">Install unpacked</h2>
            <ol className="mt-6 space-y-4 text-sm text-[color:var(--color-espresso)]">
              {[
                "Download & unzip the file above.",
                "Open chrome://extensions in Chrome (or any Chromium browser).",
                "Toggle Developer mode in the top-right.",
                "Click Load unpacked and select the unzipped folder.",
                "Open lovable.dev — Unlimitly's side panel appears in the toolbar.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display italic-serif text-2xl text-[color:var(--color-gold)] leading-none w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-xl border border-dashed border-[color:var(--color-gold)]/40 bg-[color:var(--color-butter)] p-4 text-xs text-[color:var(--color-muted-ink)] leading-relaxed">
              <strong className="text-[color:var(--color-espresso)]">Heads up:</strong>{" "}
              the preview iframe below is a visual mock. It does not — and
              cannot — call <code>chrome.*</code> APIs. It exists so you can
              verify the new brand and UI look before installing.
            </div>
          </section>

          {/* Live side-panel iframe */}
          <section className="justify-self-center lg:justify-self-end w-full max-w-[440px]">
            <div className="rounded-[28px] border border-[color:var(--color-gold)]/30 bg-[color:var(--color-butter)] p-3 shadow-2xl">
              <div className="rounded-[20px] overflow-hidden bg-[color:var(--color-cream)]">
                <iframe
                  src="/extension-preview/"
                  title="Unlimitly extension side panel preview"
                  className="block w-full"
                  style={{ height: "720px", border: "0" }}
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted-ink)]">
              400 × 720 · matches Chrome side panel
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}