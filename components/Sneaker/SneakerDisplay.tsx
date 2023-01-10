import { useRouter } from 'next/router'
import React from 'react'
import Sneaker from '../../interfaces/Sneaker'

type SneakerDisplayProps = {
    sneaker: Sneaker
}

const SneakerDisplay = ({
    sneaker: { name, brand, category, rate, id, image },
}: SneakerDisplayProps) => {
    console.log({ image })

    const router = useRouter()
    return (
        <div>
            <h1>Sneaker: {name}</h1>
            <br />
            <p>Brand: {brand}</p>
            <br />
            <p>Daily Rate: ${rate}</p>
            <br />
            <p>Category: {category}</p>
            <br />
            {image && (
                <img
                    style={{
                        maxWidth: '400px',
                        margin: '1rem auto',
                    }}
                    src={`/api/sneakers/images/${image}`}
                    alt='sneaker'
                />
            )}
            <button
                type='button'
                onClick={() => router.push(`/sneakers/edit/${id}`)}
            >
                Edit
            </button>
        </div>
    )
}

export default SneakerDisplay
