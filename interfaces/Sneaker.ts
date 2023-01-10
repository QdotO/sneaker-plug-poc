type SneakerImage = {
    url: string
    description?: string
    alt_text?: string
}

type Sneaker = {
    id: string
    date: string
    category?: string
    rate: string
    brand: string
    name: string
    image: SneakerImage
}

export default Sneaker
