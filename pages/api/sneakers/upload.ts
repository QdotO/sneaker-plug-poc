import { NextApiRequest, NextApiResponse } from 'next'
import S3, { PutObjectRequest } from 'aws-sdk/clients/s3'

const s3 = new S3({
    region: process.env.AWSDEFAULTREGION,
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
    signatureVersion: 'v4',
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        let { name, type } = req.body

        const fileParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type,
            ACL: 'public-read',
        }

        const url = await s3.getSignedUrlPromise('putObject', fileParams)
        res.status(200).json({
            url,
            message: 'Image Url generated Successfully',
        })
    } catch (err) {
        console.log({ S3UrlGenerationError: err })
        res.status(400).json({ message: err })
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb', // Set desired value here
        },
    },
}
