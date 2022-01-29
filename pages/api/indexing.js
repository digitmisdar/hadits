//pages/api/indexing.js
import { createIndex } from '../../addons/redis'

export default async function handler(req, res) {
    const id = await createIndex()
    res.send('index updated!')
}