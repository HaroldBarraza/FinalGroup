import Image from 'next/image';
import { fetchceramic } from '@/app/lib/data';
import '@/app/dashboard/ceramic/ceramic.css';

export default async function CeramicItemsTable() {
    const ceramicItems = await fetchceramic();

    return (
        <div className="container">
            <h1 className="titleitem">Ceramic</h1>
            <div className="items-container">
                {ceramicItems?.map((item) => (
                    <div key={item.name} className="item">
                        <div className="item-content">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    className="item-image"
                                    width={100}
                                    height={100}
                                    alt={`${item.name}'s image`}
                                    unoptimized
                                />
                            ) : (
                                <div className="placeholder-image">
                                    <p>No Image</p>
                                </div>
                            )}
                            <div>
                                <h2 className="item-name">{item.name}</h2>
                                <p className="item-description">{item.description}</p>
                                <p className="item-price">{`Price: $${item.price.toFixed(2)}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}