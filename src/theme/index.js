import { createTheme as createMuiTheme } from '@mui/material';
import createPalette from './create-palette.js';
import createTypography from './create-typography'
import createFontFamily from './create-fontFamily.js';


function createTheme() {
    const palette = createPalette();
    const typography = createTypography();
    const fontFamily = createFontFamily();
    return createMuiTheme({
        palette,
        typography: {
            fontFamily,
            ...typography
        }
    });
}
const theme = createTheme();
export default theme;