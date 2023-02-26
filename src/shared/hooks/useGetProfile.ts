import React, { useLayoutEffect } from 'react'
import { getProfile } from 'shared/api/routes/profile'
import { setProfile } from 'store/slices/profile'
import { handleError } from 'shared/utils/handleError'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useToken } from './useToken'

export const useGetProfile = () => {
  // this check disables the warning on server
  if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect
  }

  const token = useToken()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile.profile)

  const updateProfile = async () => {
    try {
      const { data } = await getProfile()
      dispatch(setProfile(data.result))
    } catch (err) {
      handleError(err)
    }
  }

  useLayoutEffect(() => {
    if (!token) return
    if (profile !== null) return
    updateProfile()
  }, [token])

  return profile
}
