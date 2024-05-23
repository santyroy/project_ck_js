import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Overlay from "../shared/Overlay";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow">
      <nav className="container mx-auto px-5">
        <Navbar
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />

        <Sidebar
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />

        {showMobileMenu && <Overlay />}
      </nav>
    </header>
  );
};

export default Header;
