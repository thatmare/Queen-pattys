import { MenuBtn, FoodItems, Client, OrderSum } from "./Order.components.tsx"
import { useEffect, useState } from 'react'
import { Logo } from '../Login/Login.components'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from "../../Services/getProducts.tsx"



function Breakfast() {
    const [products, setProducts] = useState([]);
    const [counters, setCounters] = useState<{ [key: string]: number }>({});
    const [selectedClient, setSelectedClient] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error setting products:', error);
            });
    }, []);

    const handleLogout = (event:any) => {
        localStorage.removeItem('token');
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
    };

    const desayunoItems = ["Desayuno"]
    const almuerzoCenaItems = ["Almuerzo y cena"]
    const menuItems = products;

    return (
        <section className=" bg-gunMetal min-h-screen min-w-fit flex flex-col justify-center items-center">
            <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={handleLogout}
                >X
                <span className="sr-only">Close panel</span>        
                </button>
            <Logo></Logo>
            <div className="flex justify-center items-center w-4/5 md:w-4/5 lg:w-3/5 xl:w-2/5">
                <MenuBtn meals={desayunoItems}></MenuBtn>
                <MenuBtn meals={almuerzoCenaItems}></MenuBtn>
            </div>
            <div className="grid grid-cols-[60%,40%] md:w-4/5 lg:w-3/5 xl:w-2/5">
                <div>
                    <FoodItems items={menuItems} counters={counters} setCounters={setCounters}></FoodItems>
                </div>
                <div className="grid grid-rows-[0.2fr,1fr]">
                    <Client setSelectedClient={setSelectedClient}></Client>
                    <OrderSum counters={counters} menuItems={menuItems} selectedClient={selectedClient}></OrderSum>
                </div>  
            </div>
        </section>
    )
}

export { Breakfast };