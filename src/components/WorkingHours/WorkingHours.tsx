import { FC } from 'react'
import { Heading } from 'components'
import { ClinicFull } from 'shared/types/clinic'

import s from './workingHours.module.scss'

interface WorkingHoursProps {
  title: string
  clinics: ClinicFull[]
}

const WorkingHours: FC<WorkingHoursProps> = ({ title, clinics }) => (
  <div className={s.container}>
    <Heading As={'h3'} className={s.title}>
      {title}
    </Heading>

    {clinics?.map(clinic => (
      <div key={clinic.id} className={s.addressWrapper}>
        <address className={s.address}>{clinic.address}</address>
        <div className={s.workingHours}>
          {clinic?.workingHours?.map(day => (
            <div key={day.days} className={s.daysWrapper}>
              <span className={s.day}>{day.days}</span>
              <span>{day.hours}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default WorkingHours
