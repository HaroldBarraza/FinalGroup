'use client'
import React, { useState , useEffect } from 'react';
import Image from 'next/image';
import ReviewForm from '@/app/ui/invoices/reviewform';
import ReviewList from '@/app/ui/invoices/reviewlist';

interface CeramicItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string; 
}
interface Review {
    id: number;
    product_id: number;
    rating: number;
    comment: string;
    create_at: string;
}

interface EditFormProps {
    product: CeramicItem; 
}
const EditForm: React.FC<EditFormProps> = ({ product }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviews = async () => {
        const response = await fetch(`/dashboard/ceramic/${product.id}/reviews`);
        if (response.ok) {
            const data = await response.json();
            setReviews(data.reviews);
        } else {
            console.error('Error fetching reviews');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [product.id]);

    return (
        <div className="edit-form">
            <div className="form-group">
                <div>{product.name}</div>
            </div>
            <div className="form-group">
                <div>{`$${product.price.toFixed(2)}`}</div>
            </div>
            <div className="form-group">
                <div>{product.description}</div>
            </div>
            <div className="form-group">
                {product.image ? (
                    <Image
                        src={product.image}
                        className="item-image"
                        width={100}
                        height={100}
                        alt={`${product.name}'s image`}
                        unoptimized
                    />
                ) : (
                    <div>No hay imagen disponible</div>
                )}
            </div>
            <ReviewForm productId={product.id} onReviewAdded={fetchReviews} />
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default EditForm;