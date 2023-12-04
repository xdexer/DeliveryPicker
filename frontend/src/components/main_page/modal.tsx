import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import config from '../../config.json';
import { Restaurant } from '../../services/models';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface Props {
  restaurantid: number
}

export default function ModalDetails({ restaurantid }: Props){
    const [restaurantId, setRestaurantId] = useState(0)

    const [restaurantDetails, setRestaurantDetails] = useState<Restaurant>({
        name: '',
        id: 0,
        promotion_id: {
            id: 0,
            details: '',
            valid_until: ''
        },
        location_id: {
            id: 0,
            street: '',
            city: '',
            latitude: '',
            longtitude: ''
        }
    });

    const getRestaurantDetails = (restaurant_id: number) => {
        fetch(`${config.API_URL}/restaurants/${restaurant_id}/`)
          .then((response) => response.json())
          .then((data) => {
            setRestaurantDetails(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      useEffect(() => {
        setRestaurantId(restaurantid)
        getRestaurantDetails(restaurantid)
      }, [])

    return (
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {restaurantDetails.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Location: {restaurantDetails.location_id.city} {restaurantDetails.location_id.street}
                <br />
                Promotion:
                {/* {restaurantDetails.promotion_id} */}
            </Typography>
            </Box>
    )
}
