import React from 'react';

interface Review {
    id: number;
    product_id: number;
    rating: number;
    comment: string;
    create_at: string;
}

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div>
            <h3>Reseñas</h3>
            {reviews.length === 0 ? (
                <p>No hay reseñas para este producto.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <strong>Calificación:</strong> {review.rating} <br />
                            <strong>Comentario:</strong> {review.comment} <br />
                            <small>Fecha: {new Date(review.create_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;