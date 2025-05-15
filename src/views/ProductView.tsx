import { useNavigate, useParams } from "react-router-dom";
import { type AddCartProductType } from '../types/index';
import { getProductById } from "../api/productsAPI";
import { useCartStore } from "../store/cartStore";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/ui/Loader";

export default function ProductView() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product-details', productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
    retry: false,
  })

  const addProduct = useCartStore(state => state.addProduct);

  const handleBuyNow = (product: AddCartProductType) => {
    addProduct(product)
    navigate('/checkout')
  }


  if (isLoading) return <Loader />;
  if (isError || !data) return <p>Error al cargar el producto</p>;
  if (data) return (
    <div className="product-container">
      <div className="product-image-wrapper">
        <img src={data.image} alt={data.title} className="product-image" />
      </div>
      <div className="product-details">
        <span className="product-badge">DISPONIBLES</span>
        <h2>{data.title}</h2>
        <div className="product-rating">
          <span>{"★".repeat(Math.round(data.rating.rate))}</span>
          <span className="product-reviews">({data.rating.count} reviews)</span>
        </div>
        <p className="product-price">${data.price}</p>
        <p className="product-description">{data.description}</p>

        <div className="product-options">
          <div>
            <label>Color</label>
            <div className="color-selector">
              <span className="color-swatch blue selected" />
              <span className="color-swatch pink" />
            </div>
          </div>
          <div>
            <label>Talla</label>
            <span className="quantity-input">
              8
            </span>
          </div>
          <div>
          </div>
        </div>
        <div className="product-actions">
          <a
            className="button u-full-width"
            onClick={() => { addProduct({ id: data.id, image: data.image, title: data.title, description: data.description, price: data.price, amount: 1 }) }}
          >
            Agregar al carrito
          </a>
          <a
            className="button u-full-width"
            onClick={() => { handleBuyNow({ id: data.id, image: data.image, title: data.title, description: data.description, price: data.price, amount: 1 }) }}
          >
            Comprar ahora
          </a>
        </div>
      </div>
    </div>
  );
}
