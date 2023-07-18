export function getUsers () {
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

// getUsers()