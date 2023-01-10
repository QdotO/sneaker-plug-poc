import { useRouter } from 'next/router'
import { useState } from 'react'
import { queryDatabase } from '../../../lib/db'
import Sneaker from '../../../interfaces/Sneaker'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Layout from '../../../components/Layout'
import FileUpload from '../../../components/FileUpload'

const EditSneakerPage = ({ sneaker }: { sneaker: Sneaker }) => {
    const [date, setDate] = useState<string>(sneaker.date)
    const [category, setCategory] = useState<string>(sneaker.category)
    const [rate, setRate] = useState<string>(sneaker.rate)
    const [brand, setBrand] = useState<string>(sneaker.brand)
    const [name, setName] = useState<string>(sneaker.name)
    const [image, setImage] = useState<any>(sneaker.image)
    const router = useRouter()

    const handleValueChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: string
    ) => {
        const value = event.target.value as string
        switch (type) {
            case 'date':
                setDate(value)
                break
            case 'category':
                setCategory(value)
                break
            case 'rate':
                setRate(value)
                break
            case 'brand':
                setBrand(value)
                break
            case 'name':
                setName(value)
                break
            case 'image':
                let file = event.target.files[0]
                setImage(file.name)
                break
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = axios.post(`/api/sneakers/edit/${sneaker.id}`, {
            body: {
                sneaker: {
                    ...sneaker,
                    date,
                    category,
                    rate,
                    brand,
                    name,
                    image,
                },
            },
        })
        console.log({ EditSneakerResult: result })
        router.push(`/sneakers/view/${sneaker.id}`)
    }

    return (
        <Layout>
            <h2>Edit Sneaker in inventory:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'>Date:</label>
                <input
                    type='date'
                    name='date'
                    id='date'
                    value={date}
                    onChange={(event) => handleValueChange(event, 'date')}
                />
                <br />
                <label htmlFor='category'>Category:</label>
                <input
                    type='text'
                    name='category'
                    value={category}
                    onChange={(event) => handleValueChange(event, 'category')}
                />
                <br />
                <label htmlFor='rate'>Rate:</label>
                <input
                    type='number'
                    name='rate'
                    value={rate}
                    onChange={(event) => handleValueChange(event, 'rate')}
                />
                <br />
                <label htmlFor='brand'>Brand:</label>
                <input
                    type='text'
                    name='brand'
                    value={brand}
                    onChange={(event) => handleValueChange(event, 'brand')}
                />
                <hr />
                <label htmlFor='sneaker'>Sneaker Name:</label>
                <input
                    type='text'
                    name='name'
                    required
                    value={name}
                    onChange={(event) => handleValueChange(event, 'name')}
                />
                <br />
                <hr />
                <label htmlFor='sneaker'>Image:</label>
                <FileUpload
                    image={image ? `/api/sneakers/images/${image}` : null}
                    onFileUploaded={(event) =>
                        handleValueChange(event, 'image')
                    }
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string
    const results = (await queryDatabase(
        `SELECT * FROM sneakers.sneakers WHERE id='${id}'`
    )) as any[]
    const sneaker: Sneaker = { ...results[0] }
    const formattedDate = new Date(Number.parseInt(sneaker.date))
        .toISOString()
        .split('T')[0]
    sneaker.date = formattedDate

    return {
        props: {
            sneaker,
        },
    }
}

export default EditSneakerPage
