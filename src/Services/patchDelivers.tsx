export function patchDelivers(id: number) {
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:8080/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            status: 'Delivered',
            dataProcessed: new Date()
        })
    })
    .then(response =>{
        return response.json()
    })
    .then(data => 
        console.log(data, 'AQUI PEDIDO CON DELIVERED!!!! '))
    .catch(error =>{
        console.error('Error sending order:', error);
    });
}