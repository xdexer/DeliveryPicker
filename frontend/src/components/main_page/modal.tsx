import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import config from '../../config.json';
import { DeliveryPicker, RestaurantDetails } from '../../services/models';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
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

    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails>({
        name: '',
        id: 0,
        promotion_id: {
            id: 0,
            details: '',
            valid_until: ''
        },
        cuisine_id: [],
        location_id: {
            id: 0,
            street: '',
            city: '',
            latitude: '',
            longtitude: ''
        }
    });

    const [deliveryPickerDetails, setDeliveryPickerDetails] = useState<Array<DeliveryPicker>>([])

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

      const getDeliveryPickerDetails = (restaurant_id: number) => {
        fetch(`${config.API_URL}/deliverypicker/?restaurant_id=${restaurant_id}`)
          .then((response) => response.json())
          .then((data) => {
            setDeliveryPickerDetails(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      useEffect(() => {
        setRestaurantId(restaurantid)
        getRestaurantDetails(restaurantid)
        getDeliveryPickerDetails(restaurantid)
      }, [])

    return (
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h4">
                {restaurantDetails.name}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Stack direction="row" spacing={1}>
                Tags: {restaurantDetails.cuisine_id.map((cuisine) => (
                  <Chip label={cuisine.name} variant="filled" />
                ))}
              </Stack>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Location: {restaurantDetails.location_id.city} {restaurantDetails.location_id.street}
                <br />
                Promotions:
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Delivery Option</TableCell>
                      <TableCell align="right">Promotion</TableCell>
                      <TableCell align="right">Delivery Cost</TableCell>
                      <TableCell align="right">Service Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deliveryPickerDetails.map((deliverypicker) => (
                      <TableRow
                        key={deliverypicker.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {deliverypicker.name.toUpperCase()}
                        </TableCell>
                        <TableCell align="right">{deliverypicker.promotion_id.details} | {deliverypicker.promotion_id.valid_until}</TableCell>
                        <TableCell align="right">{(deliverypicker.delivery_cost / 100).toFixed(2)} PLN</TableCell>
                        <TableCell align="right">{(deliverypicker.service_cost / 100).toFixed(2)} PLN</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </Typography>
            </Box>
    )
}
