import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from 'react';
import { useRange } from 'react-instantsearch';

export default function RangeSliderMui(props) {
  const { start, range, canRefine, refine } = useRange(props);
  const { min, max } = range;
  const [value, setValue] = useState([min, max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: Event, value: number | number[]) => {
    console.log(
      '🚀 ~ file: RangeSliderMui.tsx:35 ~ handleChangeCommitted ~ value:',
      props.attribute,
      value
    );
    refine(value as [number, number]);
  };

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

  useEffect(() => {
    setValue([from, to]);
  }, [from, to]);

  return (
    <Slider
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
      disabled={!canRefine}
      valueLabelDisplay="on"
      sx={{
        marginTop: '2rem',
        marginBottom: '0.5rem',
      }}
    />
  );
}
