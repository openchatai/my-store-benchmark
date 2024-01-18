// get product
export default defineEventHandler(async (ev) => {
    const { id } = ev.context.params;
    return await useDb().product.findFirst({
        where: {
            id: Number(id),
        }
    })
})
