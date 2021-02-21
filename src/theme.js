import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: blue[700], // "#03dac6",
        },
        secondary: {
            main: red[700],
        },
    },
});