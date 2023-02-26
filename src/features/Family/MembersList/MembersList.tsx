import { FC } from 'react'
import { Avatar, Button, Icon } from 'components'

import { isPersonAdult } from 'shared/utils/handleDate'
import { PatientType } from 'shared/types/patient'

import s from './membersList.module.scss'

interface MemberListProps {
  family: PatientType[] | null
  openMemberForm: (member?: PatientType) => void
  handleDeleteMember: (id: number) => void
}

const MembersList: FC<MemberListProps> = ({
  family,
  openMemberForm,
  handleDeleteMember,
}) => (
  <div>
    <Button
      onClick={() => openMemberForm()}
      className={s.addButton}
      variant='outline'
    >
      <Icon className={s.addIcon} variant='cross-white' />
      Добавить члена семьи
    </Button>

    <ul className={s.list}>
      {family?.length ? (
        family.map((member, index) => (
          <li className={s.item} key={index}>
            <Avatar
              src={null}
              isMale={Boolean(member.gender)}
              isAdult={isPersonAdult(member.birthday)}
            />

            <span className={s.name}>
              {[
                member.surname,
                member.name,
                member.patronymic || '',
              ].join(' ')}
            </span>

            <Icon
              variant='pencil-branding'
              onClick={() => openMemberForm(member)}
              className={s.editIcon}
            />

            <Icon
              variant='cross-purple'
              className={s.deleteIcon}
              onClick={() => handleDeleteMember(member.id)}
            />
          </li>
        ))
      ) : (
        <p className={s.plug}> Нет сохранённых членов семьи </p>
      )}
    </ul>
  </div>
)

export default MembersList
