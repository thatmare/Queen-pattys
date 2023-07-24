import { Logo } from "../Login/Login.components.tsx";
import { ProductsTable } from "./Products.components.tsx";
import { useNavigate } from "react-router";
import { AdmonNavbar } from "../Navbar/AdmonNavbar.tsx";
import { useState, useEffect } from "react";
import {
  postProducts,
  deleteProduct,
  fetchProducts,
  patchProducts,
} from "../../Services/products.tsx";

export function AdmonProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };

  function handleProducts() {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEPRODUCTS", error);
      });
  }

  function handleEdit(id: number, name: string, price: number, type: string) {
    patchProducts(id, name, price, type)
      .then(() => {
        handleProducts();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEEDIT", error);
      });
  }

  function handleDelete(id: number) {
    deleteProduct(id)
      .then(() => {
        handleProducts();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEDELETE", error);
      });
  }

  function handleAddProduct(name: string, price: number, type: string) {
    postProducts(name, price, type)
      .then(() => {
        handleProducts();
      })
      .catch((error) => {
        console.error("AQUI ERROR DE HANDLEADD", error);
      });
  }

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <>
      <AdmonNavbar handleLogout={handleLogout} />
      <section className="flex flex-col bg-gunMetal min-h-screen min-w-fit">
        <div className="mt-10">
          <Logo />
        </div>
        <ProductsTable
          handleAddProduct={handleAddProduct}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          ProductsItems={products}
        ></ProductsTable>
      </section>
    </>
  );
}
