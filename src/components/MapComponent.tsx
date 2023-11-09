import { useSelector } from "react-redux"
import { AppState } from "../store"
import { UserState } from "../store/user/types"
import { Map, Marker } from "pigeon-maps"

export function MapComponent() {
    const defaultMapCoordinates = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
    const userData = useSelector<AppState, UserState>(state => state.userData)
    const updatedCenter = !userData.loading && !userData.error ? {
        center: {
            lat:parseFloat(userData.data.places[0].latitude),
            lng: parseFloat(userData.data.places[0].longitude)
        }
     } : defaultMapCoordinates
    return (
        <div style={{ width: "100%", height: "90%" }}>
            <Map
                animate={true}
                center={[updatedCenter.center.lat, updatedCenter.center.lng]}
                defaultZoom={defaultMapCoordinates.zoom}
            >
                {!userData.error ? userData.data.places.map((place, index) => {
                    return (
                        <Marker 
                            key={index}
                            hover={true}
                            width={50}
                            anchor={[parseFloat(place.latitude), parseFloat(place.longitude)]}
                        />
                    )
                }) : null}
            </Map>
        </div>
    )
}