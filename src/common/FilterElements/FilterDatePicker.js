import React from 'react';
import CDatePicker from '../CDatePicker';
import dayjs from 'dayjs';

const FilterDatePicker = ({ label, value, onChange }) => {
    return (
        <CDatePicker
            fieldLabel={label}
            size="small"
            value={value ? dayjs(value) : null}
            onChange={onChange}
            style={{
                mt: 0,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 10,
                },

            }}
            slotProps={{ textField: { size: 'small' } }}
        />
    );
};

export default FilterDatePicker;
