'use client'; 
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import '@/app/ui/invoices/search.css';
import Image from 'next/image';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="totalsearch">
            <label htmlFor="search" className="sr-only"></label>
            <Image src='/lupa.png' alt='search' width={10} height={10} />
            <input
                className="searchbar"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}