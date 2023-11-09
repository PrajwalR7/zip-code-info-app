import { AppDispatch } from ".."
import { POSTAL_URL } from "../../utils/const"
import { UserDetails } from "./types"

export const enum USER_ACTIONS {
    UPSERT_USER_DATA = 'upsert-user-data',
    UPSERT_USER_FAIL = 'upsert-user-fail',
    UPDATED_SELECTED_COUNTRY_CODE = 'update-selected-country-code',
    RESET_USER_DETAILS = 'reset-user-details'
}

const successAction = (userData: UserDetails) => {
    return {
        type: USER_ACTIONS.UPSERT_USER_DATA,
        payload: userData
    }
}

const failAction = (msg: string) => {
    return {
        type: USER_ACTIONS.UPSERT_USER_FAIL,
        payload: msg
    }
}
export const updateSelectedCounrtryCode = (countryCode: {country: string, code: string}) => {
    return {
        type: USER_ACTIONS.UPDATED_SELECTED_COUNTRY_CODE,
        payload: countryCode
    }
}

export const resetUserDetails = () => {
    return {
        type: USER_ACTIONS.RESET_USER_DETAILS
    }
}

export const fetchUserDetails = (selectedCountryCode: string, postCode: string) => {
    return (dispatch: AppDispatch) => {
        fetch(`${POSTAL_URL}/${selectedCountryCode}/${postCode}`)
        .then(res => {
            return res.json()
        })
        .then((res: UserDetails) => {
            if (!Object.keys(res).length) {
                dispatch(failAction('Invalid PinCode'))
            } else {
                dispatch(successAction(res))
            }
        })
        .catch(err => {
            dispatch(failAction((err as Error).message))
        })
    }
}