export interface CountryData {
    name: string,
    Iso2: string,
    Iso3: string
}

export interface ResponseType {
    error: boolean,
    msg: string,
    data: CountryData[]
}

export type CountryActionPayloadType = Array<{country: string, code: string}>

export type CountryState = {
    loading: boolean,
    data: CountryActionPayloadType,
    error: boolean
}
