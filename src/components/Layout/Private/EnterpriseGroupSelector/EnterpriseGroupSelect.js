import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { injectIntl } from "react-intl";

import { Autocomplete } from "@mui/material";
import { TextField } from "@material-ui/core";
import { Domain, Build } from "@mui/icons-material";

import { getObjectFrom, setObjectOn } from "utils/storage";
import { useAuth } from "contexts/AuthContext";
import "./_styles.css";

const ENTERPRISE_TYPE = "enterprise";
const MODULE_TYPE = "module";
const ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY = "enterprise_group";

const EnterpriseGroupSelect = ({ loading, tree, actions, ...props }) => {
  const { refreshSession, isTokenRefreshed } = useAuth();
  const [value, setValue] = useState(null);
  const [opts, setOpts] = useState([]);

  // load all tree data
  useEffect(() => {
    actions.loadTree();
  }, []);

  // after tree loaded => render options, get selected group and fire load modules
  useEffect(() => {
    const options = [];
    for (const enterprise of tree) {
      options.push({
        id: enterprise.id,
        type: ENTERPRISE_TYPE,
        title: enterprise.descripcio,
        value: enterprise,
        isAdmin: enterprise.hasAdminPermission,
      });
      for (const module of enterprise.empreses) {
        if (module.activa)
          options.push({
            id: module.id,
            type: MODULE_TYPE,
            title: module.nom,
            enterprise,
            value: module,
          });
      }
    }
    setOpts(options);
    if (tree.length > 0) {
      const enterpriseGroup = getObjectFrom(
        ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY
      );
      if (enterpriseGroup) {
        setValue(enterpriseGroup);
        types[enterpriseGroup.type].setValue(value);
      }
    }
  }, [tree]);

  // is not executed until token is refreshed
  useEffect(() => {
    if (value && isTokenRefreshed) types[value.type].setValue(value);
  }, [value, isTokenRefreshed]);

  // saves the selected value in localStorage
  const setSelectedValue = (value) => {
    setValue(value);
    setObjectOn(ENTERPRISE_GROUP_VALUE_LOCALSTORAGE_KEY, value);
  };

  const types = {
    [ENTERPRISE_TYPE]: {
      onChange: (newValue) => {
        //TODO() dispatch change enterprise
        console.log("TODO(): dispatch change enterprise");
        setSelectedValue(newValue);
      },
      render: (props, option) => (
        <div
          key={option.id}
          {...props}
          className={"enterprise-items-container"}
        >
          <div>
            <Domain fontSize="small" />
          </div>
          <div className={"enterprise-items-title"}>{option.title}</div>
          {option.isAdmin && (
            <div className={"enterprise-items-icon-right"}>
              <Build />
            </div>
          )}
        </div>
      ),
      optionLabel: (option) => `${option.title} / _`,
      setValue: (option) => {
        console.log(option);
        actions.loadProjects({});
      },
    },
    [MODULE_TYPE]: {
      onChange: (newValue) => {
        // refresh token
        refreshSession({
          id: newValue.enterprise.id,
          enterprise: newValue.value.id,
        });
        // and load modules
        setSelectedValue(newValue);
      },
      render: (props, option) => (
        <div key={option.id} className={"module-items-container"} {...props}>
          <div>{option.title}</div>
        </div>
      ),
      optionLabel: (option) =>
        `${option.enterprise.descripcio} / ${option.title}`,
      setValue: () => {
        // on select option -> do something
        actions.loadProjects({});
        actions.resetSelectedProject();
        actions.resetPeriod();
        actions.resetTree();
      },
    },
  };

  return (
    <React.Fragment>
      <Autocomplete
        id={"enterprise-group"}
        className={"enterprise-selector-container"}
        handleHomeEndKeys
        disableClearable
        autoHighlight
        options={opts}
        loading={loading}
        value={value}
        onChange={(e, newValue) => {
          return types[newValue.type].onChange(newValue);
        }}
        getOptionLabel={(option) => {
          return types[option.type].optionLabel(option);
        }}
        renderOption={(props, option) => {
          return types[option.type].render(props, option);
        }}
        noOptionsText={"No hay opciones disponibles"}
        loadingText={"Cargando..."}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"Enterprise's Group"}
            variant={props.variant ? props.variant : "outlined"}
            required={props.required}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </React.Fragment>
  );
};

export default compose(injectIntl)(EnterpriseGroupSelect);
