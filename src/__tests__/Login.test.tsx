import { Login } from "../Components/Login/Login.tsx";
import { render, fireEvent, screen, waitFor  } from "@testing-library/react";
// import userEvent  from "@testing-library/user-event";
import { it, expect, describe } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { loginAPI } from "../Services/auth";
// import fetchMock from "jest-fetch-mock";

jest.mock("../Services/auth.tsx", () => ({
  loginAPI: jest.fn()
}));
const logingAPIMock = loginAPI as jest.MockedFunction<typeof loginAPI>;

describe("Login", () => {
  // beforeAll(() => {
  //   fetchMock.enableMocks();
  // });

  // beforeEach(() => {
  //   fetchMock.resetMocks();
  // });

  it("Renders Login component", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(Login).toBeTruthy();
  });

  it.only("User login with incorrect credentials", async () => {
    logingAPIMock.mockRejectedValue(Error ("Error al iniciar sesión. Por favor, verifica tus credenciales"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Usuaria/o");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByText("Ingresa");

    fireEvent.change(usernameInput, { target: { value: "incorrectUser" } });
    fireEvent.change(passwordInput, { target: { value: "incorrectPassword" } });
    fireEvent.submit(submitButton);
    //user evento
    //wait for
    
    await waitFor(() => {
      // expect(logingAPIMock).rejects.toThrow("Invalid aguacate");
      expect(screen.getByText("Error al iniciar sesión. Por favor, verifica tus credenciales")).toBeInTheDocument();
    })

    
    // screen.debug()
  });

  it("The user login with the correct credentials", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText("Usuaria/o");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByText("Ingresa");

    fireEvent.change(usernameInput, { target: { value: "usuario" } });
    fireEvent.change(passwordInput, { target: { value: "contraseña" } });
    fireEvent.submit(submitButton);

    expect(loginAPI).toHaveBeenCalled();
  });
});