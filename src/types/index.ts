import { z } from 'zod';

// ------ Product --------
export const rate = z.object({
    rate: z.number(),
    count: z.number()
})

export const product = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string(),
    rating: rate,
})

export const products = z.array(product)

// -------- Card --------
export type CartProductType = {
    id: number
    image: string
    title: string
    description: string
    rating?: {
        rate: number;
        count: number;
    }
    price: number
    amount?: number
    total?: number
}

export type AddCartProductType = {
    id: number
    image: string
    title: string
    description: string
    price: number
    amount: number
}