import { Product } from "@prisma/client";

export default defineEventHandler(async (ev) => {
    const body = await readBody<Partial<Product>>(ev);
    const { id } = ev.context.params;
    const product = await useDb().product.update({
        data: body,
        where: { id: Number(id) }
    });
    return product;
})
