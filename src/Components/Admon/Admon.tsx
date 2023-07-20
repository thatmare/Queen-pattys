import { Logo } from "../Login/Login.components.tsx";
import { UsersTable } from "./Users.components";
import { AdmonNavbar } from "../Navbar/AdmonNavbar.tsx";
import { useNavigate } from "react-router";
import {
  getUsers,
  postUser,
  deleteUsers,
  patchUsers,
} from "../../Services/users.tsx";
import { useState, useEffect } from "react";
import { ProductsTable } from "./Products.components.tsx";
import { fetchProducts } from "../../Services/getProducts";

export function Admon() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };
  const [errorAdd, setErrorAdd] = useState('')
  console.log(users, "aqui users admon.tsx");
  function handleUsers() {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEUSERS", error);
      });
  }

  function handleDelete(userID: number) {
    deleteUsers(userID)
      .then(() => {
        handleUsers();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEDELETE", error);
      });
  }

  function handleEdit(
    userID: number,
    email: string,
    password: string,
    role: string
  ) {
    patchUsers(userID, email, password, role)
      .then(() => {
        handleUsers();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEEDIT", error);
      });
  }

  function handleAddUser(email: string, password: string, role: string) {

    postUser(email, password, role)
    .then((data) => {
      console.log(data, 'aqui data') // en data está el mensaje de error como string
      if(data === 'Email and password are required') {
        setErrorAdd('Correo y contraseña son requeridos.')
      } else if (data === 'Password is too short') {
        setErrorAdd('La contraseña es muy corta.')
      } else if (data === 'Email already exists') {
        setErrorAdd('El correo ya está en uso.')
      } else {
        setErrorAdd('');
        handleUsers();
      }
    })
      .catch((error) => {
        console.error("AQUI ERROR DE HANDLEADD", error);
      });
  }

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <>
      <AdmonNavbar handleLogout={handleLogout} />
      <section className="flex flex-col bg-gunMetal min-h-screen min-w-fit">
        <div className="mt-10">
          <Logo />
        </div>
        <UsersTable
          UsersItems={users}
          handleDelete={handleDelete}
          handleEditUser={handleEdit}
          handleAddUser={handleAddUser}
          error={errorAdd}
        ></UsersTable>
      </section>
    </>
  );
}

export function AdmonProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };

  function handleProducts() {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEUSERS", error);
      });
  }

  function handleDelete(userID: number) {
    deleteUsers(userID)
      .then(() => {
        // handleUsers();
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEDELETE", error);
      });
  }

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <>
      <AdmonNavbar handleLogout={handleLogout} />
      <section className="flex flex-col bg-gunMetal min-h-screen min-w-fit">
        <div className="mt-10">
          <Logo />
        </div>

        <ProductsTable
          handleDelete={handleDelete}
          ProductsItems={products}
        ></ProductsTable>
      </section>
    </>
  );
}
