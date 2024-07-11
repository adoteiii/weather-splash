import {configureStore} from '@reduxjs/toolkit'
import DataReducer from './features/dataSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import LocationReducer from './features/locationSlice'

export const store = configureStore(
    {reducer:
        {
           DataReducer,
           LocationReducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 