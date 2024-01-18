export default defineEventHandler((event) => {
    if (event.node.req.method === "OPTIONS") {
        // eslint-disable-next-line unicorn/no-null
        return null;
    }
});