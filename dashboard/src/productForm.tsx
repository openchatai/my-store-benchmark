import { Field, Form } from "./@/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";
import { Input } from "./@/ui/input";
import { Textarea } from "./@/ui/textarea";
import zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { listCategories } from "./data";
import useSWR from "swr";
import React from "react";

const productSchema = (categories: zod.ZodLiteral<string>[]) => zod.object({
    name: zod.string().min(3),
    description: zod.string().min(3),
    price: zod.number().min(1),
    category: zod.union([zod.string(), zod.undefined(), ...categories]).optional()
})
type Product = zod.infer<ReturnType<typeof productSchema>>

export function ProductForm({
    defaultValues,
    footer,
    onSubmit,
    inCludeCategory = true
}: {
    defaultValues?: Product
    footer: (form: UseFormReturn<Product>) => React.ReactNode
    onSubmit: (data: Product) => void,
    inCludeCategory?: boolean
}) {
    const { data } = useSWR('categories', listCategories)
    const categories = React.useMemo(() => {
        return data?.map((category) => {
            return zod.literal(category.id.toString())
        }) || []
    }, [data]);
    const form = useForm<Product>({
        resolver: zodResolver(productSchema(categories)),
        values: defaultValues,
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
            <Form {...form}>
                <Field label="Name" required name="name" control={form.control} render={(p) => <Input type="text" {...p} />} />
                <Field label="Description" required name="description" control={form.control} render={(p) => <Textarea {...p} />} />
                <Field label="Price" required name="price" control={form.control} render={({ onChange, ...p }) => <Input {...p} onChange={(ev) => {
                    onChange(parseInt(ev.target.value));
                }} type="number" />} />
                {
                    inCludeCategory && (<Field label="Category" name="category" control={form.control} render={(p) => <select {...p} className="w-full p-2 rounded-lg">
                        <option value="">Select Category</option>
                        {
                            data?.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>} />)
                }
                {footer(form)}
            </Form>
        </form>
    )
}