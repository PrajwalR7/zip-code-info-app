import { Reducer } from "redux"
import { CountryActionPayloadType, CountryState } from "./types"
import { ActionType } from "../../types"
import { COUNTRY_ACTIONS } from "./action"

const initalState: CountryState = {
    loading: true,
    data: [],
    error: false
}

export const codeReducer: Reducer<CountryState, ActionType<CountryActionPayloadType>> = (state= initalState, action): CountryState => {
    switch(action.type) {
        case COUNTRY_ACTIONS.UPSERT_COUNTRY_CODE: {
            return {
                ...state,
                loading: false,
                data: action.payload              
            }
        }
        case COUNTRY_ACTIONS.UPSERT_COUNTRY_FAIL: {
            return {
                ...state,
                data: [],
                loading: false,
                error: true
            }
        }
        default: {
            return state
        }
    }
}