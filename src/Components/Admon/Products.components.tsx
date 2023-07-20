// import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Products {
  ProductsItems: ProductsItem[];
}

interface ProductsItem {
  id: number;
  name: string;
  price: number;
  type: string;
}

function ProductsTable({
ProductsItems,
  handleDelete,
}: {
    ProductsItems: Products["ProductsItems"];
  handleDelete: (id: number) => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedProductEdit, setSelectedProductEdit] = useState<number | null>(null);
  console.log(selectedProduct);

  
  return (
    <div className="mx-auto pt-12 ">
      <div className="rounded-xl overflow-hidden outline-4 outline outline-kitchenText ">
      <table className=" bg-blackInput  table-fixed">
        <thead >
          <tr className="border-b border-kitchenText md:h-16 md:text-xl">
            <th className="md:w-16">ID</th>
            <th className="md:w-52">Nombre</th>
            <th className="md:w-24">Precio</th>
            <th className="md:w-20">Tipo</th>
            <th className="md:w-20"></th>
            <th className="md:w-20"></th>
          </tr>
        </thead>
        <tbody>
          {ProductsItems.map((u) => ( 
            <tr key={u.id} className="border-b border-kitchenText md:h-16 md:text-xl text-center">
              <td >{u.id}</td>
              <td >{u.name}</td>
              <td >{u.price}</td>
              <td >{u.type}</td>
              <td onClick={()=> setSelectedProductEdit(u.id)} className="text-yellowTimer font-medium hover:cursor-pointer">Editar</td>
              <td onClick={() => setSelectedProduct(u.id)} className="text-errorRed font-medium hover:cursor-pointer">Borrar</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* <>
        {selectedUser !== null && (
          <ModalUsers
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
            onCompleted={handleDelete}
          ></ModalUsers>
        )}
        {selectedProductEdit !== null && (
        <EditUserModal
        selectedProductEdit={selectedProductEdit}
          onClose={() => setSelectedProductEdit(null)}
          // onSave={handleEditUser}
        />
      )}
      </> */}
    </div>
  );
}

export { ProductsTable };

