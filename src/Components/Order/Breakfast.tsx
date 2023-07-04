import { MenuBtn, FoodItems, Client, OrderSum } from "./Order.components"
import { useEffect, useState } from 'react'
import { Logo } from '../Login/Login.components'


function Breakfast() {
   
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            
            const response = await fetch('http://localhost:8080/products', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            const data = await response.json();
            console.log(data,'Aqui los productos');
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };

        fetchProducts();
    }, []);

    const desayunoItems = ["Desayuno"]
    const almuerzoCenaItems = ["Almuerzo y cena"]
    const menuItems = products;

    return (
        <section className=" bg-gunMetal min-h-screen min-w-fit flex flex-col justify-center items-center">
            <Logo></Logo>
            <div className="flex justify-center items-center w-4/6 md:w-4/5 lg:w-3/5">
                <MenuBtn meals={desayunoItems}></MenuBtn>
                <MenuBtn meals={almuerzoCenaItems}></MenuBtn>
            </div>
            <div className="grid grid-cols-[60%,40%] md:w-4/5 lg:w-3/5">
                <div>
                    <FoodItems items={menuItems}></FoodItems>
                </div>
                <div className="grid grid-rows-[0.2fr,1fr]">
                    <Client></Client>
                    <OrderSum></OrderSum>
                </div>  
            </div>
        </section>
    )
}
// Uso del componente
// function App() {
//     const desayunoItems = ["Desayuno"];
//     const almuerzoCenaItems = ["Almuerzo", "Cena"];
  
//     return (
//       <div>
//         <MenuBtn items={desayunoItems} />
//         <MenuBtn items={almuerzoCenaItems} />
//       </div>
//     );
//   }

export { Breakfast };