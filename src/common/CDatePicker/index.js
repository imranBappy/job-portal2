import { Box, FormHelperText, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function CDatePicker({
    placeholder,
    value,
    onChange,
    minDate,
    maxDate,
    label,
    style,
    size,
    error,
    disabled,
    boxStyle,
    fieldLabel,
    slotProps,
    views
}) {
    return (
        <Box sx={{ ...boxStyle }}>
            <Typography
                variant="bodyNormal"
                sx={{ fontWeight: 700, color: 'text.darkBlue' }}
            >
                {label}
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    placeholder={placeholder}
                    value={value}
                    label={fieldLabel}
                    onChange={onChange}
                    inputFormat="dd-MM-yyyy"
                    size="small"
                    views={views}
                    minDate={minDate}
                    maxDate={maxDate}
                    slotProps={slotProps}
                    sx={{
                        width: '100%',
                        mt: 1,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 10,
                        },
                        ...style,
                    }}
                    disabled={disabled ? disabled : false}
                />
            </LocalizationProvider>
            <FormHelperText sx={{ color: 'red', ml: '12px' }}>
                {error && error}
            </FormHelperText>
        </Box>
    );
}
