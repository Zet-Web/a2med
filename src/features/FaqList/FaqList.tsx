import { FC } from 'react'
import parse from 'html-react-parser'

import { Accordion, Heading } from 'components'

import { useGetFaqList } from 'shared/hooks/useGetFaq'

import s from './faqlist.module.scss'

const FaqList: FC = () => {
  const list = useGetFaqList()

  return (
    <div className={s.container}>
      <Heading As='h2' className={s.title}>
        Частые вопросы
      </Heading>
      {list?.map(question => (
        <Accordion title={question.title} key={question.id}>
          {parse(question.text)}
        </Accordion>
      ))}
    </div>
  )
}

export default FaqList
