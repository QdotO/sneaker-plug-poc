import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '../../../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { id} } = req 
    const query = `UPDATE sneakers.sneakers SET deleted=?, deletedTimeStamp=? WHERE id=?`

    switch (method) {
        case 'DELETE':
            try {
                const deletedSneaker = await queryDatabase(query, [true, Date.now(), id])
                res.status(200).json({ success: true, data: deletedSneaker })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}


export default handler
