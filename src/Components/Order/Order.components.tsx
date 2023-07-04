interface MenuBtnProps {
    meals: string[]
} //ts: se recibira un array con elementos string
  
function MenuBtn({ meals }: MenuBtnProps) {
    return (
      <ul className="bg-blackBtn rounded-3xl w-full h-20 flex justify-evenly items-center m-3 border-2 border-amber-200">
        {meals.map(menu => ( // se mapea sobre el array
          <>
            {menu === 'Desayuno' && <img className="w-16" src="src\assets\breakfast.png"></img>}
            {menu === 'Almuerzo y cena' && <img className="w-16" src="src\assets\lunch.png"></img>}
            <li className="text-xl" key={menu}>{menu}</li>
          </>
        ))}
      </ul>
    )
  }
  
  interface MenuItem {
    name: string;
    price: number;
  }
  
  
  interface MenuItems {
    items: MenuItem[];
  }
  
  function FoodItems({ items }: MenuItems) {
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
  
  function OrderSum() { // se inserta la seleccion de fooditems
    return (
      <ol className="bg-blackBtn border-2 border-cyan-300 rounded-2xl text-xl m-4">
        <li className="text-center font-medium">RESUMEN</li>
        <li>Ejemplo de producto</li>
        <span>x</span>
        <span>$0.00</span>
        <li>Ejemplo de producto</li>
        <span>x</span>
        <span>$0.00</span>
        <p>TOTAL<span>$0.00</span></p>
        <button className="bg-celadon text-gunMetal">ENVIAR A COCINA</button>
      </ol>
    )
  }

export { MenuBtn, FoodItems, Client, OrderSum }