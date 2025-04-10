import React, { useState } from 'react';
import '@/app/ui/invoices/review.css';

interface ReviewFormProps {
    productId: number;
    onReviewAdded: () => void; 
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewAdded }) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/dashboard/ceramic/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, comment }),
            });

            if (response.ok) {
                await onReviewAdded(); 
                setRating(0); 
                setComment('');
            } else {
                console.error('Error adding review');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='rating'>
                <label>Rating:</label>
                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                cursor: 'pointer',
                                fontSize: '30px',
                                color: star <= rating ? 'gold' : 'gray',
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className='commentinput'>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <button className='enviar' type="submit">Add Review</button>
        </form>
    );
};

export default ReviewForm;