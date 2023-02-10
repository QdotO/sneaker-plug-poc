import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import newAccountSchema from '../constants/newAccountSchema'
import axios from 'axios'

type Props = {
  onSuccess?: () => void
  onError?: () => void
}

const CreateAccount = ({ onSuccess, onError }: Props) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: ''
  }

  const onSubmit = async (values, { setSubmitting }) => {
    const response = await axios
      .post('/api/users/create', {
        account: {
          id: crypto.randomUUID(),
          ...values
        }
      })
      .catch((e) => {
        console.log({ UserCreateError: e })
        onError?.()
      })
    setSubmitting(false)
    console.log({ CreateAccountResponse: response })
    onSuccess?.()
  }

  return (
    <div>
      <h1 className='text-lg px-4'>Create your new Sneaker Plug account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={newAccountSchema}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-y-4 p-4 w-full text-xl'>
            <div className='grid grid-cols-2 gap-x-4'>
              <div className='flex flex-col text-sm'>
                <label htmlFor='firstName'>First Name</label>
                <Field
                  className='border border-gray-500 px-4 rounded-xl mb-4 h-14'
                  name='firstName'
                  type='text'
                />
                <ErrorMessage name='firstName' component='div' />
              </div>
              <div className='flex flex-col text-sm'>
                <label htmlFor='lastName'>Last Name</label>
                <Field
                  className='border border-gray-500 px-4 rounded-xl mb-4 h-14'
                  name='lastName'
                  type='text'
                />
                <ErrorMessage name='lastName' component='div' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col text-sm'>
                <label htmlFor='email'>Email</label>
                <Field
                  className='border border-gray-500 px-4 rounded-xl mb-4 h-14'
                  name='email'
                  type='email'
                />
                <ErrorMessage name='email' component='div' />
              </div>
              <div className='flex flex-col text-sm'>
                <label htmlFor='phone'>Phone</label>
                <Field
                  className='border border-gray-500 px-4 rounded-xl mb-4 h-14'
                  name='phone'
                  type='phone'
                />
                <ErrorMessage name='phone' component='div' />
              </div>
            </div>
            <div className='flex flex-col text-sm'>
              <label htmlFor='streetAddress'>Street Address</label>
              <Field
                className='border border-gray-500 px-4 h-14 rounded-xl mb-4'
                name='streetAddress'
                type='text'
              />
              <ErrorMessage name='streetAddress' component='div' />
            </div>
            <div className='flex flex-col text-sm'>
              <label htmlFor='streetAddress2'>Street Address 2</label>
              <Field
                className='border border-gray-500 px-4 h-14 rounded-xl mb-4'
                name='streetAddress2'
                type='text'
              />
              <ErrorMessage name='streetAddress2' component='div' />
            </div>
            <div className='grid grid-cols-3 gap-x-4'>
              <div className='flex flex-col text-sm'>
                <label htmlFor='city'>City</label>
                <Field
                  className='border border-gray-500 p-4 h-14 rounded-xl mb-4 text-xl'
                  name='city'
                  type='text'
                />
                <ErrorMessage name='city' component='div' />
              </div>
              <div className='flex flex-col text-sm'>
                <label htmlFor='state'>State</label>
                <Field
                  className='border border-gray-500 p-4 h-14 rounded-xl mb-4 text-xl'
                  name='state'
                  type='text'
                />
                <ErrorMessage name='state' component='div' />
              </div>
              <div className='flex flex-col text-sm'>
                <label htmlFor='zipCode'>Zip Code</label>
                <Field
                  className='border border-gray-500 p-4 h-14 rounded-xl mb-4 text-xl'
                  name='zipCode'
                  type='number'
                />
                <ErrorMessage name='zipCode' component='div' />
              </div>
            </div>
            <button
              className='bg-orange-400 rounded-lg text-white p-4 text-lg'
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateAccount
