export interface UserDetails {
    selectedCountry: {
        country: string,
        code: string
    }
    country: string,
    'post code': string,
    places: Array<{
        'place name': string,
        longitude: string,
        state: string,
        'state abbreviation': string,
        latitude: string
    }>
}

export interface UserState {
    loading: boolean,
    data: UserDetails,
    error: boolean
}