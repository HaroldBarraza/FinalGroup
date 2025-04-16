import { fetchProductById } from '@/app/lib/data'; 
import EditForm from '@/app/ui/ceramic/edit-form';

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
    
    const resolvedParams = await params; 
    const { productId } = resolvedParams; 

    if (!productId) {
        return <div>Product not found</div>; 
    }

    const id = Number(productId);
    if (isNaN(id)) {
        return <div>ID de producto no válido</div>; 
    }

    const product = await fetchProductById(id); 

    if (!product) {
        return <div>Product not found</div>; 
    }

    return (
        <main>
            <h1>Product Details</h1>
            <EditForm product={product} />
        </main>
    );
}
