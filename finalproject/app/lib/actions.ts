'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: { rejectUnauthorized: false } });

const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.coerce.number(),
    description: z.string(),
});


export async function updateProduct(id: string, formData: FormData) {
    const { name, price, description } = ProductSchema.parse({
        id,
        name: formData.get('name'),
        price: formData.get('price'),
        description: formData.get('description'),
    });

    await sql`
        UPDATE ceramic
        SET name = ${name}, price = ${price}, description = ${description}
        WHERE id = ${id}
    `;

    revalidatePath(`/dashboard/ceramic/${id}`); 
}