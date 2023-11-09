import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import { codeReducer } from "./countryCode/reducer";
import { userReducer } from "./user/reducer";

const reducer = combineReducers({
    countryCode: codeReducer,
    userData: userReducer
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<{}, {}, AnyAction>

export default store