import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import * as L from "leaflet";
import { useContext, useEffect, useState } from 'react';
import { Marker, Popup } from "react-leaflet";
import mapPositionContext from '../../utils/mapcontext';
import ModalDetails from "./modal";


export default function DetailsMarker({ markerposition, restaurantname, restaurantid }){
    const LeafIcon = L.Icon.extend({
        options: {}
      });

      const blueIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
      }),
      greenIcon = new LeafIcon({
        iconUrl:
          "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
      });

    const [icon, setIcon] = useState(blueIcon);

    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);
    const { position } = useContext(mapPositionContext);

    const [restaurantId, setRestaurantId] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    useEffect(() => {
        setRestaurantName(restaurantname)
        setRestaurantId(restaurantid)
      }, [])


    useEffect(() => {
        if(markerposition.latitude == position[0] && markerposition.longtitude == position[1]){
            setIcon(blueIcon);
        }
        else{
            setIcon(greenIcon);
        }
    }, [position])

    return (
        <Marker position={[markerposition.latitude, markerposition.longtitude]} icon={icon} >
        <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
            <ModalDetails restaurantid={restaurantId} />
        </Modal>
            <Popup>
            {restaurantName} {restaurantId}
            <Button onClick={handleOpen}>More Details</Button>
            </Popup>
        </Marker>
    )
}
