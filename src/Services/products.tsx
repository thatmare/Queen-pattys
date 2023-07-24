
function fetchProducts () {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:8080/products', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching products:', error)
    })
}

function postProducts(name: string, price: number, type: string) {
    if(!name || !price || !type){ 
        return console.error('Error: missing data');
    }
    const token = localStorage.getItem('token');
    return fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name,
            price: price,
            type: type,
        })
    })
    .then(response =>{
        return response.json()
    })
    .then(data => {
        console.log(data, 'AQUI NUEVO PRODUCTO!!')
    })
    .catch(error =>{
        console.error('Error sending product:', error);
    });
}


function deleteProduct(id: number){
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
        headers: {
            'contentType': 'application/json',
            'authorization': `Bearer ${token}`
        }
})
.then(response =>{
    return response.json()
})
.catch(error =>{
    console.error('Error deleting product:', error);
});
}

function patchProducts(id: number, name: string, price: number, type: string) {
    if(!name || !price || !type){ 
        return console.error('Error: missing data');
    }
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:8080/products/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name, 
            price: price,
            type: type,
        })
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.error('Error updating product:', error);
    });
}

export { fetchProducts, postProducts, deleteProduct, patchProducts };