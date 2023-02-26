import { FC, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

import BreadCrumbs from './BreadCrumbs/BreadCrumbs'
import Footer from './Footer/Footer'
import Header from './Header/Header'

import { useToken } from 'shared/hooks/useToken'
import { useGetProfile } from 'shared/hooks/useGetProfile'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'
import { NAVIGATION_LINKS } from 'shared/constants/navigationLinks'
import { noLayout, withoutBreadCrumbs, withoutFooter } from './utils'

import s from './layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter()
  const token = useToken()
  const profile = useGetProfile()
  const specialties = useGetSpecialties()

  return noLayout.includes(pathname) ? (
    <>{children}</>
  ) : (
    <>
      <Header links={NAVIGATION_LINKS} />

      <main className={s.main}>
        {!withoutBreadCrumbs.includes(pathname) && (
          <BreadCrumbs pathname={pathname} />
        )}
        {children}
      </main>

      {!withoutFooter.includes(pathname) && (
        <Footer links={NAVIGATION_LINKS} />
      )}
    </>
  )
}

export default Layout
