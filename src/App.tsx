import { Route, Link, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Login";
import { Yay } from "../Yay.tsx"
import { ProtectedRoutes } from "./Components/protectedRoutes.tsx";
// import { token } from "./hooks/useFetch.tsx";

let token = '';

export function loginAPI (options: object, setError:(error:string)=> void) {
    fetch('http://localhost:8080/login', options)
    .then(response => {
    if (!response.ok) {
        throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
        return response.json();
    })
    .then(data => {
        token = data.accessToken;
        console.log(token)
        console.log('exito')
        return token;
        
        // Aquí puedes realizar acciones adicionales con el token
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales')
        throw error;
    });
}

export const App = () => {
    const [token, setToken] = useState('');
  
    const handleLogin = (token) => {
      setToken(token);
    };
  
    return (
      <BrowserRouter>
        <header>
          <Link to="/home">Home</Link>
          <Link to="/order">Menu</Link>
        </header>
        <Routes>
          <Route path="/home" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/order"
            element={
              <ProtectedRoutes token={token}>
                <Yay />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  };