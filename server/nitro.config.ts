import { defineNitroConfig } from "nitropack/config";
export default defineNitroConfig({
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
