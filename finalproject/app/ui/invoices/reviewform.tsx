import React, { useState } from 'react';

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
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <div>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Review</button>
        </form>
    );
};

export default ReviewForm;