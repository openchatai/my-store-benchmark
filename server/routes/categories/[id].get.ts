export default defineEventHandler(async (ev) => {
    const { id } = ev.context.params;
    const category = await useDb().category.findFirst({
        where: { id: Number(id) }
    });
    return category;
})
