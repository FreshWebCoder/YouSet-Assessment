import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5D5AFF",
      light: "#9896FF",
      dark: "#5754f2",
    },
    secondary: {
      main: "#b8b8b8",
      light: "#DCDCDC",
      dark: "#898989",
    },
  },
  overrides: {
    MuiContainer: {
      root: {
        marginTop: 15,
        marginBottom: 15
      }
    },
  }
});
