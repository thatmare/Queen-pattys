import { MenuBtn, FoodItems, Client, OrderSum } from "./Order.components"


function Breakfast() {
    const desayunoItems = ["Desayuno"]
    const almuerzoCenaItems = ["Almuerzo y cena"]
    const menuItems = [
        { name: 'Café americano', price: 5000},
        { name: 'Café con leche', price: 7450},
        { name: 'Sándwich de jamón y queso', price: 1000},
        { name: 'Jugo de frutas natural', price: 5000}
    ]

    return (
        <section className=" bg-gunMetal min-h-screen min-w-fit flex flex-col justify-center items-center">
            {/* <Logo></Logo> */}
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