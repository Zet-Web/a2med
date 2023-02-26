import { FC } from 'react'

import Link from 'next/link'
import { Heading, Icon, Avatar } from 'components'

import { Doctor } from 'shared/types/doctor'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'

import s from './doctorInfo.module.scss'

interface DoctorInfoProps {
  data: Doctor
  onClick: (id: number) => void
  link: string
}

const DoctorInfo: FC<DoctorInfoProps> = ({ data, onClick, link }) => {
  //TODO подключить клиники
  const {
    id,
    avatar,
    name,
    surname,
    patronymic,
    specialty_id,
    clinic_id,
  } = data
  const specialty = useGetSpecialties()?.meta?.find(
    item => item.id === specialty_id
  )?.name

  return (
    <div className={s.container} onClick={() => onClick(id)}>
      <div className={s.infoBlock}>
        <Avatar
          className={s.avatar}
          src={avatar}
          alt={name}
          size={65}
          isDoctor={specialty_id ? true : false}
        />

        <div className={s.content}>
          <Heading As='h4' className={s.title}>
            {[surname, name, patronymic].join(' ')}
          </Heading>
          <p className={s.caption}>{specialty}</p>
        </div>

        <Link href={link}>
          <a className={s.linkWrapper}>
            <Icon variant='warning' width={9} height={9} />
            Подробнее
          </a>
        </Link>
      </div>

      <address className={s.address}>
        <Icon variant='location_white' width={20} height={20} />
        <span>{`Клиника ${clinic_id}`}</span>
      </address>
    </div>
  )
}

export default DoctorInfo
