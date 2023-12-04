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
  filterValue: string
}

export default function ResultsList({ filterValue }: Props) {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Array<Restaurant>>([])
  const { setPosition } = useContext(mapPositionContext);

  const getRestaurants = (namefilter: string) => {
    let baseUrl = `${config.API_URL}/restaurantnames/`
    let UrlWithNameFilter = namefilter ? baseUrl + `?name=${namefilter}` : baseUrl

    fetch(UrlWithNameFilter)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getRestaurants('')
  }, [])

  useEffect(() => {
    getRestaurants(filterValue)
  }, [filterValue])

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
