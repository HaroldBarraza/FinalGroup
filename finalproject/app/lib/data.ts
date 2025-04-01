import postgres from "postgres";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: { rejectUnauthorized: false } })

export async function fetchceramic() {
    try{
        const ceramic = await sql `SELECT name, price, description, image 
        FROM ceramic`;
        console.log(ceramic)
        return ceramic;
    }catch (error) {
        if (error instanceof Error) {
            console.error('Database Error:', error.message);
        } else {
            console.error('Database Error:', error); 
        }
        throw new Error('Failed to fetch ceramic data');
    }
    
};

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