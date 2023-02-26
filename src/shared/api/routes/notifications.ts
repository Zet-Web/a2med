import api, { AxiosApiResponse, endpoints } from 'shared/api'

import { NotificationType } from 'shared/types/notification'

export const getNotificationList = (): AxiosApiResponse<
  NotificationType[]
> => {
  return api.get(endpoints.notifications.get)
}

export const readNotification = (
  notification_id: number
): AxiosApiResponse<NotificationType> => {
  return api.put(endpoints.notifications.getById(notification_id))
}
