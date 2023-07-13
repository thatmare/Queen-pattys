const token = localStorage.getItem('token');
     
export function patchOrders(id: number) {
    return fetch(`http://localhost:8080/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            status: 'Delivering',
            dataProcessed: new Date()
        })
    })
    .then(response =>{
        return response.json()
    })
    .then(data => 
        console.log(data, 'AQUI PEDIDO CON DELIVERING!!!! '))
    .catch(error =>{
        console.error('Error sending order:', error);
    });
}