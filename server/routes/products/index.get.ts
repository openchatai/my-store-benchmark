// product/get.ts
export default defineEventHandler(async () => {
    const products = await useDb().product.findMany();
    return products;
})
