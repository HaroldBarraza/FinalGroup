"use client";

import '@/app/dashboard/ceramic/clientfilter.css'
import { useState } from 'react';

export default function ClientSideFilter() {
    const [sortBy] = useState<string>(''); 

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = e.target.value;
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('sortBy', selectedSort);
        window.location.href = newUrl.toString(); 
    };

    return (
        <div className="filter-container">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange} >
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="nameAsc">Name: A a Z</option>
                <option value="nameDesc">Name: Z a A</option>
            </select>
        </div>
    );
}