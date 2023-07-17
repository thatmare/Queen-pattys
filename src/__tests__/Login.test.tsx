import { Login } from "../Components/Login/Login.tsx";
import { render, fireEvent, screen, waitFor  } from "@testing-library/react";
import { it, expect, describe } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import * as auth from "../Services/auth";
import fetchMock from "jest-fetch-mock";

// jest.mock("../Services/auth", () => ({
//   loginAPI: jest.fn(),
// }));

describe("Login", () => {

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Renders Login component", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(Login).toBeTruthy();
  });

  it("The user login with the correct credentials", async () => {
   
    const loginAPISpy = jest.spyOn(auth, 'loginAPI');
    
    
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


    await waitFor(() => {
      expect(loginAPISpy).toHaveBeenCalled();
    });
  });

  it("User login with incorrect credentials", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject('Error grave'))

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
    
    await waitFor(() => {
      expect(screen.getByText("Error al iniciar sesión. Por favor, verifica tus credenciales")).toBeInTheDocument();
    })
  });
});
