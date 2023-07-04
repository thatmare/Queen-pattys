// import { Navigate, Outlet } from "react-router-dom";

let token = '';

export function loginAPI (options: object, setError:(error:string)=> void) {

    fetch('http://localhost:8080/login', options)
        .then(response => {
        if (!response.ok) {
            throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
            return response.json();
        })
        .then(data => {
            token = data.accessToken;
            console.log(token)
            console.log('exito')
            // Aquí puedes realizar acciones adicionales con el token
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales')
            throw error;
        });
}



// export function PrivateRoute () {
//     const token = getToken(); // Obtiene el token utilizando la función getToken
  
//     return token ? (
//       <Outlet/>
//     ) : (
//       <Navigate to="/"/>
//     );
//   }



// const data = {
//     "email": "grace.hopper@systers.xyz", // input email
//     "password": "123456" // input password
// };

// const options = {
//     method: 'POST',
//     headers: {
//         'content-type': 'application/json',
//     },
//     body:JSON.stringify(data)
// };

// let token = '';

// fetch('http://localhost:8080/login', options)
//     .then(response => {
//     if (!response.ok) {
//         throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
//         }
//         return response.json();
//     })
//     .then(data => {
//         token = data.accessToken;
//         console.log(token)
//         return token;
        
//         // Aquí puedes realizar acciones adicionales con el token
//     })
//     .catch(error => {
//         console.error('Error al iniciar sesión:', error);
//         throw error;
//     });


          
    
    
// const auth = {
//     method: 'GET',
//     headers: {
//         'content-type': 'application/json',
//         'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4ODM5MjMyNiwiZXhwIjoxNjg4Mzk1OTI2LCJzdWIiOiIyIn0.oC-itg3RtksS5UFKsZuUS8Fhi3OLhWCgWo469fCsouA',

//     },
// };

        //   fetch("http://localhost:8080/users", auth)
        // .then((res) => console.log('AQUIIIIIIIIIII RES', res))
        // .catch((err) => console.log('AQUIII ERROR', err));

// Recuperar elementos del DOM
// Al insertar info, validar si es correcta o incorrecta
// si es correcta, almacenar en token
// pasar el token headers de authorization
// arrojar consola si se hizo login 

// si email o password no se proveen o ninguno de los dos
// arrojar error
// pintar en la vista el mensaje de credenciales no válidas

// si alguno es incorrecto
// arrojar error
// pintar en la vista el mensaje de credenciales no válidas
