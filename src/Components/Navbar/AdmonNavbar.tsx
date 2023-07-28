import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router";

export function AdmonNavbar({ handleLogout} : { handleLogout: () => void}) {
    const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-gunMetal border-b border-kitchenText">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 bg-gunMetal text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-9 h-9"
                  onClick={() => {navigate('/admon-products')}}>
                    
                  <span className="sr-only">View products</span>
                Productos</button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 bg-gunMetal text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-9 h-9"
                  onClick={() => {navigate('/admon-users')}}>
                    
                  <span className="sr-only">View products</span>
                Usuarixs</button>
              </div>

              <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className="rounded-full p-1 bg-gunMetal text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-8 h-8 mt-2"
                  type="button"
                  onClick={handleLogout}
                >
                  <span className="sr-only">Log out</span>
                  <img src="\icon _logout_.png" alt="Log out icon" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

