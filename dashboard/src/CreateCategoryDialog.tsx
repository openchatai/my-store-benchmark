import { PanelTopCloseIcon } from "lucide-react";
import { Button } from "./@/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "./@/ui/dialog";
import { Input } from "./@/ui/input";
import { Textarea } from "./@/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Form } from "./@/ui/form";
import { createCategory } from "./data";
import { toast } from "sonner";

const schema = z.object({
    name: z.string().min(2, { message: 'Category name is required' }),
    description: z.string().min(1, { message: 'Category description is required' }),
});
export function CreateCategoryDialog() {
    const form = useForm({
        resolver: zodResolver(schema),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add New Category</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md p-6">
                <div className="absolute top-2 right-2">
                    <Button size="icon" variant="ghost">
                        <PanelTopCloseIcon className="h-5 w-5" />
                    </Button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                <form onSubmit={form.handleSubmit(async (v) => {
                    const { data } = await createCategory(v)
                    if (data) {
                        toast.success('Category created successfully')
                        form.reset()
                    } else {
                        toast.error('Something went wrong')
                    }
                })}>
                    <Form {...form}>
                        <Field
                            control={form.control}
                            name="name"
                            label="Category Name"
                            required
                            render={(f) => <Input {...f} />}
                        />
                        <Field
                            control={form.control}
                            name="description"
                            label="Category Description"
                            required
                            render={(f) => <Textarea {...f} />}
                        />
                        <DialogFooter>
                            <Button className="mt-4" type="submit">
                                Add Category
                            </Button>
                        </DialogFooter>
                    </Form>
                </form>
            </DialogContent>
        </Dialog>
    )
}
