import { Reducer } from "redux"
import { ActionType } from "../../types"
import { UserDetails, UserState } from "./types"
import { USER_ACTIONS } from "./action"

const userState: UserState = {
    loading: true,
    data: {
        selectedCountry: {
            country: '',
            code: ''
        },
        country: '',
        'post code': '',
        places: []
    },
    error: false
}

export const userReducer: Reducer<UserState, ActionType<UserDetails | {country: string, code: string}>> = (state = userState, action): UserState => {
    switch(action.type) {
        case USER_ACTIONS.UPSERT_USER_DATA: {
            return {
                ...state,
                loading: false,
                data: {
                    ...action.payload as UserDetails,
                    selectedCountry: state.data.selectedCountry
                },
                error: false
            }
        }
        case USER_ACTIONS.UPSERT_USER_FAIL: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case USER_ACTIONS.UPDATED_SELECTED_COUNTRY_CODE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    selectedCountry: action.payload as {country: string, code: string}
                },
                error: false
            }
        }
        case USER_ACTIONS.RESET_USER_DETAILS: {
            return userState
        }
        default: return state
    }
}