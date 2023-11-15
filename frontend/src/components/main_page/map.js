import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const position = [50.86079, 17.4674]

export default function MapView() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const [userPosition, setUserPosition] = useState(position)

  function success(pos) {
    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
    console.log("Your current position is:");
    console.log(userPosition)
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function FlyMapTo() {

    const map = useMap()

    useEffect(() => {
      map.flyTo(userPosition)
    }, [userPosition])


    return null
  }

  return (
    <MapContainer className="map" center={userPosition} zoom={14} scrollWheelZoom={true}>
      <FlyMapTo />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
