export default eventHandler(async (event) => {
    const categories = await useDb().category.findMany();
    return categories;
})
