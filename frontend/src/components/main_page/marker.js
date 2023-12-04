import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Marker, Popup } from "react-leaflet";
import ModalDetails from "./modal";


export default function DetailsMarker({ position, restaurantname, restaurantid }){
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const [restaurantId, setRestaurantId] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    useEffect(() => {
        setRestaurantName(restaurantname)
        setRestaurantId(restaurantid)
      }, [])

    return (
        <Marker position={[position.latitude, position.longtitude]}>
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
