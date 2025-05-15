import AddRemoveProduct from "./AddRemoveProduct";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "./ui/Toast";


export default function Cart() {
    const cart = useCartStore(state => state.cart); // funcion para obtener los productos del carrito
    const clearCart = useCartStore(state => state.clearCart); // funcion para vaciar carrito

    const [toastMessage, setToastMessage] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const navigate = useNavigate()

    const handleClearCart = () => {
        if (cart.length > 0) {
            clearCart();
            setToastMessage("Carrito vaciado");
        }
    };


    // Cierra el carrito al hacer click fuera
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const cartElement = document.getElementById("carrito");
            const cartIcon = document.querySelector(".cart-icon");

            if (
                cartElement &&
                !cartElement.contains(e.target as Node) &&
                cartIcon &&
                !cartIcon.contains(e.target as Node)
            ) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className="two columns">
                <ul className="button-menu">
                    <li className="submenu">
                        <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {cart.length > 0 && (
                                <span className="cart-badge">{cart.reduce((acc, p) => acc + p.amount, 0)}</span>
                            )}
                        </div>
                        {
                            isCartOpen && (
                                <div id="carrito">
                                    <table id="lista-carrito">
                                        <tbody>
                                            {cart.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={product.image} alt={product.title} width={50} />
                                                    </td>
                                                    <td>{product.title}</td>
                                                    <td>${product.price}</td>
                                                    <td>{product.amount}</td>
                                                    <td>
                                                        <AddRemoveProduct product={product} />
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {
                                        cart.length === 0 ? (
                                            <>
                                                <a className="button u-full-width" >Carrito Vacio</a>
                                            </>
                                        ) : (
                                            <>
                                                <a className="button u-full-width" onClick={() => navigate('checkout')}>Ir a pagar</a>
                                                <a className="button u-full-width" onClick={handleClearCart}>Vaciar Carrito</a>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </li>
                </ul>
            </div>
            <Toast message={toastMessage} />
        </>
    )
}
