import { useEffect, useState } from 'react'
import { getFaqList } from 'shared/api/routes/faq'
import { FaqType } from 'shared/types/faq'
import { handleError } from 'shared/utils/handleError'
import { useToken } from './useToken'

export const useGetFaqList = () => {
  const token = useToken()
  const [list, setList] = useState<FaqType[]>([])

  const setFaqList = async () => {
    try {
      const { data } = await getFaqList()
      setList(data.result)
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    if (!token) return
    setFaqList()
  }, [token])

  return list
}
