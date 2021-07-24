import React, { useState, useEffect } from 'react';

// TODO:
// 2. styling
// 3. load 2 seconds
// 7. document
// 8. lint
// 9. snackbar on submit
// 10. errors on change

import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Button,
  Grid,
  Paper,
} from '@material-ui/core';

import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons';

import {
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_RADIO,
  INPUT_TYPE_SELECT,
  LOCAL_STORAGE_SURVEY_KEY,
} from '../constants';

// todo rename file
import { SURVEY_CONFIG } from '../formConfig';

import {
  getInitialFormState,
  getDisplayValue,
} from '../utils';

import {
  TextInput,
  SelectInput,
  RadioInput,
  CheckboxInput,
} from '.';

const useStyles = makeStyles(({ spacing }) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(4),
  },
  summaryItem: {
    padding: spacing(2),
    height: '100%',
  },
}));

export const Survey = ({ setIsSubmitted }) => {
  const classes = useStyles();

  const {
    activeSlideIndex: initialActiveSlideIndex = 0,
    formData: initialFormData = {},
  } = getInitialFormState();

  const [activeSlideIndex, setActiveSlideIndex] = useState(initialActiveSlideIndex);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // if (!isSubmitted) {
      const payload = {
        activeSlideIndex,
        formData,
      };
      localStorage.setItem(LOCAL_STORAGE_SURVEY_KEY, JSON.stringify(payload));
    // }
  }, [activeSlideIndex, formData]);

  const onInputChange = ({ id, value }) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const onToggleCheckbox = ({ checked, id, value }) => {
    const prev = formData[id] || [];
    if (checked) {
      setFormData({
        ...formData,
        [id]: [...prev, value],
      });
    } else {
      setFormData({
        ...formData,
        [id]: prev.filter((prevValue) => prevValue !== value),
      });
    }
  };

  const onSubmit = () => {
    // In real life - post form data
    // Wrap in try/catch, handle errors

    setIsSubmitted(true);

    const payload = {
      isSubmitted: true,
    };
    localStorage.setItem(LOCAL_STORAGE_SURVEY_KEY, JSON.stringify(payload));

    // TODO snackbar callback
  };

  const getIsNextButtonDisabled = () => {
    const currentFields = SURVEY_CONFIG[activeSlideIndex];
    const areAllRequiredFieldsFilled = currentFields
      .filter(({ required }) => required)
      .every(({ id }) => {
        const value = formData[id];
        if (Array.isArray(value)) return value.length;
        return !!value;
      });
    return !areAllRequiredFieldsFilled;
  };

  return (
    /* open = isSubmitted? */
    <Dialog open>
      <DialogTitle id="form-dialog-title">Hi there!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please answer this 1 minute survey so we can get to know you better.
        </DialogContentText>
        {(activeSlideIndex < SURVEY_CONFIG.length) && (
          SURVEY_CONFIG[activeSlideIndex].map(({
            type, id, label, inputType, options, required,
          }) => {
            if (type === INPUT_TYPE_TEXT) {
              return (
                <TextInput
                  key={id}
                  id={id}
                  value={formData[id] || ''}
                  label={label}
                  required={required}
                  inputType={inputType}
                  onInputChange={onInputChange}
                />
              );
            }

            if (type === INPUT_TYPE_SELECT) {
              return (
                <SelectInput
                  key={id}
                  id={id}
                  value={formData[id] || ''}
                  label={label}
                  required={required}
                  onInputChange={onInputChange}
                  options={options}
                />
              );
            }

            if (type === INPUT_TYPE_RADIO) {
              return (
                <RadioInput
                  key={id}
                  id={id}
                  value={formData[id] || ''}
                  label={label}
                  required={required}
                  onInputChange={onInputChange}
                  options={options}
                />
              );
            }

            if (type === INPUT_TYPE_CHECKBOX) {
              return (
                <CheckboxInput
                  key={id}
                  id={id}
                  value={formData[id] || []}
                  label={label}
                  required={required}
                  onToggleCheckbox={onToggleCheckbox}
                  options={options}
                />
              );
            }

            return null;
          })
        )}
        {(activeSlideIndex === SURVEY_CONFIG.length) && (
          <>
            <div>Summary</div>
            <Grid container>
              {SURVEY_CONFIG.flat().map(({ id, label, options }) => (
                <React.Fragment key={id}>
                  <Grid item xs={4}>
                    <Paper square className={classes.summaryItem}>{label}</Paper>
                  </Grid>
                  <Grid item xs={8}>
                    <Paper
                      square
                      className={classes.summaryItem}
                    >
                      {getDisplayValue({ options, value: formData[id] })}
                    </Paper>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </>
        )}
        <div className={classes.buttonContainer}>
          <IconButton
            disabled={activeSlideIndex === 0}
            onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
          >
            <ArrowBackIos />
          </IconButton>
          {activeSlideIndex < SURVEY_CONFIG.length ? (
            <IconButton
              disabled={getIsNextButtonDisabled()}
              onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
            >
              <ArrowForwardIos />
            </IconButton>
          ) : (
            <Button onClick={onSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
