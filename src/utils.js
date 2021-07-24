// TODO JSDOC
import { LOCAL_STORAGE_SURVEY_KEY } from './constants';

export const getInitialFormState = () => {
  const initialSurveyState = localStorage.getItem(LOCAL_STORAGE_SURVEY_KEY);
  return initialSurveyState ? JSON.parse(initialSurveyState) : {};
};

const getLabelForValue = (options, value) => {
  const { label } = options.find(({ value: optionValue }) => optionValue === value);
  return label;
};

export const getDisplayValue = ({ options, value }) => {
  if (!options) return value;
  if (Array.isArray(value)) {
    return value
      .reduce((acc, v) => {
        const label = getLabelForValue(options, v);
        return [...acc, label];
      }, [])
      .join(', ');
  }
  return getLabelForValue(options, value);
};
