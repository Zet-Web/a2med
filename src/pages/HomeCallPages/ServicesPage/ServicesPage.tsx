import { FC, useState } from 'react'
import { useRouter } from 'next/router'

import { FooterWithBasket, PatientPicker, Services } from 'features'
import { Alert, Heading } from 'components'

import { setPatient } from 'store/slices/family'
import { useGetFamily } from 'shared/hooks/useGetFamily'
import { mock_homeCall } from 'shared/mocks/mock_homeCall'

import s from './servicesPage.module.scss'

const ServicesPage: FC = () => {
  const { patient, family } = useGetFamily()

  const handlePatient = (id: number) => {
    setPatient(id)
  }

  const [activeList, setActiveList] = useState<number[]>([])

  const addToBasket = (newId: number) => {
    setActiveList(prev =>
      prev.includes(newId)
        ? prev.filter(el => el !== newId)
        : [...prev, newId]
    )
  }

  const count = activeList.length
  const price = mock_homeCall.reduce((acc, item) => {
    if (activeList.includes(item.id)) acc += item.price
    return acc
  }, 0)

  const { push } = useRouter()
  const handleClick = () => {
    push('patient')
  }

  const subtext = (amount: number) => {
    switch (amount % 10) {
      case 4:
      case 3:
      case 2:
        return `${amount} услуги`
      case 1:
        return `${amount} услуга`

      case 0:
      default:
        return `${amount} услуг`
    }
  }

  return (
    <>
      <div className={s.container}>
        <Heading As='h1' className={s.title}>
          Вызов врача на дом
        </Heading>
        <PatientPicker
          active={patient?.id}
          patients={family}
          onClick={handlePatient}
        />
        <Alert>
          Для вызова врача, медсестры или тестирования на COVID-19,
          укажите адрес и нажмите на кнопку “Далее”. Менеджеры
          свяжутся с Вами, чтобы уточнить все детали и подтвердить
          заявку.
        </Alert>
        <div className={s.wrapper}>
          <Services
            list={mock_homeCall}
            activeList={activeList}
            onClick={addToBasket}
          />
        </div>
      </div>

      <FooterWithBasket
        price={price}
        buttonLabel={'Выбрать услуги'}
        onClick={handleClick}
      >
        <span className={s.basket}>
          В корзине <span className={s.color}>{subtext(count)}</span>
        </span>
      </FooterWithBasket>
    </>
  )
}

export default ServicesPage
