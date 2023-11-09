import { CODE_URL } from "../../utils/const"
import { ActionType } from "../../types"
import { AppDispatch } from ".."
import { CountryActionPayloadType, ResponseType } from "./types"

export enum COUNTRY_ACTIONS {
    UPSERT_COUNTRY_CODE = 'upsert-country-code',
    UPSERT_COUNTRY_FAIL = 'upsert-country-fail'
}

const failAction = (msg: string): ActionType<string> => {
    return {
        type: COUNTRY_ACTIONS.UPSERT_COUNTRY_FAIL,
        payload: msg
    } 
}

const successAction = (countryCode: CountryActionPayloadType): ActionType<CountryActionPayloadType>  => {
    return {
        type: COUNTRY_ACTIONS.UPSERT_COUNTRY_CODE,
        payload: countryCode
    }
}

export const getCountryCodes = () => {
    return (dispatch: AppDispatch) => {
        fetch(CODE_URL)
        .then(res => res.json())
        .then((res: ResponseType) => {
            const { data, error, msg } = res
            if (error) {
                dispatch(failAction(msg))
            }
            const countryCode = data.map(entry => {
                return {
                    country: entry.name,
                    code: entry.Iso2
                }
            })
            dispatch(successAction(countryCode))
        })
        .catch(err => {
            dispatch(failAction((err as Error).message))
        })
    }
}