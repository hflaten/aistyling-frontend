export function formatError(err: unknown): string {
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null && "response" in err) {
    const res = (err as any).response;
    return res?.data?.detail || "Ukjent feil";
  }
  return "Noe gikk galt.";
}
