import { Login } from "../Components/Login/Login.tsx";
import { render, fireEvent, screen } from "@testing-library/react";
import { it, expect, describe } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { loginAPI } from "../Services/auth.tsx";
import fetchMock from "jest-fetch-mock";

// jest.mock("../Services/auth.tsx", () => ({
//   loginAPI: jest
//     .fn()
//     .mockResolvedValue({ accessToken: "validToken" })
//     .mockRejectedValueOnce(new Error("Invalid aguacate"))
//     .mockResolvedValueOnce(false),
// }));
jest.mock("../Services/auth.tsx", () => ({
  loginAPI: jest.fn()
}));

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

  // it("User login with incorrect credentials", async () => {
  //   const errorMessage = "Invalid Aguacate";

  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   const usernameInput = screen.getByLabelText("Usuaria/o");
  //   const passwordInput = screen.getByLabelText("Contraseña");
  //   const submitButton = screen.getByText("Ingresa");

  //   fireEvent.change(usernameInput, { target: { value: "incorrectUser" } });
  //   fireEvent.change(passwordInput, { target: { value: "incorrectPassword" } });
  //   fireEvent.submit(submitButton);

  //   await expect(loginAPI).rejects.toThrowError(errorMessage);
    
  // });

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
