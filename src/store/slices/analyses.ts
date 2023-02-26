import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnalysesCategory } from 'shared/types/analyses'
import { Analysis } from 'shared/types/analyses'

interface AnalysisState {
  analyses: Analysis[] | null
  categories: AnalysesCategory[] | null
}

const initialState: AnalysisState = {
  analyses: null,
  categories: null,
}

export const analyses = createSlice({
  name: 'analyses',
  initialState,
  reducers: {
    setAnalyses(state, action: PayloadAction<Analysis[]>) {
      state.analyses = [...action.payload]
    },
    setAnalysesCategories(
      state,
      action: PayloadAction<AnalysesCategory[]>
    ) {
      state.categories = [...action.payload]
    },
  },
})

export const { setAnalyses, setAnalysesCategories } = analyses.actions
export default analyses.reducer
