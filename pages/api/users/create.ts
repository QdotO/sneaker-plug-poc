import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '../../../lib/db'
import sendVerifyEmail from '../../../modules/account/utils/sendVerifyEmal'

const Add = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipCode
    } = _req.body.account
    const dateCreated = Date.now()
    const query = `INSERT INTO sneakers.users (id, username, firstName, lastName, email, phone, streetAddress, streetAddress2, city, state, zipCode, dateCreated, emailVerified, isAdmin ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);`

    const result = await queryDatabase(query, [
      id,
      email,
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      streetAddress2,
      city,
      state,
      zipCode,
      dateCreated,
      false,
      false
    ])
    console.log({ CreateAccountResult: result })
    // sendVerifyEmail({email, firstName, lastName})
  } catch (error) {
    console.log({ CreateAccountError: error })
    res.status(500).send('Create Account Error')
    return
  }

  res.status(200).send('Create Account Successfully')
}

export default Add
