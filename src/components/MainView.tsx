import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../store/user/types";
import { AppDispatch, AppState } from "../store";
import { Form } from "./Form";
import { MapComponent } from "./MapComponent";
import { resetUserDetails } from "../store/user/action";

export function MainView() {
    const userData = useSelector<AppState, UserState>(state => state.userData)
    const dispatch = useDispatch<AppDispatch>()
    const handleClear = () => {
        dispatch(resetUserDetails())
    }
    return (
        <div className="min-h-screen w-[100%] font-montserrat flex flex-col items-center bg-gradient-to-b from-[#7F7FD5] to-[#91EAE4] text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Zip Code Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 grid-rows-1 p-12 flex-grow w-[100%]">
                <div className=" rounded-lg bg-[#1c2130] shadow-lg h-full p-14 flex flex-col items-center">
                    <h2 className="text-2xl text-center font-semibold mb-6 text-white">Enter User Details</h2>
                    <Form />
                    {!userData.loading && userData.error && (
                        <div className="mt-12 p-4 border rounded-lg border-red-500 bg-red-100 text-red-800">
                            <h2 className="text-2xl mb-4">Error:</h2>
                            <p>Something went wrong. <strong>Please check your postal code and selected country.</strong></p>
                        </div>
                    )}
                    {!userData.loading && !userData.error && (
                        <div className="mt-12 flex flex-col p-4 border border-[#2f374d] rounded-lg shadow-lg bg-[#2f374d] w-full">
                            <h2 className="text-1xl font-semibold mb-4 text-white">State: <em>{userData.data.places[0].state}</em></h2>
                            <hr />
                            <ul className="list-disc pl-6 pt-4">
                                {userData.data.places.map((place, index) => (
                                    <li key={index} className="mb-3 list-none">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center mr-3">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-md font-semibold text-gray-100">{place['place name']}</h3>
                                                <p className="font-light text-gray-300">Latitude: {place.latitude}, Longitude: {place.longitude}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="w-[20%] bg-green-500 text-white p-2 rounded self-end"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                        </div>  
                    )}
                </div>

                <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-full flex-grow">
                    <h2 className="text-2xl text-center font-semibold mb-4 text-black">User Locations</h2>
                    <MapComponent />
                </div>
            </div>
        </div>
    );
}
