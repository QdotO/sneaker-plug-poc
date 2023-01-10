import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.SNEAKERS_DB_HOST,
        port: Number.parseInt(process.env.SNEAKERS_DB_PORT),
        user: process.env.SNEAKERS_DB_USERNAME,
        password: process.env.SNEAKERS_DB_PASSWORD,
        database: process.env.SNEAKERS_DB_TABLE_NAME,
    },
    onConnectError: (error) => {
        console.log({ DBError: error })
    },
})

export const queryDatabase = async (query: string, values?: string[]) => {
    await db.connect()
    const results = values
        ? await db.query({ sql: query, values })
        : await db.query(query)
    await db.end()
    return results
}
