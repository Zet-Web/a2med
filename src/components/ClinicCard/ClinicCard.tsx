import { FC } from 'react'

import Heading from 'components/Heading/Heading'
import Icon from 'components/Icon/Icon'

import { ClinicFull } from 'shared/types/clinic'

import s from './clinicCard.module.scss'
import { convert } from './weekdaysConvert'

interface ClinicCardProps {
  clinic: ClinicFull
  onClick: (id: number) => void
  onMarkerClick: (address: string) => void
}

const ClinicCard: FC<ClinicCardProps> = ({
  clinic,
  onClick,
  onMarkerClick,
}) => {
  const handleMarkerClick = () => {
    onMarkerClick(clinic.address)
  }
  //@ts-ignore
  let convertedWeekdays = convert(clinic.weekdays)

  return (
    <div className={s.content}>
      <Heading
        As='h3'
        className={s.heading}
        onClick={() => onClick(clinic.id)}
      >
        {clinic.name}
        <span className={s.distance}>{clinic.distance}</span>
      </Heading>

      <p className={s.address}>{clinic.address}</p>

      <div className={s.infoWrapper}>
        <ul className={s.list}>
          {convertedWeekdays.map(day => (
            <li key={day.day} className={s.listItem}>
              <span className={s.day}>{day.day}</span>
              <span>{day.start_at.slice(0, 5)}</span>-
              <span>{day.end_at.slice(0, 5)}</span>
            </li>
          ))}
        </ul>
        <div className={s.iconsWrapper}>
          <Icon
            className={s.phoneIcon}
            variant='phone'
            width={30}
            height={30}
          />
          <Icon
            className={s.locationIcon}
            variant='location_white'
            width={30}
            height={30}
            onClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  )
}

export default ClinicCard
