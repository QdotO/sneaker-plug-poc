import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../../modules/common/components/Layout'
import FileUpload from '../../modules/common/components/FileUpload'

const AddSneakerPage = () => {
  const [date, setDate] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [rate, setRate] = useState<string>(null)
  const [brand, setBrand] = useState<string>(null)
  const [name, setName] = useState<string>(null)
  const [image, setImage] = useState<any>(null)

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

  const clearValues = () => {
    let value = ''
    setDate(value)
    setCategory(value)
    setRate(value)
    setBrand(value)
    setName(value)
    setImage(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const shoeId = crypto.randomUUID()
    event.preventDefault()

    const result = axios.post('/api/sneakers/add', {
      body: {
        sneaker: {
          shoeId,
          date,
          category,
          rate,
          brand,
          name,
          image,
        },
      },
    })
    console.log({ SubmitSneakerResult: result })
    clearValues()
  }

  return (
    <Layout>
      <h2>Add Sneaker to inventory:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          name='date'
          id='date'
          value={date}
          required
          onChange={(event) => handleValueChange(event, 'date')}
        />
        <br />
        <label htmlFor='category'>Category:</label>
        <input
          type='text'
          name='category'
          onChange={(event) => handleValueChange(event, 'category')}
        />
        <br />
        <label htmlFor='rate'>Rate:</label>
        <input
          type='number'
          name='rate'
          required
          onChange={(event) => handleValueChange(event, 'rate')}
        />
        <br />
        <label htmlFor='brand'>Brand:</label>
        <input
          type='text'
          name='brand'
          required
          onChange={(event) => handleValueChange(event, 'brand')}
        />
        <hr />
        <label htmlFor='sneaker'>Sneaker Name:</label>
        <input
          type='text'
          name='name'
          required
          onChange={(event) => handleValueChange(event, 'name')}
        />
        <br />
        <hr />
        <label htmlFor='sneaker'>Image:</label>
        <FileUpload
          onFileUploaded={(event) => handleValueChange(event, 'image')}
        />
        <br />

        <button type='submit'>Submit</button>
      </form>
    </Layout>
  )
}

export default AddSneakerPage
