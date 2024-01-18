export default defineEventHandler(async (ev) => {
    return await useDb().product.aggregate({
        _sum: {
            price: true
        }
    }).then((result) => {
        return result._sum.price;
    })
})