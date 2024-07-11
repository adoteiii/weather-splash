import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: 'Accra' as string,
}
export const Location = createSlice(
    {
        name: 'Location',
        initialState,
        reducers: {
            setLocation: (state, action: PayloadAction<string>)=> {
                return {
                    value: action.payload
                }
            },
            getLocation: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setLocation, getLocation} = Location.actions
export default Location.reducer 

