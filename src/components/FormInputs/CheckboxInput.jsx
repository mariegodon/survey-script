import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';

export const CheckboxInput = ({
  id, value, label, required, options, onToggleCheckbox,
}) => (
  <FormControl required={!!required} component="fieldset" key={id}>
    <FormLabel component="legend">{label}</FormLabel>
    <FormGroup aria-label="position" row>
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <FormControlLabel
          key={optionValue}
          control={(
            <Checkbox
              name={optionValue}
              checked={!!value.find((v) => v === optionValue)}
              onChange={(e) => {
                onToggleCheckbox({ checked: e.target.checked, id, value: optionValue });
              }}
            />
        )}
          label={optionLabel}
        />
      ))}
    </FormGroup>
    {required && <FormHelperText>Required</FormHelperText>}
  </FormControl>
);
