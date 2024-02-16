import { createSlice } from "@reduxjs/toolkit";
const initialState={
  userName:"",
  passWord:""
}
export const loginSlice = createSlice({
    name:"LOGIN",
    initialState,
    reducers:{
        setLoginuser:(state,action)=>{
            const {UserName,Password}= action.payload;
            state.userName = UserName;
            state.passWord =Password;
        }
    },
})
export const {setLoginuser} =loginSlice.actions
export default loginSlice.reducer