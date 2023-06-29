import './App.css'

function Logo() {
  return (
    <figure>
      <img src="src/assets/queex4.png" alt="Queen Patty's Diner neon logo."></img>
    </figure>
  )
} 

function Login() {
  return(
    <article>
      <form>
        <input type='text' placeholder='Correo'></input>
        <input type='password' placeholder='Contraseña'></input>
        <button type='submit'>Ingresar</button>
      </form>
    </article>
  )
}

function IconsFood() {
  return(
      <img src="src/assets/icons_food.png" alt="Burger, french fries and sandwich neon icons."></img>
  )
}

export { Login, Logo, IconsFood }
