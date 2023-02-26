import { AuthPicture, RegisterForm } from 'features'

import s from './registerPage.module.scss'

const RegisterPage = () => {
  return (
    <main className={s.main}>
      <AuthPicture />
      <RegisterForm />
    </main>
  )
}

export default RegisterPage
