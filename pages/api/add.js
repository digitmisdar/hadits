//pages/api/add.js
import { add } from '../../addons/redis'

export default async function handler(req, res) {
    const id = await add(req.body)
    res.status(200).json({ id })
}