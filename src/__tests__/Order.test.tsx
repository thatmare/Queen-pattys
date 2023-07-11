import { Breakfast } from "../Components/Order/Breakfast";


describe("Breakfast", () => {

    it('Renderiza el componente breakfast', () => {
        expect(Breakfast).toBeTruthy();
    })
});

 
// Los productos se insertan correctamente desde la API (menuItem y products, setProducts)
// la cuenta de los items: setCounter sí cambia counters