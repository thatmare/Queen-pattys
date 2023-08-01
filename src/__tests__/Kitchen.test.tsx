import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // For custom matchers like toBeInTheDocument
import fetchMock from "jest-fetch-mock"; // For mocking fetch API calls
import { Kitchen } from "../Components/Kitchen/kitchen";
import 'resize-observer-polyfill';
import userEvent from "@testing-library/user-event";
 // Update the path according to your file structure// Update the path according to your file structure

const mockOrders = [
  {
    id: 1,
    client: "John Doe",
    status: "pending",
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
  {
    id: 2,
    client: "Melissa Doe",
    status: "delivered",
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
  // Add more orders as needed for testing
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

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Kitchen", () => {
  it("renders correctly", async () => {
    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );

    // Assert that the component renders without errors
    expect(screen.getByTestId("kitchen-component")).toBeInTheDocument();

    // Mock the getOrders API call and wait for the component to fetch orders
    await waitFor(() => {
      // Assert that the orders are displayed on the screen
      expect(screen.getByText("Orden ID: 1")).toBeInTheDocument();
    });
  });

  it('displays the modal when "Completado" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );

    // Mock the getOrders API call and wait for the component to fetch orders
    await waitFor(() => {
      // Find the "Completado" button and click it
      const completadoButton = screen.getByText("Completado");
      fireEvent.click(completadoButton);
    });
    // Assert that the modal is displayed on the screen
    expect(screen.getByText("Confirmación")).toBeInTheDocument();
  });

  it('Cambia el estado de la orden a "Delivering" cuando se hace click en el botón "Completado"', async () => {
    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );
  
    // Wait for the "Completado" button to be available
    const completadoButton = await waitFor(() => screen.getByText("Completado"));
  
    // Mock the function that handles the click event for "Completado" button
    completadoButton.onclick = () => {
      // Wait for the "Confirmar" button to be available
      waitFor(() => {
        const confirmarButton = screen.getByText("Confirmar");
        confirmarButton.onclick = () => {
     
        // In this case, we are setting the status of the first order to "Delivering"
        mockOrders[0].status = "Delivering";
        };
        fireEvent.click(confirmarButton);
      });
    };
  
    // Click the "Completado" button (This will trigger the mocked onclick function)
    await waitFor(async () => {
      fireEvent.click(completadoButton);
     
      // Add a delay to give the modal enough time to appear (adjust this if needed)
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    await waitFor(() => {
      expect(screen.queryByText("Orden ID: 1")).not.toBeInTheDocument();
      
    });
  });
});

const navigateMock = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => navigateMock,
}));
describe("handleLogout", () => {
  it("Removes the token when clicking in the logout button", async () => {
    localStorage.setItem("token", "test-token");
    localStorage.setItem("role", "admin");
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Kitchen />
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

