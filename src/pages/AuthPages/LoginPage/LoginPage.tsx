import { AuthForm, AuthPicture } from 'features'

import s from './loginPage.module.scss'

const LoginPage = () => {
  return (
    <main className={s.main}>
      <AuthPicture />
      <AuthForm />
    </main>
  )
}

export default LoginPage
