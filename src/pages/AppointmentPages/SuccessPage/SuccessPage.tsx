import { FC } from 'react'
import { useRouter } from 'next/router'

import { EntryCompleted } from 'features'

import { useAppSelector } from 'store/hooks'

import s from './successPage.module.scss'

const SuccessPage: FC = () => {
  const { push } = useRouter()
  const { appointment } = useAppSelector(state => state.appointment)
  const handleClick = () => {
    push(`/med-profile`)
  }

  return (
    <div className={s.container}>
      <EntryCompleted data={appointment} onClick={handleClick} />
    </div>
  )
}

export default SuccessPage
