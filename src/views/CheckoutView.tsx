import AddRemoveProduct from "../components/AddRemoveProduct";
import { useCartStore } from "../store/cartStore";

export default function CheckoutView() {
    const cart = useCartStore(state => state.cart);

    const subtotal = cart.reduce((acc, producto) => acc + producto.price * producto.amount, 0);
    const shippingProtection = 1.50;
    const total = subtotal + shippingProtection;

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h2>Contacto</h2>
                <input type="email" placeholder="Correo electrónico" className="input" />
                <label className="checkbox-label">
                    <input type="checkbox" checked readOnly />
                    Suscríbete para ser el primero en enterarte de los nuevos lanzamientos.
                </label>

                <h2>Direccion de envío</h2>
                <input type="text" placeholder="Nombre(s)" className="input" />
                <input type="text" placeholder="Apellidos" className="input" />
                <input type="text" placeholder="Dirección" className="input" />
                <input type="text" placeholder="Apartamento, casa, etc. (opcional)" className="input" />
                <input type="text" placeholder="Ciudad" className="input" />
                <input type="text" placeholder="Estado" className="input" />
                <input type="text" placeholder="Código postal" className="input" />
                <input type="text" placeholder="Número de teléfono" className="input" />
            </div>
            <div className="checkout-summary">
                {cart.map(product => (
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <div className="details">
                            <p className="title">{product.title}</p>
                            <p className="price">{product.amount} x ${product.price.toFixed(2)} : <span className="title">${product.amount * product.price}</span></p>
                            <AddRemoveProduct product={product} />
                        </div>
                    </div>
                ))}

                <div className="summary-item">
                    <span>Protección de envío</span>
                    <span>${shippingProtection.toFixed(2)}</span>
                </div>

                <div className="summary-item">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-item total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
