import { FC } from 'react'

import { ConfirmModal } from 'features'
import { Heading } from 'components'

import s from './deleteAccount.module.scss'

interface DeleteAccountProps {
  id: number
}

const DeleteAccount: FC<DeleteAccountProps> = ({ id }) => {
  const handleConfirm = () => {
    console.log('delete id:', id)
  }
  const handleCancel = () => {
    console.log('back')
  }

  return (
    <div className={s.container}>
      <Heading As={'h2'} className={s.caption}>
        Удалить аккаунт
      </Heading>
      <ConfirmModal
        label={'Удалить аккаунт'}
        title={'Вы действительно хотите удалить аккаунт?'}
        description={
          'Все данные от аккаунта будут удалены без восстановления.'
        }
        confirmButtonLabel={'Удалить'}
        onConfirm={handleConfirm}
        cancelButtonLabel={'Отменить'}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default DeleteAccount
