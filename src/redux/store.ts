import {configureStore} from '@reduxjs/toolkit'
import DataReducer from './features/dataSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import LocationReducer from './features/locationSlice'
import UnitReducer from './features/unitSlice'
import SearchHistoryReducer from './features/searchHistorySlice'


export const store = configureStore(
    {reducer:
        {
           DataReducer,
           LocationReducer,
           UnitReducer,
           SearchHistoryReducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 