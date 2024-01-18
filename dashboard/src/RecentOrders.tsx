import { Link } from "wouter"
import { Package2Icon } from "lucide-react"
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "./@/ui/table"
export default function RecentOrders() {
    return (
        <div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link className="lg:hidden" href="#">
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">Recent Orders</h1>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="border shadow-sm rounded-lg p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Customer Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">#3210</TableCell>
                                    <TableCell>Olivia Martin</TableCell>
                                    <TableCell>February 20, 2024</TableCell>
                                    <TableCell className="text-right">$42.25</TableCell>
                                    <TableCell>Shipped</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3209</TableCell>
                                    <TableCell>Ava Johnson</TableCell>
                                    <TableCell>January 5, 2024</TableCell>
                                    <TableCell className="text-right">$74.99</TableCell>
                                    <TableCell>Paid</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3204</TableCell>
                                    <TableCell>Michael Johnson</TableCell>
                                    <TableCell>August 3, 2023</TableCell>
                                    <TableCell className="text-right">$64.75</TableCell>
                                    <TableCell>Unfulfilled</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3203</TableCell>
                                    <TableCell>Lisa Anderson</TableCell>
                                    <TableCell>July 15, 2023</TableCell>
                                    <TableCell className="text-right">$34.50</TableCell>
                                    <TableCell>Shipped</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3202</TableCell>
                                    <TableCell>Samantha Green</TableCell>
                                    <TableCell>June 5, 2023</TableCell>
                                    <TableCell className="text-right">$89.99</TableCell>
                                    <TableCell>Paid</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3201</TableCell>
                                    <TableCell>Adam Barlow</TableCell>
                                    <TableCell>May 20, 2023</TableCell>
                                    <TableCell className="text-right">$24.99</TableCell>
                                    <TableCell>Unfulfilled</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3207</TableCell>
                                    <TableCell>Sophia Anderson</TableCell>
                                    <TableCell>November 2, 2023</TableCell>
                                    <TableCell className="text-right">$99.99</TableCell>
                                    <TableCell>Paid</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">#3206</TableCell>
                                    <TableCell>Daniel Smith</TableCell>
                                    <TableCell>October 7, 2023</TableCell>
                                    <TableCell className="text-right">$67.50</TableCell>
                                    <TableCell>Shipped</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
}
