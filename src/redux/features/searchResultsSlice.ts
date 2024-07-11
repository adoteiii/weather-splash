import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState = {
    value: undefined as any[]|undefined,
}
export const SearchResults = createSlice(
    {
        name: 'SearchResults',
        initialState,
        reducers: {
            setSearchResults: (state, action: PayloadAction<any[]|undefined>)=> {
                return {
                    value: action.payload
                }
            },
            getSearchResults: (state)=>{
                return {
                    value: state.value
                }
            }
        } 
    }
)

export const {setSearchResults, getSearchResults} = SearchResults.actions
export default SearchResults.reducer 

