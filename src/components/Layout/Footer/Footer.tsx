import { FC } from 'react'

import Link from 'next/link'
import { Icon, Logo } from 'components'

import { LinkType } from 'shared/types'

import s from './footer.module.scss'

interface FooterProps {
  links: LinkType[]
}

const Footer: FC<FooterProps> = ({ links }) => {
  return (
    <footer className={s.footer}>
      <div className={s.logoBlock}>
        <Logo width={237} height={53} className={s.logo} />
        <p className={s.trademark}>
          &copy;&nbsp;2008-2022&nbsp;ООО &laquo;А2МЕД САМАРА&raquo;
        </p>
      </div>
      <nav className={s.navigation}>
        <ul className={s.list}>
          {links.map((item, index) => (
            <li key={index} className={s.item}>
              <Link href={item.href}>
                <a className={s.link}>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <address className={s.address}>
        <div className={s.addressWrapper}>
          <Icon className={s.iconWrapper} variant='phone' />
          <a href={`tel:${88463130303}`} className={s.phone}>
            +7 (846) 313 03 03
          </a>
        </div>
        <div className={s.addressWrapper}>
          <Icon className={s.iconWrapper} variant='location' />
          <span className={s.location}>г. Самара ул. Дачная 24</span>
        </div>
      </address>
    </footer>
  )
}

export default Footer
