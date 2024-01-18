import { createRequire } from "node:module";
import { defineNitroConfig } from "nitropack/config";

const require = createRequire(import.meta.url);
const nitroPkg = require("nitropack/package.json");

export default defineNitroConfig({
  runtimeConfig: {
    nitroVersion: nitroPkg.version,
    allowedOrigins: ['*'],
  },
  routeRules: {
    "*": {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    }
  },
  experimental: {
    openAPI: true,
  },
  vercel: {
    functions: {
      supportsResponseStreaming: true,
    },
  },
  publicAssets: [
    {
      baseURL: "/_dist",
      dir: "./public/_dist",
      maxAge: 60 * 60 * 24 * 365,
    },
  ],
});
