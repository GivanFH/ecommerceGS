import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/productsAPI";
import Loader from "../components/ui/Loader";

const PRODUCTS_PER_PAGE = 8;

export default function HomeView() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['data-devices'],
        queryFn: getAllProducts,
        retry: false,
    });

    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading) return <Loader />;
    if (isError || !data) return <p>Error al cargar el producto</p>;

    const filteredProducts = data.filter(product => product.category !== "electronics");

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    return (
        <div className="products-container">
            <div className="products-grid">
                {paginatedProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        description={product.description.split('.')[0] + '.'}
                        rating={product.rating}
                        price={product.price}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className="pagination-controls">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
