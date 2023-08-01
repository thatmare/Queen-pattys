import { Admon } from "../Components/Admon/Admon";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import fetchMock from "jest-fetch-mock";

const navigateMock = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => navigateMock,
}));

const mockUsers = [
  {
    id: 1,
    email: "anita.borg@systers.xyz",
    role: "admin",
  },
  {
    id: 2,
    email: "grace.hopper@systers.xyz",
    role: "admin",
  },
];

jest.mock("../Services/users", () => ({
  getUsers: () => Promise.resolve(mockUsers),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockIf(
    "https://burger-queen-api-mock-production-9d92.up.railway.app/users",
    JSON.stringify(mockUsers)
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Admon", () => {
  it("Renders the user management view", () => {
    expect(Admon).toBeTruthy();
  });

  it("Displays the add user modal", async () => {
    const mockPostUser = jest.fn().mockResolvedValue({
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      user: {
        email: "hola@qp.com",
        id: 7,
        role: "admin",
      },
    })

    render(
      <MemoryRouter>
        <Admon></Admon>
      </MemoryRouter>
    );

    const addBtn = screen.getByTestId("add-user-btn");
    fireEvent.click(addBtn);

    await waitFor(() => {
      const crearBtn = screen.getByText("Crear");
      expect(crearBtn).toBeInTheDocument();

      fireEvent.submit(crearBtn);

      expect(mockPostUser).toHaveBeenCalledTimes(1);
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
        <Admon />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByTestId("admon-logout-btn");
    user.click(logoutBtn);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("role")).toBeNull();
    });

    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(navigateMock).toBeCalledTimes(1);
  });
});
