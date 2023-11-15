import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

const distance_options = [
    {label: '+1 km', value: 1},
    {label: '+2 km', value: 2},
    {label: '+5 km', value: 5},
    {label: '+10 km', value: 10},
    {label: '+15 km', value: 15},
    {label: '+20 km', value: 20},
    {label: 'any km', value: 0}
]

export default function DistanceVariants() {
  const [distance, setDistance] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDistance(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Distance</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={distance}
          onChange={handleChange}
          label="Distance"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {distance_options.map((distance) => (
        <MenuItem value={distance.value}><em>{distance.label}</em></MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
}
