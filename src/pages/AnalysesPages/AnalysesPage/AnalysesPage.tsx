import { FC, useState } from 'react'
import { useRouter } from 'next/router'

import {
  FilterSearch,
  FooterWithBasket,
  PatientPicker,
} from 'features'
import { Heading } from 'components'

import { useAppDispatch } from 'store/hooks'
import { setPatient } from 'store/slices/family'
import { useGetFamily } from 'shared/hooks/useGetFamily'
import { useGetAnalyses } from 'shared/hooks/useGetAnalyses'

import s from './analysesPage.module.scss'

const AnalysesPage: FC = () => {
  const dispatch = useAppDispatch()
  const { analyses, categories } = useGetAnalyses()
  const { patient, family } = useGetFamily()

  const { push } = useRouter()
  const handleClick = () => {
    push('/analyses/basket/')
  }

  const handlePatient = (id: number) => {
    dispatch(setPatient(id))
  }

  const [activeSubList, setActiveSubList] = useState<number[]>([])

  const handleChange = (id: number, subId?: number): void => {
    const newId = analyses?.find(item => item.id === subId)?.id

    if (!newId) return

    setActiveSubList(prev =>
      prev.includes(newId)
        ? prev.filter(el => el !== newId)
        : [...prev, newId]
    )
  }

  const total = (activeSubList: number[]) =>
    analyses
      ?.filter(item => activeSubList.includes(item.id))
      ?.map(item => item.price)
      .reduce((acc, val) => acc + val, 0) || 0

  const subtext = (amount: number) => {
    switch (amount % 10) {
      case 4:
      case 3:
      case 2:
        return `${amount} анализа`
      case 1:
        return `${amount} анализ`

      case 0:
      default:
        return `${amount} анализов`
    }
  }

  return (
    <>
      <div className={s.container}>
        <Heading As='h1' className={s.title}>
          Сдача анализов
        </Heading>
        <PatientPicker
          className={s.patientPicker}
          active={patient?.id}
          patients={family}
          onClick={handlePatient}
        />
        <FilterSearch
          className={s.filterSearch}
          list={categories}
          subList={analyses}
          activeSubList={activeSubList}
          onChange={handleChange}
          title={'Анализы'}
          placeholder={'Поиск анализов'}
          advanced
        />
      </div>

      <FooterWithBasket
        price={total(activeSubList)}
        onClick={handleClick}
        buttonLabel={'Время сдачи анализов'}
      >
        <span>{subtext(activeSubList.length)}</span>
      </FooterWithBasket>
    </>
  )
}

export default AnalysesPage
