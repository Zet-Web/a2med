import { useEffect } from 'react'
import {
  getAnalyses,
  getAnalysesCategories,
} from 'shared/api/routes/analyses'
import { handleError } from 'shared/utils/handleError'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  setAnalyses,
  setAnalysesCategories,
} from 'store/slices/analyses'
import { useToken } from './useToken'

export const useGetAnalyses = () => {
  const token = useToken()
  const dispatch = useAppDispatch()
  const { analyses, categories } = useAppSelector(
    state => state.analyses
  )

  const updateAnalyses = async () => {
    try {
      const { data } = await getAnalyses()
      dispatch(setAnalyses(data.result.data))
    } catch (err) {
      handleError(err)
    }
  }

  const updateAnalysesCategories = async () => {
    try {
      const { data } = await getAnalysesCategories()
      dispatch(setAnalysesCategories(data.result.data))
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    if (!token) return
    if (analyses !== null && categories !== null) return
    updateAnalyses()
    updateAnalysesCategories()
  }, [token])

  return { analyses, categories }
}
