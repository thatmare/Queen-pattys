
import {Login} from '../Components/Login/Login';
import {render} from '@testing-library/react';
import {it, expect, describe} from '@jest/globals';
import { MemoryRouter} from 'react-router-dom';


describe("Login", () => {
    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
  it("Renders Login component", () => {
    expect(Login).toBeTruthy();
  });
 it("The user login with the correct credentials", async () => {
    //simular que el usuario hizo click
//manejar el evento submit
//expect que el usuario logro logearse
const event = { preventDefault: jest.fn()}
 });
});