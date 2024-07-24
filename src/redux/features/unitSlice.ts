import { UnitData } from "@/types/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: {temperature: 'C', pressure: 'inHg', visibilityUnit: 'km'} as UnitData,
}
export const Units = createSlice(
    {
        name: 'Units',
        initialState,
        reducers: {
            setUnits: (state, action: PayloadAction<UnitData>)=> {
                return {
                    value: action.payload
                }
            },
            getUnits: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setUnits, getUnits} = Units.actions
export default Units.reducer 
