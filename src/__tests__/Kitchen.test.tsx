import { Kitchen } from "../Components/Kitchen/Kitchen";
import { render, waitFor} from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import fetchMock from "jest-fetch-mock";
// import * as getOrders from "../Services/getOrders";


describe("Kitchen", () => {

    beforeAll(() => {
        fetchMock.enableMocks();
      });
    
      beforeEach(() => {
        fetchMock.resetMocks();
      });



  it("Renders Kitchen component", () => {


    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );
    expect(Kitchen).toBeTruthy();
  });

  it.only("Renders the kitchen orders", async () => {
   
  const  kitchenOrders = [ 
      {
        "id": 1,
        "client": "Micaela",
        "products": [
          {
            "id": 1,
            "name": "Café americano",
            "price": 5,
            "type": "bebida",
            "image": "https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Iced-Americano.jpg"
          },
          {
            "id": 2,
            "name": "Café con leche",
            "price": 7,
            "type": "bebida",
            "image": "https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Caf%C3%A9-con-leche.jpg"
          }
        ],
        "status": "pending"
      },
    ]

    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(kitchenOrders).toBeInTheDocument();
      });
    });


// it("Has a button to mark the order as ready", () => {

//   render(
//     <MemoryRouter>
//       <Kitchen />
//     </MemoryRouter>
//   );

//   const button = screen.getByText("Completado");
//   expect(button).toBeInTheDocument();
// });
});
