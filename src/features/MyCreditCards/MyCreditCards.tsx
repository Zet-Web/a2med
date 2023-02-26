import { FC, useState } from 'react'

import { Icon, Heading, Button } from 'components'
import MyCreditCardsList from './MyCreditCardsList/MyCreditCardsList'

import { CreditCardType } from 'shared/types/creditCard'
import { mock_credit_cards } from 'shared/mocks/mock_credit_cards'

import s from './myCreditCards.module.scss'

const MyCreditCards: FC = () => {
  const [cards, setCards] =
    useState<CreditCardType[]>(mock_credit_cards)

  const handleClick = () => {
    alert('Ожидается API')
  }

  const deleteCards = (id: number | null) => {
    setCards(cards.filter(el => el.id !== id))
  }

  const MyCreditCardsPlug: FC = () => (
    <>
      <Icon className={s.icon} variant='card' />
      <p className={s.text}>
        Привяжите банковскую карту, чтобы оплачивать услуги онлайн
      </p>
      <Button className={s.button} onClick={handleClick}>
        Привязать карту
      </Button>
    </>
  )

  return (
    <div className={s.container}>
      <Heading As='h2' className={s.title}>
        Мои карты
      </Heading>

      {cards.length ? (
        <MyCreditCardsList items={cards} onChange={deleteCards} />
      ) : (
        <MyCreditCardsPlug />
      )}
    </div>
  )
}

export default MyCreditCards
