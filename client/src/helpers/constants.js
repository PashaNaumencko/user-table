import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  phone: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      'Phone number is not valid'
    )
    .required('Required'),
  gender: Yup.string(),
  age: Yup.string()
    .matches(
      /^\d+$/,
      'Age should be a positive number'
    )
    .max(3, 'Very large value')
    .test('age', 'Age should be non-zero value', value => Number(value) !== 0)
    .required('Required'),
});

export const countryCodeOptions = [
  { key: 'ua', text: '+38', value: '+38' },
  { key: 'rus', text: '+7', value: '+7' },
  { key: 'usa', text: '+1', value: '+1' },
  { key: 'gm', text: '+49', value: '+49' },
  { key: 'bel', text: '+375', value: '+375' },
  { key: 'pl', text: '+48', value: '+48' },
  { key: 'ltv', text: '+371', value: '+371' },
  { key: 'lith', text: '+370', value: '+370' },
];
