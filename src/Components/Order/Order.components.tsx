import { postOrders } from "../../Services/postOrders.tsx";
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

  interface ClientProps {
    setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
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
    // console.log(items, 'Aqui items')
    return (
      <>
        {items.map((item) => (
          <ul className="bg-blackBtn rounded-3xl w-84 h-32 flex flex-col justify-evenly items-start m-3 p-6 border-2 border-pink-400 text-xl" key={item.name}>
            <li className="font-medium text-xl">
              {item.name} {/* Nombre del platillo */}
            </li>
            <div className="flex justify-between w-full">
              <li className="font-light">
                S./{item.price} {/* Precio del platillo */}
              </li>
              
                <div className="flex justify-between w-1/4 font-medium text-xl">
                  <button onClick={() => handleDecrement(item.name)}>-</button>
                  
                  <span>{counters[item.name] || 0}</span>
                  
                  <button onClick={() => handleIncrement(item.name)}>+</button>
                </div>
            </div>

          </ul>
        ))}
      </>
    );
    
  }
  
  function Client({ setSelectedClient  }: ClientProps) { // esta info debe de enviarse POST con key "client" 

    const handleClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedClient(event.target.value)
    }

    return(
      <select name="mesas" id="mesas" onChange={handleClient} className="bg-blackBtn border-2 border-cyan-300 rounded-2xl text-xl m-4">
        <option value="NO CLIENT">Selecciona una mesa</option>
        <option value="mesa1">Mesa 1</option>
        <option value="mesa2">Mesa 2</option>
      </select>
    )
  }
  
function OrderSum({ counters, menuItems, selectedClient }: { counters: { [key: string]: number }; menuItems: MenuItem[]; selectedClient: string }) {
  const filteredItems = Object.entries(counters).filter(([_, count]) => count > 0);
 
  let totalPriceSum = 0;

  const handleOrder = () => {
  const order = {
    client: selectedClient, // recuperar de seleccion de mesa
    id: '',
    products: filteredItems.map( ([itemName, qty]) => 
    {
      const menuItem= menuItems.find((item) => item.name === itemName);
      return {
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
      <li className="text-center font-medium mt-3">RESUMEN</li>

      {filteredItems.map(([itemName, count]) => {
        const item = menuItems.find((menuItem) => menuItem.name === itemName);
        const totalPrice = item ? item.price * count : 0;
        totalPriceSum += totalPrice;
         
        return (
            <li key={itemName} className="font-normal text-left m-3 grid grid-cols-[4fr,1fr]">
              {itemName}
              <span className="font-light text-right">x{count}</span>
              <span className="font-normal">${totalPrice.toFixed(2)}</span>
              <br />
              <br />
            </li>  
          );
        })}
        
        <p className="text-left m-3">TOTAL <br /> ${totalPriceSum.toFixed(2)}</p>
        <button className="bg-celadon text-gunMetal mx-auto block w-fit rounded-md px-3 py-1.5 font-semibold shadow-sm sm:leading-7 my-6" type= 'button' onClick={handleOrder}>Enviar a cocina</button>
      </ol>
    );
  }

export { MenuBtn, FoodItems, Client, OrderSum }


                      