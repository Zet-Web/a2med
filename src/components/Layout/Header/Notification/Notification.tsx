import { FC, useRef, MouseEvent, useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import parse from 'html-react-parser'
import cn from 'classnames'

import { Heading } from 'components'

import { formatDateNotification } from 'shared/utils/handleDate'
import { NotificationType } from 'shared/types/notification'
import {
  getNotificationList,
  readNotification,
} from 'shared/api/routes/notifications'
import { handleError } from 'shared/utils/handleError'
import { useToken } from 'shared/hooks/useToken'

import s from './notification.module.scss'

type NotificationPropsType = {
  isOpen: boolean
  onClose: () => void
  setUnread: (unread: number) => void
}

const Notification: FC<NotificationPropsType> = ({
  isOpen,
  onClose,
  setUnread,
}) => {
  // Modal logic
  const ref = useRef<HTMLUListElement>(null)
  const onClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref?.current
    if (!el || el.contains(event.target as Node)) return
    onClose()
  }

  // Data logic
  const token = useToken()
  const [notifications, setNotifications] = useState<
    NotificationType[]
  >([])
  const getNotifications = async () => {
    try {
      const { data } = await getNotificationList()
      setNotifications(sortBy(data.result, ['id']))
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(() => {
    if (!token) return
    getNotifications()
  }, [token])

  useEffect(() => {
    setUnread(notifications.filter(item => !item.read).length)
  }, [notifications])

  // Reading logic
  const readAllNotifications = async () => {
    notifications
      .filter(item => !item.read)
      .forEach(async ({ id }) => {
        try {
          const { data } = await readNotification(id)
          setNotifications(prev => [
            ...prev.filter(notify => notify.id !== id),
            data.result,
          ])
        } catch (error) {
          handleError(error)
        }
      })
  }
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => readAllNotifications(), 3000)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Styles
  const wrapperClass = cn(s.wrapper, { [s.isOpen]: isOpen })
  const containerClass = cn(s.container, { [s.isOpen]: isOpen })

  return (
    <div className={containerClass} onClick={onClickOutside}>
      <ul ref={ref} className={wrapperClass}>
        {notifications.map(({ id, title, date, text, read }) => {
          return (
            <li
              key={id}
              className={cn(s.item, {
                [s.reading]: read,
              })}
            >
              <div className={s.heading}>
                <Heading As='h4' className={s.title}>
                  {title}
                  <div className={s.point} />
                </Heading>
                <p className={s.date}>
                  {formatDateNotification(date || new Date())}
                </p>
              </div>

              {parse(text)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Notification
