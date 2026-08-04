import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNavbar from "@/components/layout/CategoryNavbar";
import Hero from "@/components/home/Hero/Hero";
import Categories from "@/components/home/Categories/";
import TrendingProducts from "@/components/home/TrendingProducts/TrendingProducts";
import TrustedSuppliers from "@/components/home/TrustedSuppliers/TrustedSuppliers";
import Statistics from "@/components/home/Statistics/Statistics";
import Footer from "@/components/home/Footer/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
// import ProductCard from "@/components/category/ProductCard";
// import { products } from "@/data/products"


export default function Home() {
    return (
        <RequireAuth requireAuth={false} blockRoles={["seller"]}>
            <TopBar />
            <Header />
            <CategoryNavbar />
            <Hero />
            <Categories />
            <TrendingProducts />
            <TrustedSuppliers />
            <Statistics />
            <Footer />

        </RequireAuth>
    );
}