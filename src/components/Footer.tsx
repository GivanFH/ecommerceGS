export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <div className="container">
                <div className="row">
                    <div className="four columns">
                        <h5>AYUDA</h5>
                        <nav id="principal" className="menu">
                            <a className="enlace">FAQs</a>
                            <a className="enlace">Devoluciones y cambios</a>
                            <a className="enlace">Contactanos</a>
                            <a className="enlace">Terminos del servicio</a>
                            <a className="enlace">Tabla de tallas</a>
                        </nav>
                    </div>
                    <div className="four columns">
                        <h5>COMPRA</h5>
                        <nav id="secundaria" className="menu">
                            <a className="enlace">Busqueda</a>
                            <a className="enlace">Todos los productos</a>
                            <a className="enlace">Tarjetas de regalo</a>
                            <a className="enlace">Recompensas</a>
                        </nav>
                    </div>
                    <div className="four columns">
                        <h5>EXPLORA</h5>
                        <nav id="secundaria" className="menu">
                            <a className="enlace">Nuestra historia</a>
                            <a className="enlace">Reseñas de clientes</a>
                            <a className="enlace">Trabaja con nosotros</a>
                            <a className="enlace">Cuenta</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
