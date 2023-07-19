import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useRef } from "react";

interface Users {
  UsersItems: UserItem[];
}

interface UserItem {
  id: number;
  email: string;
  password: string;
  role: string;
}

function UsersTable({
  UsersItems,
  handleDelete,
}: {
  UsersItems: Users["UsersItems"];
  handleDelete: (id: number) => void;
}) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedUserEdit, setSelectedUserEdit] = useState<number | null>(null);
  console.log(selectedUser);

  
  return (
    <div className="mx-auto pt-12 ">
      <div className="rounded-xl overflow-hidden outline-4 outline outline-kitchenText ">
      <table className=" bg-blackInput   table-fixed">
        <thead >
          <tr className="border-b border-kitchenText md:h-16 md:text-xl">
            <th className="md:w-16">ID</th>
            <th className="md:w-24">Rol</th>
            <th className="md:w-72">Correo</th>
            <th className="md:w-20"></th>
            <th className="md:w-20"></th>
          </tr>
        </thead>
        <tbody>
          {UsersItems.map((u) => ( 
            <tr key={u.id} className="border-b border-kitchenText md:h-16 md:text-xl text-center">
              <td >{u.id}</td>
              <td >{u.role}</td>
              <td >{u.email}</td>
              <td onClick={()=> setSelectedUserEdit(u.id)} className="text-yellowTimer font-medium hover:cursor-pointer">Editar</td>
              <td onClick={() => setSelectedUser(u.id)} className="text-errorRed font-medium hover:cursor-pointer">Borrar</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <>
        {selectedUser !== null && (
          <ModalUsers
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
            onCompleted={handleDelete}
          ></ModalUsers>
        )}
        {selectedUserEdit !== null && (
        <EditUserModal
        selectedUserEdit={selectedUserEdit}
          onClose={() => setSelectedUserEdit(null)}
          // onSave={handleEditUser}
        />
      )}
      </>
    </div>
  );
}

function ModalUsers({
  selectedUser,
  onClose,
  onCompleted,
}: {
  selectedUser: number;
  onClose: () => void;
  onCompleted: (selectedUser: number) => void;
}) {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open && selectedUser !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gunMetal text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gunMetal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-kitchenText"
                      >
                        Confirmación
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-white">
                          ¿Estas segurx que deseas eliminar este usuarix?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gunMetal px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-greenConfirm px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      onCompleted(selectedUser);
                      onClose();
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto mr-6"
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function EditUserModal({
  selectedUserEdit,
  onClose,
  onSave,
}: {
  selectedUser: number;
  onClose: () => void;
  onSave: (selectedUserEdit: number) => void;
}){
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  return(
    <Transition.Root show={open && selectedUserEdit !== null} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gunMetal text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gunMetal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-base font-semibold leading-6 text-kitchenText mt-2"
                      >
                        Usuarix ID {selectedUserEdit}
                      </Dialog.Title>
                      <div className="mt-2">
                        <form className="p-6 pt-6">
                          <label className="text-sm text-white">Correo</label>
                          <input
                            type="email"
                            placeholder={selectedUserEdit.email}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5 text-sm text-black"
                          />
                          <label className="text-sm text-white">Contraseña</label>
                          <input 
                            type="password"
                            placeholder={selectedUserEdit.password}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5 text-sm text-black"
                            /> 
                            <label className="text-sm text-white">Rol</label>
                          <input 
                            type="text"
                            placeholder={selectedUserEdit.role}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5 text-sm text-black"
                            /> 
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gunMetal px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mb-4 mr-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-greenConfirm px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      onSave(selectedUserEdit);
                      onClose();
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto mr-6 "
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export { UsersTable };
