import { createSlice } from "@reduxjs/toolkit";

const initial = {email:"", age:0, password:""}

export const userSlice = createSlice({
    name:"user",
    initialState:{value:initial},
    reducers:{
        login:function (state, action){
            state.value = action.payload;
        },
        logout: function (state){
            state.value = initial;
        }
    }
});

export const userReducer = userSlice.reducer;
