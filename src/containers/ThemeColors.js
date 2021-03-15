import { createMuiTheme } from '@material-ui/core/styles';

const themeColors = createMuiTheme({
    palette: {
      primary: {
        light: '#4AFFAC',
        main: '#49B6FF',
        dark: '#4A79FF',
        contrastText: '#fff',
      },
      secondary: {
        light: '#F2D1EC',
        main: '#D460BE',
        dark: '#671C59',
        contrastText: '#8A838D',
      },
    },
  });

export default themeColors
