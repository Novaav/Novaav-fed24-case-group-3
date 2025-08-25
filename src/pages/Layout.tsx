import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      {" "}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
