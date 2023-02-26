import { FC } from 'react'

import Image from 'next/image'
import { PatientModal } from 'features'
import { Heading } from 'components'

import { withDomain } from 'shared/utils/handleSrc'
import { StockType } from 'shared/types/stock'

import s from './actionPreview.module.scss'

interface ActionPreviewProps {
  data: StockType | null
  onClick: (patientId: number) => void
}

const ActionPreview: FC<ActionPreviewProps> = ({ data, onClick }) => {
  // TODO нет цен на бэкэнде
  return (
    <section className={s.wrapper}>
      <div className={s.image}>
        <Image
          src={withDomain(data?.image)}
          alt={data?.title || 'action'}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className={s.link}>Акция</div>

      <div className={s.pay}>
        <div className={s.payText}>
          <div className={s.payTextBlock1}>
            <Heading As='h3' className={s.title}>
              {data?.title}
            </Heading>
            <p className={s.text}>{data?.text || 'Текст акции'}</p>
          </div>

          <Heading As='h4' className={s.title2}>
            В необходимый перечень анализов входят:
          </Heading>
          <p className={s.text}>
            Список анализов или услуг, входящих в акцию.
          </p>
        </div>

        <span className={s.sum}> 1500 ₽</span>
      </div>

      <PatientModal
        className={s.button}
        label='Записаться'
        onClick={onClick}
      />
    </section>
  )
}

export default ActionPreview
