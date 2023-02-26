import { FC, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { DoctorInfo } from 'features'
import { Button } from 'components'

import { Specialty } from 'shared/types/specialties'
import { DoctorFull } from 'shared/types/doctor'
import { isComparable } from 'shared/utils/handleString'

import s from './specialistPicker.module.scss'

type SpecialistPickerProps = {
  specialties: Specialty[] | null
  onClickDoctor: (id: number) => void
  filterInput: string | null
  filterSelect: number | null
}

const SpecialistPicker: FC<SpecialistPickerProps> = ({
  specialties,
  onClickDoctor,
  filterInput,
  filterSelect,
}) => {
  const [active, setActive] = useState<number | null>(
    specialties?.find(item => isComparable(item.name, filterInput))
      ?.id || null
  )
  useEffect(
    () =>
      setActive(
        specialties?.find(
          item => filterInput && isComparable(item.name, filterInput)
        )?.id || null
      ),
    [filterInput]
  )

  const doctors = specialties?.map(item => item.doctors).flat()

  const filterDoctors: DoctorFull[] | undefined = useMemo(() => {
    return doctors
      ?.filter(item => !active || item.specialty_id === active)
      .filter(
        item => !filterSelect || item.clinic_id === filterSelect
      )
  }, [active, specialties, filterInput, filterSelect])

  const [isShowMore, setIsShowMore] = useState(false)
  const handleShowMore = () => setIsShowMore(true)

  const onClickSpecialist = (index: number | null) => {
    setActive(index)
  }

  return specialties ? (
    <div className={s.container}>
      <div className={s.listContainer}>
        <ul className={s.list}>
          <li
            className={cn(s.listItem, {
              [s.active]: !active,
            })}
            onClick={() => onClickSpecialist(null)}
          >
            Все врачи
          </li>

          {specialties
            .filter((i, index) => isShowMore || index <= 7)
            .map(item => (
              <li
                key={item.id}
                className={cn(s.listItem, {
                  [s.active]: active === item.id,
                })}
                onClick={() => onClickSpecialist(item.id)}
              >
                {item.name}
              </li>
            ))}
        </ul>
        {!isShowMore && specialties.length > 7 && (
          <Button onClick={handleShowMore} className={s.button}>
            Показать всех врачей
          </Button>
        )}
      </div>

      <div className={s.doctorsInfo}>
        {filterDoctors?.map((item, index) => (
          <DoctorInfo
            key={index}
            data={item}
            onClick={onClickDoctor}
            link={`/doctors/${item.id}`}
          />
        ))}
      </div>
    </div>
  ) : null
}

export default SpecialistPicker
