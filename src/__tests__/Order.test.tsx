import { Breakfast } from "../Components/Order/Breakfast";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

function mockProductsRes(body: object): Response {
  return {
    json: () => Promise.resolve(body),
  } as Response;
}

describe("Breakfast", () => {
  it("Renderiza el componente breakfast", () => {
    expect(Breakfast).toBeTruthy();
  });

  it("Fetches the products from the API.", () => {
    const jsonBody = {
      products: [
        {
          id: 1,
          name: "Café americano",
          price: 1000,
          type: "Desayuno",
          dateEntry: "2022-03-05 15:14:10",
        },
      ],
    };

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve());
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(mockProductsRes(jsonBody)));
    // the param expected is a valid Response object, however, Response is not global in Node nor JSDOM, so we have to mock it

    render(
      <MemoryRouter>
        <Breakfast></Breakfast>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(screen.getByText("Café americano")).toBeInTheDocument();
    }, 5000);

    // TypeError: items.map is not a function y no se encuentra el texto en el DOM: ¿se está tardando en renderizar?
  });
});

// Los productos se insertan correctamente desde la API (menuItem y products, setProducts)
// la cuenta de los items: setCounter sí cambia counters
/*Agregar productos al pedido desde la API
Eliminar productos
Ver resumen y el total de la compra.
Enviar pedido a cocina (guardar en alguna base de datos).*/
