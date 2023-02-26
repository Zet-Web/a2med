import { FC, useState } from 'react'

import { Button, Heading, Icon, Modal } from 'components'

import { CreditCardType } from 'shared/types/creditCard'

import s from './myCreditCardsList.module.scss'

type MyCreditCardsListType = {
  items: CreditCardType[]
  onChange: (id: number | null) => void
}

const MyCreditCardsList: FC<MyCreditCardsListType> = ({
  items,
  onChange,
}) => {
  const [cardId, setCardId] = useState<number | null>(null)

  const onSelectCard = (id: number) => setCardId(id)

  const handleCancel = () => setCardId(null)

  const handleConfirm = (cardId: number | null) => {
    onChange(cardId)
    setCardId(null)
  }

  return (
    <ul className={s.cardList}>
      {items.map(({ id, number, isActive }) => (
        <li key={id} className={s.cardItem}>
          <div className={s.cardInfo}>
            <p className={s.cardNumber}>
              **** **** **** {number.toString().slice(-4)}
            </p>
            <p className={s.cardStatus}>
              {isActive ? 'Активна' : 'Не активна'}
            </p>
          </div>

          <Icon
            variant='cross-purple'
            className={s.closeButton}
            onClick={() => {
              onSelectCard(id)
            }}
          />
        </li>
      ))}

      <Modal
        isOpen={Boolean(cardId)}
        onClose={handleCancel}
        className={s.content}
      >
        <Heading As='h4' className={s.caption}>
          Вы действительно хотите удалить карту?
        </Heading>
        <div className={s.buttonsWrapper}>
          <Button
            className={s.button}
            onClick={() => handleConfirm(cardId)}
          >
            Удалить
          </Button>
          <Button
            variant='outline'
            className={s.button}
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      </Modal>
    </ul>
  )
}

export default MyCreditCardsList
