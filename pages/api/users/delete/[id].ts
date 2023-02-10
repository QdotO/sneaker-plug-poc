import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '../../../../lib/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { id} } = req 
    const query = `UPDATE sneakers.users SET deletedAt=? WHERE id=?`

    switch (method) {
        case 'DELETE':
            try {
                console.log('deleting user');
                
                const deletedUser = await queryDatabase(query, [Date.now(), id])
                console.log('Deleted user successfully');
                
                res.status(200).json({ success: true, data: deletedUser })
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
