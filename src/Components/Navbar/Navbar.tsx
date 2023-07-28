import { Disclosure } from "@headlessui/react";

export function Navbar({ handleLogout, handleDelivers } : { handleLogout: () => void; handleDelivers: () => void } ) {
  return (
    <Disclosure as="nav" className="bg-gunMetal border-b border-kitchenText">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full p-1 bg-gunMetal text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-7 h-7"
                  onClick={handleDelivers}
                >
                  <span className="sr-only">View notifications</span>
                  <img
                    src="src\assets\icon_notification_.png"
                    alt="Notification icon"
                  />
                </button>
              </div>
              <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className="rounded-full p-1 bg-gunMetal text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-8 h-8 mt-2"
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-btn"
                >
                  <span className="sr-only">Log out</span>
                  <img src="src\assets\icon _logout_.png" alt="Log out icon" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}