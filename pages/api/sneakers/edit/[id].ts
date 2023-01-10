import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '../../../../lib/db'

const Edit = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = _req.query.id
        const { category, rate, brand, name, image } = _req.body.body.sneaker
        const query = `UPDATE sneakers.sneakers SET brand=?, name=?, category=?, rate=?, image=? WHERE id=?`

        console.log({ query })
        const result = await queryDatabase(query, [
            brand,
            name,
            category,
            rate,
            image,
            id,
        ])
        console.log({ EditSneakerResult: result })
    } catch (error) {
        console.log({ EditSneakerError: error })
        res.status(500).send('Edit Sneaker Error')
        return
    }

    res.status(200).send('Edited Sneaker Successfully')
}

export default Edit
