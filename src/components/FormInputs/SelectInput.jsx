import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from '@material-ui/core';

export const SelectInput = ({ id, value, label, required, options, onInputChange }) => (
  <FormControl required={!!required} key={id}>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      labelId={`${id}-label`}
      id={id}
      fullWidth
      value={value}
      onChange={(e) => onInputChange({ id, value: e.target.value })}
    >
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <MenuItem value={optionValue} key={optionValue}>{optionLabel}</MenuItem>
      ))}
    </Select>
    {required && <FormHelperText>Required</FormHelperText>}
  </FormControl>
);