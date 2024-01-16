export default eventHandler(async (event) => {
    const { id } = event.context.params;
    const product = await useDb().product.delete({
        where: {
            id: Number(id),
        },
    });
    return product;
});
