type SneakerImage = {
  url: string
  description?: string
  alt_text?: string
}

type Sneaker = {
  id: string
  date: string
  category?: string
  rate: number
  brand: string
  name: string
  image: SneakerImage
  color: string
  deletedAt?: string

}

export default Sneaker
