export default defineEventHandler(async () => {
    return await useDb().category.count();
});