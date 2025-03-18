import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navber from "../components/Navber";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="w-11/12 max-w-max mx-auto min-h-screen">
      <ToastContainer />
      <header className="sticky top-0 w-full  z-50">
        <Navber />
      </header>

      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
