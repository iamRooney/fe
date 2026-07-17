import TopBar from "./TopBar";
import Navbar from "./NavBar";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <TopBar />
            <Navbar />
        </header>
    );
}