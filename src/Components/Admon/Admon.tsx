import { Logo } from "../Login/Login.components.tsx";
import { UsersTable } from "./Users.components";
import { AdmonNavbar } from "../Navbar/AdmonNavbar.tsx";
import { useNavigate } from "react-router";
import { getUsers, deleteUsers, patchUsers } from "../../Services/users.tsx";
import { useState, useEffect } from "react";

export function Admon() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };

  console.log(users, 'aqui users admon.tsx')
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

  function handleEdit(userID: number, email: string, password: string, role: string) {
    patchUsers(userID, email, password, role)
      .then(() => {
        handleUsers();
      })
      .catch((error) => {
        console.error('ERROR DE HANDLEEDIT', error)
      })
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
        <UsersTable UsersItems={users} handleDelete={handleDelete} handleEditUser={handleEdit}></UsersTable>
      </section>
    </>
  );
}
