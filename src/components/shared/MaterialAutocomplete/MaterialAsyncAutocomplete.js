import * as React from "react";
import { useState } from "react";
import { isEqual } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const MaterialAsyncAutocomplete = ({
  id = "asynchronous",
  label,
  variant = "standard",
  loading = false,
  items = [],
  onChange = () => {},
  onSearch = () => {},
}) => {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [active, setActive] = useState(true);
  const loadingComponent = (open && options.length === 0) || loading;

  React.useEffect(() => {
    setActive(true);

    if (!loadingComponent) {
      return undefined;
    }

    return () => {
      setActive(false);
    };
  }, [loadingComponent]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    } else {
      setOptions([...items]);
    }
  }, [open]);

  React.useEffect(() => {
    if (active) {
      setOptions([...items]);
    }
  }, [items]);

  const handleChange = (e, v, d) => {
    setValue(v);
    onChange(e, v, d);
  };

  let timer;
  const handleInputChange = (e, v, r) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (r !== "reset") {
        onSearch(e, v, r);
      }
    }, 1000);
  };

  return (
    <React.Fragment>
      <Autocomplete
        id={id}
        value={value}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => {
          if (!option) return "";
          return option.label;
        }}
        isOptionEqualToValue={(option, value) => isEqual(option, value)}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        loading={loadingComponent}
        loadingText={"Cargando..."}
        noOptionsText={"No hay opciones disponibles"}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingComponent ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
              autoComplete: "off",
            }}
          />
        )}
      />
    </React.Fragment>
  );
};

export default MaterialAsyncAutocomplete;
