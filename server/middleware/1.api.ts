export default defineEventHandler((event) => {
    if (event.node.req.method === "OPTIONS") {
        // eslint-disable-next-line unicorn/no-null
        return null;
    }
    event.node.req.headers["access-control-allow-origin"] = "*";
    event.node.req.headers["access-control-allow-methods"] = "*";
    event.node.req.headers["access-control-allow-headers"] = "*";
});