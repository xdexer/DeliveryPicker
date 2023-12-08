
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import config from '../../config.json';
import mapPositionContext from '../../utils/mapcontext';
import DetailsMarker from './marker';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const [userPosition, setUserPosition] = useState([50.86079, 17.4674])
  const { position, setPosition } = useContext(mapPositionContext)
  const [restaurants, setRestaurants] = useState([])

  function success(pos) {
    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
        });
    }
  }, []);

  useEffect(() => {
    getRestaurants()
  }, [])

  useEffect(() => {
    setPosition(userPosition)
  }, [userPosition])

  function FlyMapTo() {
    const map = useMap()
    useEffect(() => {
      map.flyTo(position)
    }, [position])
    return null
  }

  const getRestaurants = () => {
    fetch(`${config.API_URL}/restaurantnames/`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <MapContainer className="map" center={userPosition} zoom={16} scrollWheelZoom={true}>
      <FlyMapTo />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {restaurants.map((restaurant) => (
        <DetailsMarker markerposition={restaurant.location_id} restaurantname={restaurant.name} restaurantid={restaurant.id}/>
      ))}
    </MapContainer>
  );
}
