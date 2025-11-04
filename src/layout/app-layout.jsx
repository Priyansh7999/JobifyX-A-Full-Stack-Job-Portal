import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;