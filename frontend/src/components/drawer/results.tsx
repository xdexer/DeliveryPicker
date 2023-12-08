import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useEffect, useState } from 'react';
import config from '../../config.json';
import { Restaurant } from '../../services/models';
import mapPositionContext from '../../utils/mapcontext';
interface Props {
  filterValue: string,
  distance: string
}

export default function ResultsList({ filterValue, distance }: Props) {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([])
  const [userPosition, setUserPosition] = useState([50.86079, 17.4674])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Array<Restaurant>>([])
  const { setPosition } = useContext(mapPositionContext);

  const getRestaurants = (namefilter: string, distancefilter: string) => {
    let baseUrl = `${config.API_URL}/restaurantnames/?`
    baseUrl = namefilter ? baseUrl + `name=${namefilter}&` : baseUrl
    baseUrl = Number(distancefilter) > 0 ? baseUrl + `radius=${distance}&user_lon=${userPosition[1]}&user_lat=${userPosition[0]}` : baseUrl
    console.log(baseUrl)
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function success(pos: any) {
    setUserPosition([pos.coords.latitude, pos.coords.longitude]);
  }

  function errors(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors);
          }
        });
    }
  }, []);

  useEffect(() => {
    getRestaurants(filterValue, distance)
  }, [filterValue, distance])

  const setFlyMapContext = (restaurant: Restaurant) => {
    console.log(restaurant.id, restaurant.location_id.latitude, restaurant.location_id.longtitude)
    setPosition([restaurant.location_id.latitude, restaurant.location_id.longtitude])
  }

  return (
    <div>
      <List>
        {filteredRestaurants.map((restaurant) => (
          <ListItem key={restaurant.id} onClick={() => setFlyMapContext(restaurant)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={restaurant.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
