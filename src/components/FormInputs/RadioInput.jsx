import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

export const RadioInput = ({
  id, value, label, required, options, onInputChange,
}) => (
  <FormControl required={!!required} component="fieldset" key={id}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      aria-label={label}
      name={id}
      value={value}
      onChange={(e) => onInputChange({ id, value: e.target.value })}
    >
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <FormControlLabel
          key={optionValue}
          value={optionValue}
          control={<Radio />}
          label={optionLabel}
        />
      ))}
    </RadioGroup>
    {required && <FormHelperText>Required</FormHelperText>}
  </FormControl>
);
