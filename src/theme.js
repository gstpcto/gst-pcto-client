import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    type: 'light',
    palette: {
        primary: {
            main: blue[700] // "#03dac6",
        },
    },
});