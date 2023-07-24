export function getOrders() {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:8080/orders', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.error('Error fetching products:', error)
    })
}

export function postOrders(order: object) {
    const token = localStorage.getItem('token');
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

export function patchOrders(id: number) {
    const token = localStorage.getItem('token');
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