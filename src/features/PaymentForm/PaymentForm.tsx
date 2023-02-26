import { FC, ChangeEvent, useState, useEffect } from 'react'
import cn from 'classnames'

import { ConfirmModal } from 'features'
import { Checkbox, Heading, Map, RadioGroup } from 'components'
import { AppointmentType } from 'shared/types/appointment'
import { RequestType } from 'shared/types/request'
import { appointmentLabels } from 'shared/constants/appointmentLabels'

import s from './paymentForm.module.scss'

interface PaymentFormProps {
  data: Partial<AppointmentType> | null
  withMap?: boolean
  split?: boolean
  className?: string
  onClick: () => void
}

enum WayPayment {
  online = 'Оплатить онлайн',
  offline = 'Оплатить в клинике',
}

const PaymentForm: FC<PaymentFormProps> = ({
  data,
  withMap,
  split,
  onClick,
  className,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget
    setIsChecked(checked)
  }

  const [paymentMethod, setPaymentMethod] =
    useState<WayPayment | null>(null)
  const handlePaymentMethod = (value: string) => {
    setPaymentMethod(value as WayPayment)
  }

  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  useEffect(() => {
    setIsDisabled(!(isChecked && paymentMethod))
  }, [isChecked, paymentMethod])

  const Summary = () => (
    <div className={s.summary}>
      <span className={s.text}>Итого</span>
      <span className={s.total}> от 1500 ₽</span>
    </div>
  )

  const List = () => (
    <ul className={s.list}>
      {data &&
        Object.entries(data).map(([key, data]) => (
          <li className={s.listItem} key={key}>
            <span className={s.listItemLabel}>
              {
                appointmentLabels[
                  key as keyof (AppointmentType | RequestType)
                ]
              }
            </span>
            <span className={s.listItemValue}>{data?.label}</span>
          </li>
        ))}
    </ul>
  )

  const Controls = () => (
    <>
      <Checkbox
        value={isChecked}
        onChange={handleChecked}
        className={s.checkbox}
      >
        Я согласен с условиями
        <a className={s.link}> публичной оферты</a>
      </Checkbox>

      <RadioGroup
        className={s.radioGroup}
        value={paymentMethod}
        onChange={handlePaymentMethod}
        labels={[WayPayment.online, WayPayment.offline]}
        disabled={[WayPayment.online]}
      />

      <ConfirmModal
        className={s.confirmButton}
        label={
          paymentMethod === WayPayment.online
            ? 'Оплатить'
            : 'Записаться'
        }
        title='Уважаемый пациент!'
        description={
          'Записываясь на приём, вы подтверждаете, что у Вас отсутствуют признаки ОРВИ и повышенная температура. Соблюдайте осторожность. Носите маску и перчатки.'
        }
        confirmButtonLabel={'Подтвердить'}
        onConfirm={onClick}
        disabled={isDisabled}
      />
    </>
  )

  return (
    <>
      {split ? (
        <section className={cn(s.grid, s.split, className)}>
          <div className={s.wrapper}>
            <Heading As='h4' className={s.title}>
              Подтверждение
            </Heading>

            <List />
          </div>

          <div className={s.wrapper}>
            <Heading As='h4' className={s.caption}>
              Приём у врача (первичный)
            </Heading>

            <Summary />

            <Controls />
          </div>
        </section>
      ) : (
        <section
          className={cn(s.flex, { [s.withMap]: withMap }, className)}
        >
          <div className={s.wrapperInfo}>
            <Heading As='h4' className={s.title}>
              Подтверждение
            </Heading>

            <List />

            <Controls />
          </div>

          {withMap && <Map address='Дачная ул., 24, Самара' />}
        </section>
      )}
    </>
  )
}

export default PaymentForm
