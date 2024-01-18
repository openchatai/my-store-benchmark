import { Package2Icon } from "lucide-react";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./@/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./@/ui/card";
import useSWR from "swr";
import { getCategoriesCount, getProductsCount, getTotalPricesOfAllProducts, listProducts } from "./data";
import { ProductCreateForm } from "./CreateProductDialog";

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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data?.map((product, index) => {
                                    return <TableRow key={index}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{new Date(product.createdAt).toDateString()}</TableCell>
                                        <TableCell className="text-right">{product.price} $</TableCell>
                                    </TableRow>
                                })
                            }

                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}

