import { FC } from 'react'

import { Icon, Heading, Avatar } from 'components'

import { IconType } from 'shared/types/icon'
import { DoctorFull } from 'shared/types/doctor'
import { useGetSpecialties } from 'shared/hooks/useGetSpecialties'

import s from './doctorFullInfo.module.scss'

interface DoctorFullInfoProps {
  data: DoctorFull
}

interface DocumentsListProps {
  icon: IconType
  docs: string[]
}

const DocumentsList: FC<DocumentsListProps> = ({ icon, docs }) => (
  <div className={s.documentsWrapper}>
    <Icon variant={icon} className={s.icon} />
    <ul className={s.documentsList}>
      {docs?.map((el, index) => (
        <li key={index} className={s.documentsItem}>
          {el}
        </li>
      ))}
    </ul>
  </div>
)

// TODO нет полей или поля не заполнены на бэкенде
const certificates = [
  'Удостоверение о повышении квалификации №180001443972 от 19.02.2018 «Педиатрия», 144 часа, ФГБОУ ВО СамГМУ Минздрава России',
  'Удостоверение о повышении квалификации №180001443972 от 19.02.2018 «Педиатрия», 144 часа, ФГБОУ ВО СамГМУ Минздрава России',
]

const license = [
  'Удостоверение о повышении квалификации №180001443972 от 19.02.2018 «Педиатрия», 144 часа, ФГБОУ ВО СамГМУ Минздрава России',
]

const DoctorFullInfo: FC<DoctorFullInfoProps> = ({ data }) => {
  const { name, surname, patronymic, specialty_id, avatar, clinic } =
    data
  const specialty = useGetSpecialties()?.meta?.find(
    item => item.id === specialty_id
  )?.name

  return (
    <section className={s.wrapper}>
      <div className={s.doctor}>
        <div>
          <Heading As='h3' className={s.title}>
            {[surname, name, patronymic].join(' ')}
          </Heading>
          <p className={s.caption}>{specialty}</p>
        </div>
        <Avatar
          className={s.avatar}
          src={avatar}
          alt={name}
          size={100}
          isDoctor={specialty_id ? true : false}
        />
      </div>
      <p className={s.experience}>Стаж: {'30 лет'}</p>
      <div className={s.address}>
        <Icon variant={'location_white'} className={s.icon} />
        {clinic.address}
      </div>
      <Heading As='h4' className={s.skillsTitle}>
        Образование и профессиональные навыки
      </Heading>
      <DocumentsList icon='education' docs={certificates} />
      {/* не приходит с бэка */}
      <DocumentsList icon='document' docs={license} />
      {/* не приходит с бэка */}
    </section>
  )
}

export default DoctorFullInfo
