import { Field, Formik } from 'formik'
import React from 'react'
import User from '../../../interfaces/User'

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (user: User) => void
  user: User
}

const Form = ({ handleChange, handleSubmit, user }: Props) => {
  const {
    id,
    firstName,
    lastName,
    userName,
    email,
    phone,
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode,
    isAdmin
  } = user
  return (
    <Formik
      initialValues={{
        id,
        userName,
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        streetAddress2,
        city,
        state,
        zipCode,
        isAdmin
      }}
      onSubmit={async (values: User) => {
        handleSubmit(values)
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <div>
              <label htmlFor='firstName'>First Name</label>
              <Field
                type='text'
                name='firstName'
                value={values.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='name'>Last Name</label>
              <Field
                type='text'
                name='lastName'
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Field
              type='text'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='streetAddress'>Street Address </label>
            <Field
              type='text'
              name='streetAddress'
              value={values.streetAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='streetAddress2'>Street Address 2</label>
            <Field
              type='text'
              name='streetAddress2'
              value={values.streetAddress2}
              onChange={handleChange}
            />
          </div>
          <div className='flex'>
            <div>
              <label htmlFor='city'>City</label>
              <Field
                type='text'
                name='city'
                value={values.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <Field
                type='text'
                name='state'
                value={values.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='zipCode'>Zip Code</label>
              <Field
                type='text'
                name='zipCode'
                value={values.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor='isAdmin'>Is Admin?</label>
            <Field
              type='checkbox'
              name='isAdmin'
              value={values.isAdmin}
              onChange={handleChange}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>
      )}
    </Formik>
  )
}

export default Form
