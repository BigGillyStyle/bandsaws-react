import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { useSortBy, UseSortByProps } from 'react-instantsearch';

export default function SortByMui(props: UseSortByProps) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <Select
      onChange={(event) => refine(event.target.value)}
      value={currentRefinement}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
