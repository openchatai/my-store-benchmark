// includes the categories and the count of the products in each category
export default eventHandler(async (event) => {
    const categories = await useDb().category.findMany({
        include: {
            products: true,
        },
    });
    return categories;
})
