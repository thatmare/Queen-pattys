import { Logo } from "../Login/Login.components.tsx";
import { getOrders } from "../../Services/getOrders.tsx";
import { useState, useEffect } from "react";

export function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("ERROR DE GET ORDERS", error);
      });
  }, []);

  const kitchenOrders = orders;
  // kitchenOrders.map((i) =>
  //   i.products.forEach((element) => console.log(element.product.name))
  // );

  return (
    <section className="flex flex-col justify-evenly items-start bg-gunMetal min-h-screen min-w-fit max-w-screen">
      <Logo />

      {kitchenOrders.map((order) => (
        <div className="w-screen">
          <div className="bg-blackInput rounded-3xl  max-w-screen m-6 border-3 border-teal-200 p-4">
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-kitchenText">
                  <h3>
                    <a href="#">{order.id}</a>
                  </h3>
                  <p className="ml-4 text-yellowTimer">Time 00:00</p>
                </div>
              </div>
              {/* empieza mapeo para insertar name ?? */}
              {order.products.map((element) => (
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="mt-1 text-sm text-kitchenText">
                    {element.product.name} x{element.qty}
                  </p>
                </div>
              ))}

              {/* termina para insertar qty */}
            </div>

            <div className="flex flex-row-reverse ">
              <button
                type="button"
                className="font-medium text-black rounded-md bg-celadon p-2  "
              >
                Completado
              </button>
            </div>
          </div>
          <br />
        </div>
      ))}
    </section>
  );
}
