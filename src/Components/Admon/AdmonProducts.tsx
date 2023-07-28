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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AdmonProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    if (localStorage.getItem("token") === null && localStorage.getItem("role") === null) {
      navigate("/");
    }
  };
  const [errorAdd, setErrorAdd] = useState(''); 
  const notifyDelete = () => toast.success("Producto eliminado");
  const notifyAdd = () => toast.success("Nuevo producto");
  const notifyEdit = () => toast.success("Producto editado");

  function handleProducts() {
  return  fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEPRODUCTS", error);
      });
  }

  function handleEdit(id: number, name: string, price: number, type: string) {
    return patchProducts(id, name, price, type)
      .then(() => {
        handleProducts();
        notifyEdit();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEEDIT", error);
      });
  }

  function handleDelete(id: number | null) {
    return deleteProduct(id)
      .then(() => {
        handleProducts();
        notifyDelete();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEDELETE", error);
      });
  }

  function handleAddProduct(name: string, price: number, type: string): Promise<void>|Promise <object> {
    return postProducts(name, price, type)
      .then(() => {
        setErrorAdd('');
        handleProducts();
        notifyAdd();
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
          error={errorAdd}
        ></ProductsTable>
        <ToastContainer
          theme="dark"
          toastClassName={() => "flex bg-blackInput p-4 rounded justify-between border-2 border-kitchenText"}
          bodyClassName={() => "flex flex-row text-kitchenText items-center"}
          hideProgressBar
        />
      </section>
    </>
  );
}
