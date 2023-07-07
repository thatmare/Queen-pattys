import { useState } from "react";
import { postOrders } from "../../Services/postOrders";
interface MenuBtnProps {
    meals: string[]
} //ts: se recibira un array con elementos string
  
function MenuBtn({ meals }: MenuBtnProps) {
    return (
      <>
        {meals.map(menu => ( // se mapea sobre el array
          <ul key={menu} className="bg-blackBtn rounded-3xl w-full h-20 flex justify-evenly items-center m-3 border-2 border-amber-200"> 
            {menu === 'Desayuno' && <img className="w-16" src="src\assets\breakfast.png"></img>}
            {menu === 'Almuerzo y cena' && <img className="w-16" src="src\assets\lunch.png"></img>}
            <li className="text-xl" key={menu}>{menu}</li>
          </ul>
        ))}
      </>
    )
  }
  
  interface MenuItem {
    name: string;
    price: number;
    id: number;
    type: string;
  }
  
  
  interface MenuItems {
    items: MenuItem[];
    counters: { [key: string]: number };
    setCounters: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  }
  
  function FoodItems({ items, counters, setCounters }: MenuItems) {

    // anotación de ts conocida como "index signature" i "signatura de índice", que permite definir un objeto con claves de tipo "string" y valores de tipo "number"
    //const [ counters, setCounters ] = useState<{ [key: string]: number }>({});
    // useState se inicializa con un objeto vacío para mantener un estado separado para cada item
    // en vez de usar un único estado para todos los counters, utilizamos un objeto donde cada key es el nombre del item del menú y el value es el counter correspondiente
    // cada vez que se agrega un nuevo item al menú, se crea una nueva key en el objeto 

    const handleDecrement = (itemName: string) => { 
      if(counters[itemName] > 0) {
        setCounters((prevCounters) => ({ // actualiza el estado de counters. Se utiliza una fx como argumento, que recibe el estado anterior 
          ...prevCounters, // operador de propagación para copiar todos los pares clave-valor del estado anterior en un nuevo objeto
          [itemName]: prevCounters[itemName] -1, // crea o actualiza una propiedad en el nuevo objeto utilizando el nombre del elemento como clave y resta 1 al valor del contador para el elemento específico
        }));
      }
    };

    const handleIncrement = (itemName: string) => {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [itemName]: prevCounters[itemName] ? prevCounters[itemName] + 1 : 1,
      }));
    };
    console.log(items, 'Aqui items')
    return (
      <>
        {items.map((item) => (
          <ul className="bg-blackBtn rounded-3xl w-84 h-32 flex flex-col justify-evenly items-start m-3 p-6 border-2 border-pink-400 text-xl" key={item.name}>
            <li>
              {item.name} {/* Nombre del platillo */}
            </li>
            <li className="font-light">
              S./{item.price} {/* Precio del platillo */}
            </li>
            
            <button onClick={() => handleDecrement(item.name)}>-</button>
            
            <span>{counters[item.name] || 0}</span>
            
            <button onClick={() => handleIncrement(item.name)}>+</button>
          </ul>
        ))}
      </>
    );
    
  }
  
  function Client() { // esta info debe de enviarse POST con key "client" 
    return(
      <select name="mesas" id="mesas" className="bg-blackBtn border-2 border-cyan-300 rounded-2xl text-xl m-4">
        <option value="mesa1">Mesa 1</option>
        <option value="mesa2">Mesa 2</option>
      </select>
    )
  }
  
function OrderSum({ counters, menuItems }: { counters: { [key: string]: number }; menuItems: MenuItem[] }) {
  const filteredItems = Object.entries(counters).filter(([_, count]) => count > 0);


    
  let totalPriceSum = 0;

  const handleOrder = () => {
    const order = {
      client: '', // recuperar de seleccion de mesa
      id: '',
      products: filteredItems.map( ([itemName, qty]) => 
      {
        const menuItem= menuItems.find((item) => item.name === itemName);
        return{
      qty: qty,
      product: {
        id: menuItem?.id, // obtener id de la API
        name: itemName,
        price: menuItem?.price, // obtener precio de la API
        type: menuItem?.type, // obtener de la API
        dataEntry: new Date(),
      },
      status: 'pending',
      dataEntry: new Date(),
      }
      }
    )
  }

    postOrders(order)
      .then(request => console.log(request))
      .catch(error => console.error('Los productos no pudieron enviarse',error))
    } 

  return (
    <ol className="bg-blackBtn border-2 border-cyan-300 rounded-2xl text-xl m-4 text-justify font-medium">
      <li className="text-center font-medium">RESUMEN</li>

      {filteredItems.map(([itemName, count]) => {
        const item = menuItems.find((menuItem) => menuItem.name === itemName);
        const totalPrice = item ? item.price * count : 0;
        totalPriceSum += totalPrice;
         
        return (
            <li key={itemName}>
              {itemName}
              <span className="ml-2">x{count}</span>
              <span className="ml-24">${totalPrice.toFixed(2)}</span>
            </li>
          );
        })}
        
        <p>TOTAL ${totalPriceSum.toFixed(2)}</p>
        <button className="bg-celadon text-gunMetal mx-auto block w-fit rounded-md px-3 py-1.5 font-semibold shadow-sm sm:leading-7 mt-12" type= 'button' onClick={handleOrder} >ENVIAR A COCINA</button>
      </ol>
    );
  }

export { MenuBtn, FoodItems, Client, OrderSum }


                      