import { Product } from "@prisma/client";

export default defineEventHandler(async (ev) => {
    const body = await readBody<Product>(ev)
    const product = await useDb().product.create({
        data: body,
    });
    return product;
})
