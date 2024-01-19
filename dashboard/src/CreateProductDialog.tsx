import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./@/ui/dialog";
import { toast } from "sonner";
import { categorizeProduct, createProduct } from "./data";
import { Button } from "./@/ui/button";
import { ProductForm } from "./productForm";


export function ProductCreateForm() {
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

            <ProductForm
                onSubmit={async ({ category, ...data }) => {
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
                }}
                footer={() => (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="default">Save</Button>
                    </DialogFooter>
                )}
            />
        </DialogContent>
    </Dialog >)
}