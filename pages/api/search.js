//pages/api/search.js
import { search } from '../../addons/redis'

export default async function handler(req, res) {
    const q = req.query.q
    const result = await search(q)
    res.send(result)
}