import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import { useEffect } from "react";

export default function Default() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return (
    <main className="relative">
      <Modal />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
