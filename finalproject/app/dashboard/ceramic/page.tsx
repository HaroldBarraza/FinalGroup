import Image from 'next/image';
import { fetchceramic } from '@/app/lib/data';
import '@/app/dashboard/ceramic/ceramic.css';
import ClientSideFilter from './ClientSideFilter';
import Link from 'next/link';

interface CeramicItem {
    id:number;
    name: string;
    price: number;
    description: string;
    image: string;
}


interface Props {
    searchParams: {
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
    };
}

export default async function CeramicItemsTable({ searchParams }: { searchParams: Promise<Props['searchParams']> }) {
    const { minPrice, maxPrice, sortBy } = await searchParams;


    const ceramicItems: CeramicItem[] = await fetchceramic();
    const filteredItems = ceramicItems.filter(item => {
        const price = item.price;
        const min = minPrice ? parseFloat(minPrice) : undefined;
        const max = maxPrice ? parseFloat(maxPrice) : undefined;

        return (
            (min === undefined || price >= min) &&
            (max === undefined || price <= max)
        );
    });


    const sortedItems = filteredItems.sort((a, b) => {
        if (sortBy === 'priceAsc') {
            return a.price - b.price; 
        } else if (sortBy === 'priceDesc') {
            return b.price - a.price; 
        } else if (sortBy === 'nameAsc') {
            return a.name.localeCompare(b.name); 
        } else if (sortBy === 'nameDesc') {
            return b.name.localeCompare(a.name); 
        }
        return 0; 
    });
    return (
        <div className="container">
            <h1 className="titleitem">Cerámica</h1>
            <ClientSideFilter />
            <div className="items-container">
                {sortedItems?.map((item) => (
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
                                    <p>No hay imagen</p>
                                </div>
                            )}
                            <div>
                                <h2 className="item-name">{item.name}</h2>
                                <p className="item-price">{`Precio: $${item.price.toFixed(2)}`}</p>
                                <Link href={`/dashboard/ceramic/${item.id}`}>
                                    <button>View more information</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}