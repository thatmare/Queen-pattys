import { Order } from "../Components/Order/Order";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

const localStorageMock = (function () {
  const store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const navigateMock = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => navigateMock,
}))

function mockProductsRes(body: object): Response {
  return {
    json: () => Promise.resolve(body),
  } as Response;
}

describe("Order", () => {
  it("Renderiza el componente Order", () => {
    expect(Order).toBeTruthy();
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
        <Order></Order>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(screen.getByText("Café americano")).toBeInTheDocument();
    }, 5000);

    // TypeError: items.map is not a function y no se encuentra el texto en el DOM: ¿se está tardando en renderizar?
  });
});

describe("handleLogout", () => {
  it("should remove the token when clicking in the logout button", () => {
    localStorage.setItem("token", "test-token");
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByTestId("logout-btn");
    user.click(logoutBtn);

    setTimeout(() => {
      expect(localStorageMock.getItem("token")).toBeNull();
      expect(navigateMock).toHaveBeenCalledWith('/');
      expect(navigateMock).toBeCalledTimes(1);
    }, 1000);
  });
});
