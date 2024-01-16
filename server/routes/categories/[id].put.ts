import { Category } from "@prisma/client";

export default defineEventHandler(async (ev) => {
    const body = await readBody<Partial<Category>>(ev);
    const { id } = ev.context.params;
    const category = await useDb().category.update({
        data: body,
        where: { id: Number(id) }
    });
    return category;
})
