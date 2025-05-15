import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from "../components/Hero"

export default function AppLayout() {

    return (
        <>
            <Header />
            <Hero />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
