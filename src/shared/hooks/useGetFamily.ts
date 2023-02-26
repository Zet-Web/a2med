import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setFamily } from 'store/slices/family'
import { getFamily } from 'shared/api/routes/family'
import { handleError } from 'shared/utils/handleError'
import { useToken } from './useToken'

export const useGetFamily = () => {
  const token = useToken()
  const dispatch = useAppDispatch()
  const { patient, family } = useAppSelector(state => state.family)

  const updateFamily = async () => {
    try {
      const { data } = await getFamily()
      dispatch(setFamily(data.result))
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    if (!token) return
    if (family !== null) return
    updateFamily()
  }, [token])

  return {
    family,
    patient,
  }
}
