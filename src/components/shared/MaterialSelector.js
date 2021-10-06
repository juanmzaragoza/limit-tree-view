import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function MaterialSelector({ id, label, items, onChange, selectFirstDefault }) {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if(selectFirstDefault && items.length > 0) {
      setValue(items[0].value);
      onChange(items[0].value);
    }
  },[items, selectFirstDefault, onChange]);

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
      
        >
          {items.map((item,key) =>
            <MenuItem key={key} value={item.value}>{item.label}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Box>
  );
}