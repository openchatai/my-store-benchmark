// get product
export default defineEventHandler(async (ev) => {
    const { id } = ev.context.params;
    return useDb().product.findFirst({
        where: {
            id: Number(id),
        }
    })
})
