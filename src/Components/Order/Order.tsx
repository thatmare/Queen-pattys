import { MenuBtn, FoodItems, Client, OrderSum } from "./Order.components.tsx";
import { useEffect, useState } from "react";
import { Logo } from "../Login/Login.components.tsx";
import { fetchProducts } from "../../Services/products.tsx";
import { Navbar } from "../Navbar/Navbar.tsx";
import { useNavigate } from "react-router";

function Order() {
  const [products, setProducts] = useState([]);
  const [counters, setCounters] = useState<{ [key: string]: number }>({});
  const [selectedClient, setSelectedClient] = useState("");
  const handleOrderSubmit = () => {
    setCounters({});
  };
  const desayunoItems = ["Desayuno"];
  const almuerzoCenaItems = ["Almuerzo y cena"];
  const menuItems = products;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };

  const handleDelivers = () => {
      navigate("/delivers");
  };
  
  
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error setting products:", error);
      });
  }, []);

  return (
    <>
    <Navbar handleLogout={handleLogout} handleDelivers={handleDelivers}></Navbar>
    <section className=" bg-gunMetal min-h-screen min-w-fit flex flex-col items-center pt-10 ">
      <Logo></Logo>
      <div className="flex justify-center items-center w-4/6 md:w-4/5 lg:w-3/5 mt-10">
        <MenuBtn meals={desayunoItems}></MenuBtn>
        <MenuBtn meals={almuerzoCenaItems}></MenuBtn>
      </div>
      <div className="grid grid-cols-[60%,40%] md:w-4/5 lg:w-3/5">
        <div>
          <FoodItems
            items={menuItems}
            counters={counters}
            setCounters={setCounters}
          ></FoodItems>
        </div>
        <div className="grid grid-rows-[0.2fr,1fr]">
          <Client setSelectedClient={setSelectedClient}></Client>
          <OrderSum
            counters={counters}
            menuItems={menuItems}
            selectedClient={selectedClient}
            onOrderSubmit={handleOrderSubmit}
          ></OrderSum>
        </div>
      </div>
    </section>
    </>
  );
}

export { Order };
