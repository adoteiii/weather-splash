import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: undefined as undefined|{sender: string, email: string, content: string, timestamp: number}[],
}
export const Messages = createSlice(
    {
        name: 'Messages',
        initialState,
        reducers: {
            setMessages: (state, action: PayloadAction<{sender: string, email: string, content: string, timestamp: number}[]|undefined>)=> {
                return {
                    value: action.payload
                }
            },
            getMessages: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setMessages, getMessages} = Messages.actions
export default Messages.reducer 

