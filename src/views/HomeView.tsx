import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/productsAPI";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/ui/Loader";

export default function HomeView() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['data-devices'],
        queryFn: getAllProducts,
        retry: false,
    })

    if (isLoading) return <Loader />;
    if (isError || !data) return <p>Error al cargar el producto</p>;
    if(data) return (
        <div id="lista-cursos" className="products-container">
            <div className="products-grid">
                {
                    data && data
                        .filter(product => product.category !== "electronics")
                        .map((product, index) => (
                            <ProductCard
                                key={index}
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                description={product.description.split('.')[0] + '.'}
                                rating={product.rating}
                                price={product.price}
                            />
                        ))
                }
            </div>
        </div>
    );
}
