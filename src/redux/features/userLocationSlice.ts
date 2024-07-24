import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: '' as string,
}
export const UserLocation = createSlice(
    {
        name: 'UserLocation',
        initialState,
        reducers: {
            setUserLocation: (state, action: PayloadAction<string>)=> {
                return {
                    value: action.payload
                }
            },
            getUserLocation: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setUserLocation, getUserLocation} = UserLocation.actions
export default UserLocation.reducer 

