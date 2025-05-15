import { type AddCartProductType } from '../types/index';
import { useCartStore } from "../store/cartStore";

type Props = {
    product : AddCartProductType
}

export default function AddRemoveProduct(  {product }  : Props ) {
    const removeProduct = useCartStore(state => state.removeProduct);
    const addProduct = useCartStore(state => state.addProduct);

    return (
        <div className="quantity-control">
            <div onClick={() => removeProduct(product.id)}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="black" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <span className="quantity-input">{product.amount}</span>
            <div onClick={() => addProduct({ id: product.id, image: product.image, title: product.title, description: product.description, price: product.price, amount: product.amount })}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="black" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
        </div>
    )
}
