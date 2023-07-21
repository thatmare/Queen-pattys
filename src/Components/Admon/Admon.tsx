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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const notify = () => toast("Wow so easy !");


  function handleUsers() {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEUSERS", error);
      });
  }

  function handleDelete(userID: number): Promise<boolean> {
    return deleteUsers(userID)
      .then(() => {
        handleUsers();
        console.log(true)
        return true;
      })
      .catch((error) => {
        console.error("ERROR DE HANDLEDELETE", error);
        return false;
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
          notify={notify}
        ></UsersTable>
        <ToastContainer
        theme="dark"/>
      </section>
    </>
  );
}


 

       

      

