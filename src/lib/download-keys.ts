export function downloadKeysTxt(keys: string[], duration: string, label: string) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const safeLabel = (label || "keys").replace(/[^a-z0-9_-]+/gi, "_");
  const filename = `unlimitly_${safeLabel}_${duration}_${keys.length}_${stamp}.txt`;
  const header = [
    `# Unlimitly license keys`,
    `# Generated: ${new Date().toISOString()}`,
    `# Duration: ${duration}`,
    `# Label: ${label || "(none)"}`,
    `# Count: ${keys.length}`,
    ``,
  ].join("\n");
  const blob = new Blob([header + keys.join("\n") + "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
