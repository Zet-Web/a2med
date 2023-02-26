import { FC } from 'react'

import { Button } from 'components'

import { genderOptions } from 'shared/constants/genderOptions'
import { formatDateNotification } from 'shared/utils/handleDate'
import { ProfileFormState } from 'shared/types/profile'

import { profileLabels } from '../constants'

import s from './readProfile.module.scss'

interface ReadProfileProps {
  currentData: ProfileFormState
  onEdit: () => void
}

export const ReadProfile: FC<ReadProfileProps> = ({
  currentData,
  onEdit,
}) => (
  <>
    <div className={s.wrapper}>
      {Object.entries(profileLabels).map(([name, label]) => (
        <div key={name} className={s.inputContainer}>
          <span className={s.label}>{label}</span>
          <p>
            {(() => {
              switch (name) {
                case 'gender': {
                  return genderOptions[currentData.gender]?.label
                }
                case 'birthday': {
                  return formatDateNotification(currentData.birthday)
                }
                default: {
                  return currentData[name as keyof ProfileFormState]
                }
              }
            })()}
          </p>
        </div>
      ))}
    </div>

    <Button variant='primary' onClick={onEdit} className={s.button}>
      Редактировать
    </Button>
  </>
)
