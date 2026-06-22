const RESOURCE: string =
  typeof (window as any).GetParentResourceName === "function"
    ? (window as any).GetParentResourceName()
    : "viscosity_inventory";

export async function fetchNui<Resp = unknown, Req = unknown>(
  event: string,
  data?: Req,
): Promise<Resp> {
  const resp = await fetch(`https://${RESOURCE}/${event}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data ?? {}),
  });
  const text = await resp.text();
  try {
    return JSON.parse(text) as Resp;
  } catch {
    return text as unknown as Resp;
  }
}
