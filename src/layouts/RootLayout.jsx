import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <AuthContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </main>
  );
};

export default RootLayout;
