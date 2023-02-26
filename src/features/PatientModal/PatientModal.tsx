import { FC, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { Avatar, Button, Heading, Modal } from 'components'
import { useGetFamily } from 'shared/hooks/useGetFamily'

import s from './patientModal.module.scss'

type PatientModalPropsType = {
  label: string
  className?: string
  onClick: (patientId: number) => void
}

const PatientModal: FC<PatientModalPropsType> = ({
  label,
  className,
  onClick,
}) => {
  const { family } = useGetFamily()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleModalOpen = () => {
    setIsModalOpen(prev => !prev)
  }

  let [active, setActive] = useState(1)
  const handleClick = (id: number) => {
    setActive(id)
    onClick(id)
    handleModalOpen()
  }

  return (
    <>
      <Button className={className} onClick={handleModalOpen}>
        {label}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalOpen}
        className={s.modal}
        closeClassName={s.close}
      >
        <Heading As='h4' className={s.caption}>
          Выберите пациента
        </Heading>

        {family ? (
          <ul
            className={cn(s.list, {
              [s.columns]: family.length > 5,
            })}
          >
            {family.map(item => (
              <li
                key={item.id}
                className={cn(s.item, {
                  [s.active]: item.id === active,
                })}
                onClick={() => handleClick(item.id)}
              >
                <Avatar
                  className={s.avatar}
                  src={item.image}
                  size={50}
                />
                <span className={s.name}>
                  {[item.name, item.surname].join(' ')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={s.plug}>
            Не добавлено ещё ни одного члена семьи
          </p>
        )}

        <Link href='/profile?tab=1'>
          <a className={s.link}>Добавить члена семьи</a>
        </Link>
      </Modal>
    </>
  )
}

export default PatientModal
