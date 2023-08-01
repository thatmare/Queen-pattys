import { Delivers } from "../Components/Delivers/Delivers";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

const navigateMock = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => navigateMock,
}));

const mockOrders = [
  {
    id: 1,
    client: "John Doe",
    status: "Delivering",
    dataEntry: "2023-07-31T10:00:00",
    products: [
      {
        qty: 2,
        product: {
          name: "Burger",
          price: 10,
          type: "food",
          dataEntry: "2023-07-31T10:00:00",
        },
      },
      {
        qty: 1,
        product: {
          name: "Coffee",
          price: 5,
          type: "drink",
          dataEntry: "2023-07-31T10:00:00",
        },
      },
    ],
  },
];

jest.mock("../Services/orders.tsx", () => ({
  getOrders: () => Promise.resolve(mockOrders),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  // Mock getOrders API call
  fetchMock.mockIf(
    "https://burger-queen-api-mock-production-9d92.up.railway.app/orders",
    JSON.stringify(mockOrders)
  );
});

describe("Delivers", () => {
  it("Renders the orders ready but pending to deliver", () => {
    expect(Delivers).toBeTruthy();
  });

  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Delivers />
      </MemoryRouter>
    );

    expect(screen.getByTestId("delivers-component")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Orden ID: 1")).toBeInTheDocument();
    });
  });
});

describe("handleLogout", () => {
  it("Removes the token when clicking in the logout button", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("role", "admin");
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Delivers />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByTestId("delivers-logout-btn");
    user.click(logoutBtn);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("role")).toBeNull();
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(navigateMock).toBeCalledTimes(1);
    });
  });
});
