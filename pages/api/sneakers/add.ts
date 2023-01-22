import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '../../../lib/db'

const Add = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { shoeId, date, category, rate, brand, name, image, color } =
      _req.body.body.sneaker
    const convertedDate = convertDate(date)
    const query = `INSERT INTO sneakers.sneakers (id, brand, name, category, rate, date, image,color) VALUES (?,?,?,?,?,?,?,?);`

    console.log({ query })
    const result = await queryDatabase(query, [
      shoeId,
      brand,
      name,
      category,
      rate,
      convertedDate,
      image,
      color,
    ])
    console.log({ AddSneakerResult: result })
  } catch (error) {
    console.log({ AddSneakerError: error })
    res.status(500).send('Add Sneaker Error')
    return
  }

  res.status(200).send('Added Sneaker Successfully')
}

function convertDate(date: string) {
  return new Date(date).getTime()
}

export default Add
