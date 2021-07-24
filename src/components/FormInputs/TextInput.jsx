import React from 'react';
import { TextField } from '@material-ui/core';

export const TextInput = ({ id, value, label, required, inputType, onInputChange }) => (
  <TextField
    key={id}
    margin="dense"
    id={id}
    value={value}
    label={label}
    required={!!required}
    {...(required && { helperText: 'Required' })}
    {...(inputType && { inputType })} // TODO not req.?
    fullWidth
    onChange={(e) => onInputChange({ id, value: e.target.value })}
  />
);