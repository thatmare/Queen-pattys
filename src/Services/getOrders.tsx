const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4ODQ5NTMxMSwiZXhwIjoxNjg4NDk4OTExLCJzdWIiOiIyIn0.aIfjIZ9s83dgj9BLYC8FrzJ0NgKDaujVbIntAPOma1M',
    },
  };

export function getProducts () {
    fetch('http://localhost:8080/products', options)
        .then(res => res.json()) // Convierte la respuesta a JSON
        .then(data => console.log('AQUI DATA', data)) // Muestra los datos en la consola
        .catch(err => console.log('AQUI ERROR', err));
}
getProducts();



/*El código que has proporcionado parece estar en JavaScript y utiliza la función fetch() para hacer una solicitud a la API. Sin embargo, la forma en que estás manejando la respuesta actualmente solo muestra el objeto Response en la consola, en lugar de mostrar los datos que contiene.

Para mostrar los datos que obtienes de la API en la consola, necesitas extraer el cuerpo de la respuesta y convertirlo a un formato legible, como JSON.

En este código, se utiliza el método .json() en la respuesta (res.json()) para extraer el cuerpo de la respuesta y convertirlo a un objeto JavaScript. Luego, se utiliza otro .then() para mostrar los datos en la consola.*/