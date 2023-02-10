import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import newAccountSchema from '../constants/newAccountSchema'
import axios from 'axios'
import User from '../../../interfaces/User'

type Props = {
  onSuccess?: () => void
  onError?: () => void
  account: User
}

const EditAccount = ({ onSuccess, onError, account }: Props) => {
  const initialValues = {
    ...account
  }

  const onSubmit = async (values, { setSubmitting }) => {
    const response = await axios
      .post('/api/users/edit', {
        account: {
          id: crypto.randomUUID(),
          ...values
        }
      })
      .catch((e) => {
        console.log({ EditAccountError: e })
        onError?.()
      })
    setSubmitting(false)
    console.log({ EditAccountResponse: response })
    onSuccess?.()
  }

  return (
    <div>
      <h1>Create your new Sneaker Plug account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={newAccountSchema}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              width: 'clamp(300px, 50vw, 550px)',
              fontSize: '1.25rem'
            }}
          >
            <label htmlFor='firstName'>First Name</label>
            <Field style={FieldStyle} name='firstName' type='text' />
            <ErrorMessage name='firstName' component='div' />
            <label htmlFor='lastName'>Last Name</label>
            <Field style={FieldStyle} name='lastName' type='text' />
            <ErrorMessage name='lastName' component='div' />
            <label htmlFor='email'>Email</label>
            <Field style={FieldStyle} name='email' type='email' />
            <ErrorMessage name='email' component='div' />
            <label htmlFor='phone'>Phone</label>
            <Field style={FieldStyle} name='phone' type='phone' />
            <ErrorMessage name='phone' component='div' />
            <label htmlFor='streetAddress'>Street Address</label>
            <Field style={FieldStyle} name='streetAddress' type='text' />
            <ErrorMessage name='streetAddress' component='div' />
            <label htmlFor='streetAddress2'>Street Address 2</label>
            <Field style={FieldStyle} name='streetAddress2' type='text' />
            <ErrorMessage name='streetAddress2' component='div' />
            <label htmlFor='city'>City</label>
            <Field style={FieldStyle} name='city' type='text' />
            <ErrorMessage name='city' component='div' />
            <label htmlFor='state'>State</label>
            <Field style={FieldStyle} name='state' type='text' />
            <ErrorMessage name='state' component='div' />
            <label htmlFor='zipCode'>Zip Code</label>
            <Field style={FieldStyle} name='zipCode' type='number' />
            <ErrorMessage name='zipCode' component='div' />
            <button style={ButtonStyle} type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditAccount

const FieldStyle = {
  padding: '1rem',
  height: '2rem',
  borderRadius: '8px',
  margin: '0 0 1rem 0',
  fontSize: '1.25rem'
}

const ButtonStyle = {
  background: 'var(--primary-color)',
  borderRadius: '8px',
  color: 'white',
  padding: '1rem',
  fontSize: '1.25rem'
}
