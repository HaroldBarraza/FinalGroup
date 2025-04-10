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
    const renderStars = (rating: number) => {
        return (
            <>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{
                            color: star <= rating ? 'gold' : 'gray',
                            fontSize: '20px', // Ajusta el tamaño según sea necesario
                        }}
                    >
                        ★
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className='coment'>
            <h3>Reseñas</h3>
            {reviews.length === 0 ? (
                <p>No hay reseñas para este producto.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id} className='commentspace'>
                            <strong></strong> {review.comment} <br />
                            <strong></strong> {renderStars(review.rating)} <br />
                            <small>Fecha: {new Date(review.create_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;