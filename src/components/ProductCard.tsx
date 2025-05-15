import type { AddCartProductType, CartProductType } from "../types"
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "./ui/Toast";

export default function ProductCard({ id, image, title, description, rating, price, amount, total }: CartProductType) {

    const [toastMessage, setToastMessage] = useState('');
    const addProduct = useCartStore(state => state.addProduct);
    const navigate = useNavigate()

    const handleAddCart = (product: AddCartProductType) => {
        addProduct(product);
        setToastMessage('Producto agregado al carrito');
    }

    return (
        <>
            <div className="product-card" onClick={() => navigate(`/producto/${id}`)}>
                <div className="container-card container">
                    <img
                        src={image}
                        className="product-imagen"
                        alt="producto imagen"
                    />
                    <div className="product-info">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        {
                            rating !== undefined && (
                                <span>{"★".repeat(Math.round(rating.rate))}</span>
                            )
                        }
                        {
                            amount !== undefined && (
                                <p className="product-precio">Unidades: {amount}</p>
                            )
                        }
                        {
                            total !== undefined ? (
                                <p className="product-precio">Total a pagar: ${total.toFixed(2)}</p>
                            ) : (
                                <p className="product-precio">${price}</p>
                            )
                        }
                    </div>
                    {
                        total === undefined && (
                            <a
                                className="product-boton"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart({ id, image, title, description, price, amount: 1 });
                                }}
                            >
                                Agregar Al Carrito
                            </a>
                        )
                    }
                </div>
            </div>
            <Toast message={toastMessage} />
        </>
    )
}

