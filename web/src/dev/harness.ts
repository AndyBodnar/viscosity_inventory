// Runs only outside FiveM: shim the NUI bridge and auto-open with mock data so
// the inventory renders in a plain browser (npm run dev / preview).
export function installDevHarness() {
  if (typeof (window as any).GetParentResourceName === "function") return;
  document.body.classList.add("harness-bg");
  const original = window.fetch.bind(window);
  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.startsWith("https://") && !url.includes("localhost") && !url.includes("127.0.0.1")) {
      return Promise.resolve(new Response(JSON.stringify(1), {
        status: 200, headers: { "Content-Type": "application/json" },
      }));
    }
    return original(input, init);
  }) as typeof window.fetch;
}
