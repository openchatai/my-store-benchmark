import { Package2Icon, Settings2, TrashIcon } from "lucide-react";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./@/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./@/ui/card";
import useSWR, { mutate } from "swr";
import { ProductResponseType, deleteProduct, getCategoriesCount, getProductsCount, getTotalPricesOfAllProducts, listProducts, updateProduct } from "./data";
import { ProductCreateForm } from "./CreateProductDialog";
import { EmptyState } from "./EmptyState";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./@/ui/alert-dialog";
import { Button } from "./@/ui/button";
import { ProductForm } from "./productForm";
import { toast } from "sonner";
const mutateProducts = () => mutate('products');
function Stats() {
    const { data: productCount } = useSWR('product-count', getProductsCount);
    const { data: productTotalPrices } = useSWR('product-total-prices', getTotalPricesOfAllProducts);
    const { data: categoriesCount } = useSWR('categories-count', getCategoriesCount);
    return <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Number of Products</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-3xl font-bold">{productCount}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Number Of Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-3xl font-bold">{categoriesCount}</h2>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Total Prices</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-3xl font-bold">{productTotalPrices}$</h2>
            </CardContent>
        </Card>
    </div>
}
function RenderProduct({ product }: { product: ProductResponseType }) {
    return <TableRow>
        <TableCell className="font-medium">{product.id}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell className="hidden md:table-cell">{new Date(product.createdAt).toDateString()}</TableCell>
        <TableCell className="text-right">{product.price}$</TableCell>
        <TableCell className="text-center">
            <div className="space-x-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size='icon' variant='destructive'>
                            <TrashIcon className="size-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to delete this product?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button size='sm' variant='ghost'>Cancel</Button>
                            </AlertDialogCancel>
                            <Button size='sm' onClick={async () => {
                                const resp = deleteProduct(String(product.id));
                                if ((await resp).data) {
                                    toast.success('Product deleted successfully');
                                    mutateProducts();
                                } else {
                                    toast.error('Something went wrong');
                                }
                            }} variant='destructive'>Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size='icon' variant='secondary'>
                            <Settings2 className="size-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Edit Product
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <ProductForm
                            defaultValues={{
                                name: product.name,
                                price: product.price,
                                description: product.descpripion || '',
                            }}
                            inCludeCategory={false}
                            onSubmit={async (data) => {
                                try {
                                    const response = updateProduct(String(product.id), data);
                                    if ((await response).data) {
                                        toast.success('Product updated successfully');
                                        mutateProducts();
                                    }
                                } catch {
                                    toast.error('Something went wrong');
                                }
                            }}
                            footer={() => (<AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Button size='sm' variant='ghost'>Cancel</Button>
                                </AlertDialogCancel>
                                <Button size='sm' type="submit" variant='default'>Save</Button>
                            </AlertDialogFooter>)}
                        />

                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </TableCell>
    </TableRow>
}

export default function HomePage() {
    const { data } = useSWR('products', listProducts)
    return (
        <div className="flex flex-col overflow-hidden">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                <Link className="lg:hidden" href="/">
                    <Package2Icon className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                </Link>
                <div className="flex-1">
                    <h1 className="font-semibold text-lg">Dashboard</h1>
                </div>
                <ProductCreateForm />
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
                <Stats />
                <div className="border shadow-sm rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead className="min-w-[150px]">Name</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data ? data?.length > 0 ? data.map((product, index) => (<RenderProduct product={product} key={index} />))
                                    : <TableCell colSpan={5}><EmptyState title="Oops, there is no products yet" /> </TableCell> : <TableCell colSpan={5}><EmptyState title="Oops, there is no products yet" /> </TableCell>
                            }
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}

