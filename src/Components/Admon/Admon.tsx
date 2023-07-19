import { Logo } from "../Login/Login.components.tsx";
import { UsersTable } from "./Users.components";
import { AdmonNavbar } from "../Navbar/AdmonNavbar.tsx";
import { useNavigate } from "react-router";
import { getUsers, deleteUsers } from "../../Services/getUsers";
import { useState, useEffect } from "react";

export function Admon() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  };

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <>
      <AdmonNavbar handleLogout={handleLogout} />
      <section className="flex flex-col bg-gunMetal min-h-screen min-w-fit">
        <Logo />
        <UsersTable UsersItems={users} handleDelete={handleDelete}></UsersTable>
      </section>
    </>
  );
}
