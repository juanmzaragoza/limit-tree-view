import {createTheme, ThemeProvider} from "@mui/material";
import { red } from "@mui/material/colors";

import { primaryColor, secondaryColor } from "utils/helper";
import 'App.css';
import Routes from "router";

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

  return (
    <div data-testid="App" className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
