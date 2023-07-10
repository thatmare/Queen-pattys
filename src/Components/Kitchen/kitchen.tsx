import {Logo} from '../Login/Login.components.tsx'

export function Kitchen() {
  return (
    
    <section className="flex flex-col justify-evenly items-start bg-gunMetal min-h-screen min-w-fit max-w-screen">
      <Logo />
    <div className="w-screen" >
      <div className="bg-blackInput rounded-3xl  max-w-screen m-6 border-3 border-teal-200 p-4">
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-kitchenText">
              <h3>
                <a href="#">Order ID: 240498</a>
              </h3>
              <p className="ml-4 text-yellowTimer">Time 00:00</p>
            </div>
            <p className="mt-1 text-sm text-kitchenText">
              Sandwich de jamón y queso
            </p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-kitchenText">x 1</p>
          </div>

          <p className="mt-1 text-sm text-kitchenText">Café americano</p>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-kitchenText">x 1</p>
          </div>
        </div>
        <div className="flex flex-row-reverse ">
          <button
            type="button"
            className="font-medium text-black rounded-md bg-celadon p-2  "
          >
            Completado
          </button>
        </div>
      </div>
      <br />
      <div className="bg-blackInput rounded-3xl  max-w-screen m-6 border-3 border-teal-200 p-4">
      <div className="ml-4 flex flex-1 flex-col  ">
        <div>
          <div className="flex justify-between text-base font-medium text-kitchenText">
            <h3>
              <a href="#">Order ID: 240499</a>
            </h3>
            <p className="ml-4 text-yellowTimer">Time 00:00</p>
          </div>
          <p className="mt-1 text-sm text-kitchenText">
            Sandwich de jamón y queso
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-kitchenText">x 2</p>
        </div>

        <p className="mt-1 text-sm text-kitchenText">Agua 500ml</p>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-kitchenText">x 1</p>
        </div>
        <p className="mt-1 text-sm text-kitchenText">Café Americano</p>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-kitchenText">x 1</p>
        </div>
      </div>
      <div className="flex flex-row-reverse mr-2">
        <button
          type="button"
          className="font-medium text-black rounded-md bg-celadon p-2 "
        >
          Completado
        </button>
      </div>
      </div>
    </div>
    </section>
  );
}
