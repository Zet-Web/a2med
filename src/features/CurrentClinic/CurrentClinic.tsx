import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Button, Heading, Map, Icon } from 'components'

// TODO нет часов работы на бэкэнде
import { ClinicFull } from 'shared/types/clinic'
import { getClinicById } from 'shared/api/routes/clinics'
import { handleError } from 'shared/utils/handleError'
import { withDomain } from 'shared/utils/handleSrc'
import { useAppDispatch } from 'store/hooks'
import { resetCrumbs, setCrumbs } from 'store/slices/crumbs'

import s from './currentClinic.module.scss'
import { handleConvert } from 'shared/utils/handleConvert'

const CurrentClinic: FC = () => {
  const { push, query } = useRouter()
  const dispatch = useAppDispatch()
  const clinicId = Number(query.id)

  const [clinic, setClinic] = useState<ClinicFull | null>(null)

  const getClinic = async () => {
    try {
      const { data } = await getClinicById(clinicId)
      setClinic(data.result)

      dispatch(setCrumbs(data.result.name))
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getClinic()

    return () => {
      dispatch(resetCrumbs())
    }
  }, [])

  const handleClick = () => push(`/appointment`)

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Heading As='h3' className={s.heading}>
          {clinic?.name}
        </Heading>

        <p className={s.address}>г. Самара, {clinic?.address}</p>

        <ul className={s.list}>
          {handleConvert(clinic?.weekdays)?.map(item => (
            <li key={item.day} className={s.listItem}>
              <span className={s.day}>{item.day}</span>
              <span>{item.start_at.slice(0, -3)} - {item.end_at.slice(0, -3)} </span>
            </li>
          ))}
        </ul>

        <div className={s.phoneWrapper}>
          <Icon
            className={s.icon}
            variant='phone'
            width={30}
            height={30}
          />
          <p className={s.number}>+7 (912) 123-45-67-89</p>
        </div>

        <ul className={s.gallery}>
          {clinic?.images?.map((item, index) => (
            <li key={index} className={s.image}>
              <Image
                  // @ts-ignore
                src={withDomain(item.image)}
                alt={'clinic'}
                objectFit={'cover'}
                layout={'fill'}
              />
            </li>
          ))}
        </ul>

        <Heading As='h4' className={s.caption}>
          О клинике
        </Heading>

        <p className={s.description}>
          A2MED – объединяет работу многопрофильных медицинских
          центров по всей стране, более 20 направлений медицины и 70
          докторов. Наличие современного оборудования позволяет
          проводить эффективную диагностику и назначать правильное
          лечение.
        </p>

        <Button className={s.confirmButton} onClick={handleClick}>
          Записаться
        </Button>
      </div>

      <Map
        className={s.map}
        address={`г. Самара ${clinic?.address}`}
      />
    </div>
  )
}

export default CurrentClinic
