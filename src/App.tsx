import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login.tsx";
import { Order } from "./Components/Order/Order.tsx";
import { PrivateRoute } from "./Components/protectedRoutes.tsx";


export function App() {

  return(
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Login />} />

        <Route path="/order" element={ <PrivateRoute> <Order /></PrivateRoute> } />
      

      </Routes>
    </BrowserRouter>    
  )
}