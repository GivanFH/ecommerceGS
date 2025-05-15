import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

export default function Header() {
    const navigate = useNavigate()

    return (
        <header id="header" className="header">
            <div className="container">
                <div className="row">
                    <div className="four columns">
                        <img src="/logo.png" id="logo" onClick={() => navigate(`/`)} />
                    </div>
                    <Cart />
                </div>
            </div>
        </header>
    )
}
