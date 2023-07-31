
// import { Kitchen } from "../Components/Kitchen/kitchen";
// import { render } from "@testing-library/react";
 import { MemoryRouter} from "react-router-dom";
// //import userEvent from "@testing-library/user-event";
// import { screen } from "@testing-library/dom";
// import fetchMock from "jest-fetch-mock";

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For custom matchers like toBeInTheDocument
import fetchMock from 'jest-fetch-mock'; // For mocking fetch API calls
import { Kitchen } from '../Components/Kitchen/kitchen'; // Update the path according to your file structure// Update the path according to your file structure


const mockOrders = [
  {
    id: 1,
    client: 'John Doe',
    status: 'pending',
    dataEntry: '2023-07-31T10:00:00',
    products: [
      {
        qty: 2,
        product: {
          name: 'Burger',
          price: 10,
          type: 'food',
          dataEntry: '2023-07-31T10:00:00',
        },
      },
      {
        qty: 1,
        product: {
          name: 'Coffee',
          price: 5,
          type: 'drink',
          dataEntry: '2023-07-31T10:00:00',
        },
      },
    ],
  },
  // Add more orders as needed for testing
];

jest.mock('../Services/orders.tsx', () => ({
  getOrders: () => Promise.resolve(mockOrders),
}));


beforeEach(() => {
  fetchMock.resetMocks();
  // Mock getOrders API call
  fetchMock.mockIf('https://burger-queen-api-mock-production-9d92.up.railway.app/orders', JSON.stringify(mockOrders));
});

describe('Kitchen', () => {
  it('renders correctly', async () => {
    render(
      <MemoryRouter>
    <Kitchen />
    </MemoryRouter>
    );

    // Assert that the component renders without errors
    expect(screen.getByTestId('kitchen-component')).toBeInTheDocument();

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
});
