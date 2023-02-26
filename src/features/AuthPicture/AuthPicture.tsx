import Image from 'next/image'

import bgLogin from '/public/assets/images/bgLogin.jpg'
import logo from '/public/assets/images/Logo.png'

import s from './authPicture.module.scss'

const AuthPicture = () => {
  return (
    <div className={s.container}>
      <Image
        src={bgLogin}
        alt='picture'
        placeholder='blur'
        layout='fill'
        objectFit='contain'
      />
      <div className={s.logo}>
        <Image src={logo} alt='A2MED' width={275} height={61} />
        <div className={s.text}>Личный кабинет</div>
      </div>
    </div>
  )
}

export default AuthPicture
