

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
