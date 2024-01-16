// add product to category
export default eventHandler(async (event) => {
    const { id } = event.context.params;
    const body = await readBody<{
        categoryId: string;
    }>(event);
    const db = useDb()
    await db.product.update({
        where: {
            id: Number(id),
        },
        data: {
            categories: {
                connect: {
                    id: Number(body.categoryId),
                },
            },
        },
    });
    return db.category.findMany({
        where: {
            id: Number(body.categoryId),
        },
        include: {
            products: {
                select: {
                    id: true,
                    name: true
                }
            },
        },
    })
})
