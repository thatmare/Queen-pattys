const token = localStorage.getItem('token');
     
export function postOrders(order: object) {
    return fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.error('Error sending order:', error);
    });
}
