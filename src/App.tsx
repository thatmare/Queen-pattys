import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login.tsx";
import { Yay } from "../Yay.tsx"
import { Order } from "./Components/Order/Order.tsx";


export function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/order" element={<Order/>}></Route>
        <Route path="/yay" element={<Yay/>}></Route>
      </Routes>
    </BrowserRouter>    
  )
}