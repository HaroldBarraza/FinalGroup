'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReviewForm from '@/app/ui/invoices/reviewform';
import ReviewList from '@/app/ui/invoices/reviewlist';
import '@/app/ui/ceramic/editform.css';

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
  product?: CeramicItem;
}

const EditForm: React.FC<EditFormProps> = ({ product }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<CeramicItem | null>(product ?? null);

  useEffect(() => {
    if (!product) return;

    setEditedProduct(product); // actualiza el producto por si cambia

    const fetchReviews = async () => {
      const response = await fetch(`/dashboard/ceramic/${product.id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      } else {
        console.error('Error fetching reviews');
      }
    };

    fetchReviews();
  }, [product]);

  if (!editedProduct) {
    return <div>Loading product...</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev!,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    const response = await fetch(`/api/ceramic/${editedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    });

    if (response.ok) {
      const data = await response.json();
      setEditedProduct(data.product);
      setIsEditing(false);
    } else {
      console.error('Error updating product');
    }
  };

  return (
    <div className="edit-form">
      <div className="product">
        <div className="information">
          {isEditing ? (
            <>
              <input
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="form-groupname"
              />
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                className="form-groupdescription"
              />
              <input
                name="price"
                type="number"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="form-groupprice"
              />
            </>
          ) : (
            <>
              <div className="form-groupname">{editedProduct.name}</div>
              <div className="form-groupdescription">{editedProduct.description}</div>
              <div className="form-groupprice">
                {editedProduct.price !== undefined && editedProduct.price !== null
                  ? `$${editedProduct.price.toFixed(2)}`
                  : 'Precio no disponible'}
              </div>
            </>
          )}

          <button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? 'Guardar' : 'Editar'}
          </button>
        </div>

        <div className="form-groupimg">
          {editedProduct.image ? (
            <Image
              src={editedProduct.image}
              className="item-image"
              width={100}
              height={100}
              alt={`${editedProduct.name}'s image`}
              unoptimized
            />
          ) : (
            <div>No hay imagen disponible</div>
          )}
        </div>
      </div>

      <ReviewForm productId={editedProduct.id} onReviewAdded={() => {
        fetch(`/dashboard/ceramic/${editedProduct.id}/reviews`)
          .then(res => res.json())
          .then(data => setReviews(data.reviews))
          .catch(err => console.error(err));
      }} />

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default EditForm;
