import axios from 'axios';

const BACKEND_BASE_URL = 'http://localhost:3000/';

type Product = {
    id: number,
    name: string,
    price: number,
    createdAt: string,
    updatedAt: string
    deletedAt: string
    descpripion?: string
}

type Category = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
    deletedAt: string
    descpripion?: string
}
// {{DUMMY_STORE_BASE}}/products
const productsInstance = axios.create({
    baseURL: BACKEND_BASE_URL + "products/",
})
const categoriesInstance = axios.create({
    baseURL: BACKEND_BASE_URL + "categories/",
})
const baseInstane = axios.create({
    baseURL: BACKEND_BASE_URL,
})

export async function listProducts() {
    return (await productsInstance.get<Product[]>('')).data
}

export async function updateProduct(id: string, data: Partial<Product>) {
    return await productsInstance.post(id, {
        body: JSON.stringify(data),
    })
}
export async function createProduct(data: Partial<Product>) {
    return await productsInstance.post('/create', data)
}

export async function deleteProduct(id: string) {
    return await productsInstance.delete(id)
}

export async function ping() {
    return await baseInstane.get<'200'>('')
}
export async function getProductsCount() {
    return (await productsInstance.get<number>('count')).data
}
export async function getTotalPricesOfAllProducts() {
    return (await productsInstance.get<number>('total-prices')).data
}
export async function getCategoriesCount() {
    return (await categoriesInstance.get<number>('count')).data
}

export async function createCategory(data: Partial<Category>) {
    return await categoriesInstance.post('/create', data)
}
export async function listCategories() {
    type CategoryWithProducts = Category & { products: Product[] }
    return (await categoriesInstance.get<CategoryWithProducts[]>('')).data
}