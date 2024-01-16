import { Category } from "@prisma/client";

export default eventHandler(async (event) => {
    const body = await readBody<Category>(event);
    const category = await useDb().category.create({
        data: body,
    });
    return category;
})
