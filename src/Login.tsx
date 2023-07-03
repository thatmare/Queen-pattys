import {
  Logo,
  InputEmail,
  InputPassword,
  ButtonSumbit,
  IconsFood,
} from "./Components/component.tsx";

import { useState } from "react";

import { loginAPI } from "./hooks/useFetch.tsx";

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // useState es un array
  // el 1er elemento sera variable, el 2do elemento es la fx de manejo de estado
  // param con que se inicializa la fx, en este caso, un string vacio
  // es convencion iniciar la fx con "set" + variable
  // const state = useState()
  // console.log(state)

  // console.log(email)
  // console.log(setEmail)

  // const state = useState()
  // console.log(state)

  const data = {
    email: email,
    password: password
  }

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    loginAPI(options, setError);
  };

  return (
    <section className="flex bg-gunMetal min-h-screen min-w-fit">
     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Logo />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <InputEmail email={email} onChange={(event) => setEmail(event.target.value)} />
            <InputPassword password={password} onChange={(event) => setPassword(event.target.value)}/>
            <ButtonSumbit />
            {error && <div className="text-errorRed font-medium">{error}</div>}
          </form>
          <IconsFood />
        </div>
      </div>
    </section>
  );
}

export { Login };
