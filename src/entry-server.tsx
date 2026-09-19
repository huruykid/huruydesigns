import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PassThrough } from "node:stream";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";
import { prerenderRoutes } from "./lib/routes";

export { prerenderRoutes };

export interface RenderResult {
  html: string;
  head: string;
}

/**
 * Renders one route to static HTML for scripts/prerender.mjs. Waits for every
 * lazy route chunk so the page body is complete, then returns the body markup and
 * the head tags react-helmet-async collected for it.
 */
export function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    const sink = new PassThrough();
    const chunks: Buffer[] = [];
    sink.on("data", (c: Buffer) => chunks.push(c));
    sink.on("end", () => {
      const h = helmetContext.helmet;
      const head = h
        ? [h.title, h.meta, h.link, h.script].map((t) => t.toString()).filter(Boolean).join("\n    ")
        : "";
      resolve({ html: Buffer.concat(chunks).toString("utf8"), head });
    });

    const { pipe } = renderToPipeableStream(
      <AppProviders helmetContext={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
      {
        onAllReady() {
          pipe(sink);
        },
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
