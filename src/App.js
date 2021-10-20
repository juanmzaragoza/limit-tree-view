import {createTheme, ThemeProvider} from "@mui/material";
import { red } from "@mui/material/colors";
import {IntlProvider} from "react-intl";

import 'App.css';
import Routes from "router";
import { primaryColor, resourcesColor, secondaryColor } from "utils/helper";
import {login, refresh} from "./utils/before-login-helper";


function App() {
  let theme = createTheme({
    typography: {
      fontFamily: "'Poppins', 'Helvetica', sans-serif",
    },
    palette: {
      type: "light",
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      error: {
        main: red.A400,
      },
      info: {
        main: resourcesColor,
      }
    },

    
  });
  login();
  refresh();
 
  return (
    <div data-testid="App" className="App">
      <ThemeProvider theme={theme}>
        <IntlProvider locale={'de'}>
          <Routes />
        </IntlProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
