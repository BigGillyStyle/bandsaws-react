import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

type PanelProps = React.PropsWithChildren<{
  header: string;
}>;

export function PanelMui({ header, children }: PanelProps) {
  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <Typography variant="subtitle2" component="div">
        {header}
      </Typography>
      {children}
    </Box>
  );
}
