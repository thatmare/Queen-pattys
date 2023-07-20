import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login.tsx";
import { Order } from "./Components/Order/Order.tsx";
import { Kitchen } from "./Components/Kitchen/Kitchen.tsx";
import { PrivateRoute } from "./Services/protectedRoutes.tsx";
import { Delivers } from "./Components/Delivers/Delivers.tsx";
import { Admon, AdmonProducts } from "./Components/Admon/Admon.tsx";


export function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/order" element={ <PrivateRoute> <Order /></PrivateRoute> } />
        <Route path='/kitchen' element={<PrivateRoute> <Kitchen /></PrivateRoute>} />
        <Route path= '/delivers' element={<PrivateRoute> <Delivers /> </PrivateRoute>} />
        <Route path= '/admon-users' element={<PrivateRoute> <Admon/> </PrivateRoute>} />
        <Route path= '/admon-products' element={<PrivateRoute> <AdmonProducts/> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>    
  )
}