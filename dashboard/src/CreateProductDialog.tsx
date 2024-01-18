import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./@/ui/dialog";
import { Field, Form } from "./@/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./@/ui/input";
import { Textarea } from "./@/ui/textarea";
import zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { categorizeProduct, createProduct, listCategories } from "./data";
import { Button } from "./@/ui/button";
import useSWR from "swr";
import React from "react";

type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
}

export function ProductCreateForm() {
    const { data } = useSWR('categories', listCategories, {
        onSuccess(data) {
            data?.map((category) => {
                return zod.literal(category.id.toString())
            }) || []
        },
    })
    const categories = React.useMemo(() => {
        return data?.map((category) => {
            return zod.literal(category.id.toString())
        }) || []
    }, [data]);

    const form = useForm<Product>({
        resolver: zodResolver(zod.object({
            name: zod.string().min(3),
            description: zod.string().min(3),
            price: zod.number().min(1),
            category: zod.union([zod.string(), zod.undefined(), ...categories]).optional()
        })),
    });

    async function onSubmit({ category, ...data }: Product) {
        try {
            const { data: data_ } = await createProduct(data);
            if (data_) {
                toast.success("Product created successfully");
                if (category) {
                    const response = await categorizeProduct(category, data_.id);
                    if (response) {
                        toast.success("Product categorized successfully");
                    }
                }
            }
        } catch {
            toast.error("Failed to create product")
        }
    }
    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant="default">
                add new product
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create Product
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
                <Form {...form}>
                    <Field label="Name" required name="name" control={form.control} render={(p) => <Input type="text" {...p} />} />
                    <Field label="Description" required name="description" control={form.control} render={(p) => <Textarea {...p} />} />
                    <Field label="Price" required name="price" control={form.control} render={({ onChange, ...p }) => <Input {...p} onChange={(ev) => {
                        onChange(parseInt(ev.target.value));
                    }} type="number" />} />
                    <Field label="Category" name="category" control={form.control} render={(p) => <select {...p} className="w-full p-2 rounded-lg">
                        <option value="">Select Category</option>
                        {
                            data?.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>} />
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="default">Save</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog >)
}