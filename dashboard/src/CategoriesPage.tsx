import { Link } from 'wouter'
import { CreateCategoryDialog } from './CreateCategoryDialog'
import { Package2Icon } from 'lucide-react'
import useSWR from 'swr'
import { listCategories } from './data'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './@/ui/Accordion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './@/ui/table'

function CategoriesPage() {
  const { data } = useSWR('categories', listCategories)
  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="lg:hidden" href="/">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Categories</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Categories</h1>
        </div>
        <CreateCategoryDialog />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-2 md:gap-8 md:p-4 overflow-auto">
        <Accordion className='flex flex-col gap-2' type='multiple'>
          {
            data?.map((ct, index) => {
              return <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger>
                  {ct.name}
                </AccordionTrigger>
                <AccordionContent>
                  <h2 className='font-bold text-lg'>Products</h2>
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
                        ct.products.map((product, index) => {
                          return <TableRow key={index}>
                            <TableCell className='font-medium'>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className='hidden md:table-cell'>{product.createdAt}</TableCell>
                            <TableCell className='text-right'>{product.price}</TableCell>
                          </TableRow>
                        })
                      }
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            })
          }
        </Accordion>
      </main>
    </div>
  )
}

export default CategoriesPage