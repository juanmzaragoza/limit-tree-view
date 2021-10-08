import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {CircularProgress} from "@material-ui/core";


export default function MaterialSelector({
  id,
  label,
  items,
  onChange,
  selectFirstDefault,
  disabled = false,
  loading = false
}) {
  const [value, setValue] = React.useState('');
  const [elements, setElements] = React.useState([]);

  React.useEffect(() => {
    setElements(items);
    if(selectFirstDefault && items.length > 0) {
      setValue(items[0].value);
      onChange(items[0].value);
    }
  },[items, selectFirstDefault]);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {!loading && elements.map((item,key) =>
            <MenuItem key={key} value={item.value}>{item.label}</MenuItem>
          )}
          {!loading && !elements.length && <MenuItem disabled>No hay valores disponibles</MenuItem>}
          {loading && <MenuItem style={{display: "flex", justifyContent: "center"}}>
            <CircularProgress size={30} />
          </MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}