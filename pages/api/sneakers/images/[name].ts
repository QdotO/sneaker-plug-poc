import { NextApiRequest, NextApiResponse } from 'next'
import S3, { GetObjectRequest } from 'aws-sdk/clients/s3'

const s3 = new S3({
    region: process.env.AWSDEFAULTREGION,
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
    signatureVersion: 'v4',
})

const ImageApi = async (_req: NextApiRequest, res: NextApiResponse) => {
    if (_req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const name = _req.query.name as string

        const getParams: GetObjectRequest = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
        }
        let response = await s3.getObject(getParams).promise()
        console.log({ S3ImageResponse: response })

        res.setHeader('Content-Type', 'type/jpeg')
        res.send(response.Body)
    } catch (err) {
        console.log({ S3GetError: err })
        res.status(500).json({
            message: err,
        })
    }
}

export default ImageApi
