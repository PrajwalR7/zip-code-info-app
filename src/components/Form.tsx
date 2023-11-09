import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { CountryState } from "../store/countryCode/types";
import { fetchUserDetails, updateSelectedCounrtryCode } from "../store/user/action";
import { useState } from 'react';

export function Form() {
    const [postalCode, setPostalCode] = useState<string>("");
    const countryData = useSelector<AppState, CountryState>((state) => state.countryCode);
    const selectedCountry = useSelector<AppState, {country: string, code: string}>(
        (state) => state.userData.data.selectedCountry
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countryData.data.find(
            (country) => country.country === e.target.value
        );
        dispatch(updateSelectedCounrtryCode(selectedCountry ?? {country: 'India', code: 'IN'}));
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(e.target.value);
    };

    const handleSubmit = () => {
        setPostalCode("");
        dispatch(fetchUserDetails(selectedCountry.code, postalCode));
    };

    return (
        <div className="max-w-md mx-auto bg-[#2f374d] p-8 rounded-lg shadow-md">
            <select
                value={selectedCountry.country ?? ''}
                className="w-full bg-blue-500 text-white p-3 rounded mb-4 focus:border-none"
                onChange={handleSelectChange}
            >
                <option className="bg-white text-black" value="" disabled selected>
                    Select a country
                </option>
                {countryData.data.map((country) => (
                    <option className="bg-white text-black" key={country.country} value={country.country}>
                        {country.country}
                    </option>
                ))}
            </select>

            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded mb-4 text-black"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={handlePostalCodeChange}
            />

            <button
                disabled={!(selectedCountry && postalCode.length)}
                className="w-full bg-green-500 text-white p-2 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
