import { useLayoutEffect } from 'react'
import { handleError } from 'shared/utils/handleError'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { getSpecialties } from 'shared/api/routes/specialties'
import { setSpecialties } from 'store/slices/specialties'
import { useToken } from './useToken'

export const useGetSpecialties = () => {
  const token = useToken()
  const dispatch = useAppDispatch()

  const { meta, specialties } = useAppSelector(
    state => state.specialties
  )

  const updateSpecialties = async () => {
    try {
      const { data } = await getSpecialties()
      dispatch(setSpecialties(data.result.data))
    } catch (err) {
      handleError(err)
    }
  }

  useLayoutEffect(() => {
    if (!token) return
    if (meta !== null) return
    updateSpecialties()
  }, [token])

  return { meta, specialties }
}
