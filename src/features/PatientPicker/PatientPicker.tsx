import { FC } from 'react'
import cn from 'classnames'

import { Avatar, Button, Heading } from 'components'

import { PatientType } from 'shared/types/patient'

import s from './patientPicker.module.scss'

interface PatientPickerProps {
  className?: string
  active: number | undefined
  patients: PatientType[] | null
  onClick: (id: number) => void
}

const PatientPicker: FC<PatientPickerProps> = ({
  className,
  active,
  patients,
  onClick,
}) => {
  return (
    <div className={cn(s.container, className)}>
      <Heading As='h4' className={s.heading}>
        Пациент
      </Heading>

      <div className={s.content}>
        {patients?.map(patient => (
          <Button
            key={patient.id}
            className={cn(s.button, {
              [s.active]: patient.id === active,
            })}
            onClick={() => onClick(patient.id)}
          >
            <Avatar
              className={s.avatar}
              src={patient.image}
              alt={patient.name}
              size={45}
            />
            <span>{[patient.name, patient.surname].join(' ')}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default PatientPicker
