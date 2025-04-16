'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import '@/app/ui/invoices/search.css';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResultItem {
  id: number;
  name: string;
  image: string;
  category: string;
}

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [query, setQuery] = useState('');

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    setQuery(term);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) {
      setResults([]);
      return;
    }

    fetch(`/api/search?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
      });
  }, [searchParams]);

  return (
    <div className="totalsearch">
      <input
        className="searchbar"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />

      {query && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((item) => (
              <div key={`${item.category}-${item.id}`} className="search-result-item">
                <Link href={`/dashboard/${item.category}/${item.id}`} passHref>
                  <div className="result-item">
                    <Image
                      src={item.image || '/default-product-image.png'}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="product-image"
                    />
                    <strong>{item.name}</strong> <span>({item.category})</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay resultados.</p>
          )}
        </div>
      )}
    </div>
  );
}
