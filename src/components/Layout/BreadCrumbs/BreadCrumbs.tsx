import { FC, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { getCrumbs } from 'shared/utils/handleCrumbs'
import { LinkType } from 'shared/types'
import { useAppSelector } from 'store/hooks'

import s from './breadCrumbs.module.scss'

interface BreadCrumbsProps {
  pathname: string
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ pathname }) => {
  const { name } = useAppSelector(state => state.crumbs)
  const [crumbs, setCrumbs] = useState<LinkType[]>([])

  useEffect(() => {
    setCrumbs(getCrumbs(pathname.replace('[id]', name || '...')))
  }, [pathname, name])

  return (
    <ul className={s.list}>
      {crumbs.map((item, index) => (
        <Fragment key={index}>
          <li className={s.item}>
            {item.href === pathname ? (
              <span className={s.active}>{item.label}</span>
            ) : (
              <Link href={item.href}>
                <a className={s.link}>{item.label}</a>
              </Link>
            )}
          </li>
          {index !== crumbs.length - 1 && (
            <span className={s.item}>/</span>
          )}
        </Fragment>
      ))}
    </ul>
  )
}

export default BreadCrumbs
