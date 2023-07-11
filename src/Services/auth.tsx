// import { Navigate} from "react-router-dom";

let token = '';

export function loginAPI (options: object, setError:(error:string) => any) {

    return fetch('http://localhost:8080/login', options)
        .then(response => {
        if (!response.ok) {
            throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
            return response.json();
        })
        .then(data => {
            token = data.accessToken;
            localStorage.setItem('token', token)
            return token
            // Aquí puedes realizar acciones adicionales con el token
        })
        .catch(error => {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales')
            throw error;
        });
}

