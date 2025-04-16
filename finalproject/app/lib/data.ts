import postgres from 'postgres';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: { rejectUnauthorized: false } })

export default sql;

export interface User{
    id: number;
    name: string;
    password: string;
}

export interface CeramicItem {
    
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export async function fetchceramic(): Promise<CeramicItem[]> {
    try {
        const ceramic = await sql`SELECT id, name, price, description, image FROM ceramic`;
        return ceramic.map(row => ({
            id: Number(row.id), 
            name: row.name,
            price: parseFloat(row.price),
            description: row.description,
            image: row.image
        }));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch ceramic data');
    }
}

export async function fetchclothing() {
    try{
        const clothing = await sql `SELECT name, price, description, imagen 
        FROM clothing`;
        console.log(clothing)
        return clothing;
    }catch (error) {
        if (error instanceof Error) {
            console.error('Database Error:', error.message);
        } else {
            console.error('Database Error:', error); 
        }
        throw new Error('Failed to fetch ceramic data');
    }
    
};

export async function fetchjew() {
    try{
        const jew = await sql `SELECT name, price, description, imagen 
        FROM jewelry`;
        console.log(jew)
        return jew;
    }catch (error) {
        if (error instanceof Error) {
            console.error('Database Error:', error.message);
        } else {
            console.error('Database Error:', error); 
        }
        throw new Error('Failed to fetch ceramic data');
    }
    
};


export async function fetchReviews(productId: number) {
    try {
        console.log('Fetching reviews for product ID:', productId); 
        const reviews = await sql`
            SELECT id, product_id, rating, comment, create_at
            FROM reviews
            WHERE product_id = ${productId}
            ORDER BY create_at DESC
        `;
        return reviews;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error; 
    }
}


export async function addReview(productId: number, rating: number, comment: string) {
    try {
        const result = await sql`
            INSERT INTO reviews (product_id, rating, comment, create_at)
            VALUES (${productId}, ${rating}, ${comment}, NOW())
            RETURNING id, product_id, rating, comment, create_at;
        `;
        return result[0]; 
    } catch (error) {
        console.error('Error adding review:', error);
        throw error; 
    }
}

export async function fetchProductById(productId: number): Promise<CeramicItem | null> {
    try {
        const product = await sql`SELECT id, name, price, description, image FROM ceramic WHERE id = ${productId}`;
        return product.length > 0 ? {
            id: Number(product[0].id),
            name: product[0].name,
            price: parseFloat(product[0].price),
            description: product[0].description,
            image: product[0].image
        } : null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data');
    }
}

