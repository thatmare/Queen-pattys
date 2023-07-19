function getUsers () {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:8080/users', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        return response.json();
    })
    // .then(data => {
    //     console.log(data, 'AQUI USERS!!!')
    // })
    .catch(error => {
        console.error('Error fetching products:', error)
    })
}

function deleteUsers(id: number) {
    const token = localStorage.getItem('token');
    return fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.error('Error sending order:', error);
    });
}

// deleteUsers(4)

export { getUsers, deleteUsers }