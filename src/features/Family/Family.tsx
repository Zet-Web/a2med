import { FC, useState } from 'react'

import { Button, Heading, Modal } from 'components'
import MemberForm from './MemberForm/MemberForm'
import MembersList from './MembersList/MembersList'

import { useAppDispatch } from 'store/hooks'
import { deleteFamilyById } from 'store/slices/family'
import { PatientType } from 'shared/types/patient'
import { useGetFamily } from 'shared/hooks/useGetFamily'
import { deleteFamilyMember } from 'shared/api/routes/family'

import s from './family.module.scss'

const Family: FC = () => {
  const dispatch = useAppDispatch()
  const { family } = useGetFamily()

  const [editedMember, setEditedMember] =
    useState<PatientType | null>(null)

  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFormClose = () => setIsFormOpen(false)
  const handleFormOpen = (member?: PatientType) => {
    setEditedMember(member || null)
    setIsFormOpen(true)
  }

  const [idMemberToDelete, setIdMemberToDelete] = useState<
    number | null
  >(null)
  const handleDeleteMember = (id: number) => setIdMemberToDelete(id)

  const handleConfirm = async () => {
    if (idMemberToDelete === null) return
    const data = await deleteFamilyMember(idMemberToDelete)
    if (data.status === 200) {
      dispatch(deleteFamilyById(idMemberToDelete))
    }
    setIdMemberToDelete(null)
  }
  const handleCancel = () => {
    setIdMemberToDelete(null)
  }

  return (
    <div className={s.container}>
      <Heading className={s.title} As='h2'>
        Моя семья
      </Heading>

      {isFormOpen ? (
        <MemberForm
          member={editedMember}
          closeForm={handleFormClose}
        />
      ) : (
        <MembersList
          family={family}
          openMemberForm={handleFormOpen}
          handleDeleteMember={handleDeleteMember}
        />
      )}

      <Modal
        isOpen={Boolean(idMemberToDelete)}
        onClose={handleCancel}
        className={s.content}
      >
        <Heading As='h4' className={s.caption}>
          Вы действительно хотите удалить члена семьи?
        </Heading>
        <div className={s.buttonsWrapper}>
          <Button className={s.button} onClick={handleConfirm}>
            Удалить
          </Button>
          <Button
            variant='outline'
            className={s.button}
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Family
