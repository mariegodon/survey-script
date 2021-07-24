import {
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_RADIO,
  INPUT_TYPE_SELECT,
} from './constants';

const IDENTITY = [
  {
    type: INPUT_TYPE_TEXT,
    id: 'name',
    label: 'Name',
  },
  {
    type: INPUT_TYPE_TEXT,
    id: 'email',
    label: 'Email',
    inputType: 'email',
  },
];

const DETAILS = [
  {
    type: INPUT_TYPE_SELECT,
    id: 'age',
    label: 'Age',
    options: [...new Array(83)].map((_, i) => ({ value: 100 - i, label: 100 - i })).reverse(),
    required: true,
  },
  {
    type: INPUT_TYPE_RADIO,
    id: 'gender',
    label: 'Gender',
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'nonbinary',
        label: 'Non-binary',
      },
    ],
    required: true,
  },
];

const FAVORITES = [
  {
    type: INPUT_TYPE_TEXT,
    id: 'book',
    label: 'Favorite Book',
    required: true,
  },
  {
    type: INPUT_TYPE_CHECKBOX,
    id: 'colors',
    label: 'Favorite Colors',
    options: [
      {
        value: 'red',
        label: 'Red',
      },
      {
        value: 'orange',
        label: 'Orange',
      },
      {
        value: 'yellow',
        label: 'Yellow',
      },
      {
        value: 'green',
        label: 'Green',
      },
      {
        value: 'blue',
        label: 'Blue',
      },
      {
        value: 'purple',
        label: 'Purple',
      },
    ],
    required: true,
  },
];

export const SURVEY_CONFIG = [IDENTITY, DETAILS, FAVORITES];
