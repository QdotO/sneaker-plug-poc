import axios from 'axios'
import { useState } from 'react'

export default function FileUpload({
    onFileUploaded,
    image,
}: {
    onFileUploaded: (event) => void
    image?: any
}) {
    const [uploadingStatus, setUploadingStatus] = useState<boolean>(false)
    const [showPreview, setShowPreview] = useState(image ? true : false)
    const [imageUrl, setImageUrl] = useState(image ? image : null)

    const uploadFile = async (file) => {
        console.log({ fileToUpload: file })
        setUploadingStatus(true)
        try {
            let { data } = await axios.post('/api/sneakers/upload', {
                name: file.name,
                type: file.type,
            })

            const { url } = data

            let response = await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            })
            console.log({ S3UploadResponse: response })
            setUploadingStatus(false)
        } catch (err) {
            console.log({ S3UploadError: err })
        }
    }

    return (
        <>
            <input
                type='file'
                accept='image/*'
                name='image'
                id='selectFile'
                disabled={uploadingStatus}
                onChange={(e) => {
                    uploadFile(e.currentTarget.files[0])
                    setImageUrl(URL.createObjectURL(e.currentTarget.files[0]))
                    setShowPreview(true)
                    onFileUploaded(e)
                }}
            />
            {showPreview && imageUrl && (
                <div>
                    <img
                        src={imageUrl}
                        alt='uploaded preview'
                        style={{
                            maxWidth: '400px',
                        }}
                    />
                </div>
            )}
        </>
    )
}
