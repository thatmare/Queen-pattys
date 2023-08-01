import { Order } from "../Components/Order/Order";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import * as orderService from "../Services/orders";

const navigateMock = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => navigateMock,
}));
const mockProducts = [
  {
    id: 1,
    name: "Café americano",
    price: 1000,
    type: "Desayuno",
    dateEntry: "2022-03-05 15:14:10",
  },
  {
    id: 2,
    name: "Malteada",
    price: 1000,
    type: "Almuerzo",
    dateEntry: "2022-03-05 15:14:10",
  },
];

jest.mock("../Services/products", () => ({
  fetchProducts: () => Promise.resolve(mockProducts),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockIf(
    "https://burger-queen-api-mock-production-9d92.up.railway.app/products",
    JSON.stringify(mockProducts)
  );
});

describe("Order", () => {
  it("Renders Order component", () => {
    expect(Order).toBeTruthy();
  });

  it("Fetches the products from the API.", async () => {
    render(
      <MemoryRouter>
        <Order></Order>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Café americano")).toBeInTheDocument();
    });
  });

  it("Increases the quantity of items when clicking the plus + button", async () => {
    render(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );

    await waitFor(() => {
      const incrementBtn = screen.getByTestId("increment-btn");
      const itemQtySpan = screen.getByTestId("item-qty-span");

      fireEvent.click(incrementBtn);

      expect(itemQtySpan.textContent).toBe("1");
    });
  });

  it("Decreases the quantity of items when clicking the - button", async () => {
    render(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );

    await waitFor(() => {
      const incrementBtn = screen.getByTestId("increment-btn");
      const decrementBtn = screen.getByTestId("decrement-btn");
      const itemQtySpan = screen.getByTestId("item-qty-span");

      fireEvent.click(incrementBtn);
      fireEvent.click(decrementBtn);

      expect(itemQtySpan.textContent).toBe("0");
    });
  });

  it("Posts the order in the API when clicking the button Enviar a cocina", () => {
    const postOrdersSpy = jest.spyOn(orderService, "postOrders");

    render(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );
    const postOrderBtn = screen.getByTestId("post-order-btn");
    fireEvent.click(postOrderBtn);

    expect(postOrdersSpy).toHaveBeenCalled();
  });
});

describe("handleLogout", () => {
  it("Removes the token when clicking in the logout button", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("role", "waiter");
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByTestId("logout-btn");
    user.click(logoutBtn);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("role")).toBeNull();
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(navigateMock).toBeCalledTimes(1);
    });
  });
});
