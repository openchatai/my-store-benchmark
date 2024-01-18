export default defineEventHandler(async () => {
    return await useDb().product.count();
})
