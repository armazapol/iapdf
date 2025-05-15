'use client';
import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, Box } from '@mui/material';
import { es } from 'date-fns/locale';

export default function MonthRangePicker() {
  const [value, setValue] = React.useState<[Date | null, Date | null]>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DateRangePicker
        views={['year', 'month']}
        startText="Desde"
        endText="Hasta"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField {...startProps} />
            <TextField {...endProps} />
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}