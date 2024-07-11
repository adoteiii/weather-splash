import { WeatherData } from "@/types/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: undefined as WeatherData|undefined|null
}

export const Data = createSlice(
    {
        name: 'Data',
        initialState,
        reducers: {
            setData: (state, action: PayloadAction<WeatherData|undefined|null>)=> {
                return {
                    value: action.payload
                }
            },
            getData: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setData, getData} = Data.actions
export default Data.reducer 
