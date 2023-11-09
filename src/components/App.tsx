import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryCodes } from "../store/countryCode/action";
import { AppDispatch, AppState } from "../store";
import { CountryState } from "../store/countryCode/types";
import { MainView } from "./MainView";
import { FaSpinner } from "react-icons/fa";


export function App() {
    const countries = useSelector<AppState, CountryState>((state) => state.countryCode);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCountryCodes());
    }, []);

    return (
        <div className="min-h-screen w-[100%] flex items-center justify-center">
            {countries.loading ? (
                <div className="text-center flex justify-center items-center flex-col">
                    <FaSpinner className="animate-spin text-7xl text-blue-500 mb-4" />
                    <p className="text-1xl text-gray-700">Fetching Country Codes...</p>
                </div>
            ) : (
                <MainView />
            )}
        </div>
    );
}
