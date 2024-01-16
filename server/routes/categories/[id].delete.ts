export default eventHandler(async (event) => {
    const { id } = event.context.params;
    const category = await useDb().category.delete({
        where: {
            id: Number(id),
        },
    });
    return category;
})
