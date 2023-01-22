import { object, string } from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const newAccountSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email().required('Email is required'),
  phone: string()
    .required('Phone number is required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10)
    .max(10),
  streetAddress: string().required('Street Address is required'),
  streetAddress2: string(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zipCode: string()
    .required('Zip code is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
})

export default newAccountSchema
