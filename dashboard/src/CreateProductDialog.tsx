import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./@/ui/dialog";
import { Field, Form } from "./@/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./@/ui/input";
import { Textarea } from "./@/ui/textarea";
import zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createProduct } from "./data";
import { Button } from "./@/ui/button";

type Product = {
    name: string;
    description: string;
    price: number;
}

export function ProductCreateForm() {
    const form = useForm<Product>({
        resolver: zodResolver(zod.object({
            name: zod.string().min(3),
            description: zod.string().min(3),
            price: zod.number().min(1),
        })),
    });
    async function onSubmit(data: Product) {
        try {

            const { data: data_ } = await createProduct(data);
            if (data_) {
                toast.success("Product created successfully");
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