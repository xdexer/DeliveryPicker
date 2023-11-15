import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import config from '../../config.json';
import { Restaurant } from '../../services/models';


interface Props {
  filterValue: string
}


export default function ResultsList({ filterValue }: Props) {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Array<Restaurant>>([])

  useEffect(() => {
    getRestaurants()
  }, [])

  const getRestaurants = () => {
    fetch(`${config.API_URL}/restaurantnames/`)
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
    setFilteredRestaurants(filterRestaurants())
  }, [filterValue])

  const filterRestaurants = () => {
    const filteredArray = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(filterValue.toLowerCase()))
    return filteredArray
  }

  return (
    <div>
      <List>
        {filteredRestaurants.map((restaurant) => (
          <ListItem key={restaurant.id} disablePadding>
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
