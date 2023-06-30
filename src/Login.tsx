import {
  Logo,
  InputEmail,
  InputPassword,
  ButtonSumbit,
  IconsFood,
} from "./components/component.tsx";

function Login() {
  return (
    <section className="flex bg-gunMetal min-h-screen min-w-fit">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Logo />
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <InputEmail />
            <InputPassword />
            <ButtonSumbit />
          </form>
          <IconsFood />
        </div>
      </div>
    </section>
  );
}

export { Login };
