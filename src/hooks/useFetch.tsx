
const data = {
    "email": "grace.hopper@systers.xyz",
    "password": "123456"
};

const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body:JSON.stringify(data)
};

// let token = '';

//  fetch('http://localhost:8080/login', options)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
//             }
//             return response.json();
//           })
//           .then(data => {
//             token = data.accessToken;
//             console.log(token)
//             return token;
        
//             // Aquí puedes realizar acciones adicionales con el token
//           })
//           .catch(error => {
//             console.error('Error al iniciar sesión:', error);
//             throw error;
//           });


          
      const auth = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4ODE0NTI2MywiZXhwIjoxNjg4MTQ4ODYzLCJzdWIiOiIyIn0.sfF4kHFxKmIPOT1wJ0N6U_g8oxQ-ABYukumlxxpeFYo',

        },
    };


      fetch("http://localhost:8080/users", auth)
    .then((res) => console.log('AQUIIIIIIIIIII RES', res))
    .then((data) => console.log('AQUIIIIIIIIIII DATA', data))
    .catch((err) => console.log('AQUIII ERROR', err));


      