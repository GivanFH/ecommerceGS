import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductoLayout from './layouts/ProductoLayout';
import CheckoutView from './views/CheckoutView';
import ProductView from './views/ProductView';
import AppLayout from './layouts/AppLayout';
import HomeView from './views/HomeView';
import './index.css'
import ScrollToTop from './components/ui/ScrollToTop';


export default function Router() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />} index />
                </Route>
                <Route element={<ProductoLayout />}>
                    <Route path="/producto/:productId" element={<ProductView />} />
                    <Route path="/checkout" element={<CheckoutView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
