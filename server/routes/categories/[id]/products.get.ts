// get all categories but include product ids
export default eventHandler(async (event) => {
    const { id } = event.context.params;
    const category = await useDb().category.findMany({
        where: {
            id: Number(id),
        },
        include: {
            products: {
                select: {
                    id: true
                },
            },
        },
    });
    return category;
});
