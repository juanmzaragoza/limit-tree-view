import {createTheme, ThemeProvider} from "@mui/material";
import { red } from "@mui/material/colors";

import 'App.css';
import Routes from "router";
import { primaryColor, secondaryColor } from "utils/helper";
import {login} from "./utils/before-login-helper";

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
    },
  });
  login();
  return (
    <div data-testid="App" className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
