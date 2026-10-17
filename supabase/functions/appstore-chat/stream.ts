/** Preserve streaming replies, then acknowledge a saved contact before the terminal marker. */
export function withLeadReceipt(body: ReadableStream<Uint8Array>, saved: Promise<string | null>) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let pending = "";
  const result = saved.catch(() => null);
  return body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      pending += decoder.decode(chunk, { stream: true });
      let end: number;
      while ((end = pending.indexOf("\n")) !== -1) {
        const line = pending.slice(0, end + 1);
        pending = pending.slice(end + 1);
        if (line.trim() !== "data: [DONE]") controller.enqueue(encoder.encode(line));
      }
    },
    async flush(controller) {
      pending += decoder.decode();
      if (pending.trim() && pending.trim() !== "data: [DONE]") controller.enqueue(encoder.encode(`${pending}\n\n`));
      // Don't leave the composer blocked by slow extraction or notification services.
      let timer: ReturnType<typeof setTimeout> | undefined;
      const id = await Promise.race([
        result,
        new Promise<null>((resolve) => { timer = setTimeout(() => resolve(null), 10000); }),
      ]);
      clearTimeout(timer);
      if (id) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ lead_saved: id })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
    },
  }));
}
