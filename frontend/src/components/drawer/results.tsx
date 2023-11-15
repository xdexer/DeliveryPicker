import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
const results = [
    {label: 'Pizza Hut', value: 1},
    {label: 'McDonalds', value: 2},
    {label: 'KFC', value: 3},
    {label: 'Starbucks', value: 4}
]

export default function ResultsList() {
  return (
    <div>
        <List>
          {results.map((result) => (
            <ListItem key={result.value} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={result.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </div>
  );
}
