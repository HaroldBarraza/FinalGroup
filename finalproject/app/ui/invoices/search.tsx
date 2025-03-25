'use client'; 
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import '@/app/ui/invoices/search.css';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda de la URL
    const pathname = usePathname(); // Obtiene la ruta actual
    const { replace } = useRouter(); // Obtiene la función replace para cambiar la URL

    function handleSearch(term: string) {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams); // Crea un nuevo objeto URLSearchParams a partir de los parámetros de búsqueda actuales
        params.set('page', '1'); // Establece la página a 1
        if (term) {
            params.set('query', term); // Si hay un término de búsqueda, lo establece
        } else {
            params.delete('query'); // Si no hay término, elimina el parámetro de búsqueda
        }
        replace(`${pathname}?${params.toString()}`); // Reemplaza la URL con los nuevos parámetros
    }

    return (
        <div className="totalsearch">
            <label htmlFor="search" className="sr-only">Search</label>
            <img src='/lupa.png' alt='search' width={10} />
            <input
                className="searchbar"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value); // Llama a handleSearch en el cambio del input
                }}
                defaultValue={searchParams.get('query')?.toString()} // Establece el valor por defecto del input
            />
        </div>
    );
}