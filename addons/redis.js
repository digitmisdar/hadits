//addons/redis.js
import { Entity, Repository, Schema, Client } from 'redis-om'

const client = new Client()
async function connect() {
    if (!client.isOpen()) {
        return await client.open(process.env.REDIS_URL)
    }
}

class Thingy extends Entity {}
let schema = new Schema( Thingy,
    {
        judul: { type: 'string', textSearch: true },
        content: { type: 'string', textSearch: true },
        desc: { type: 'string', textSearch: true },
        rawi: { type: 'string', textSearch: true }
    },{
        dataStructure: 'JSON'
    }
)

export async function add(data) {
    await connect()
    
    let repo = new Repository(schema, client)
    let thingy = repo.createEntity(data)
    let id = await repo.save(thingy)
    return id
}

export async function search(q) {
    await connect()
    let repo = new Repository(schema, client)
    const result = await repo.search()
        .where('judul').match(q)
        .or('content').match(q)
        .or('desc').match(q)
        .or('rawi').match(q)
        .return.all()
    return result
}

export async function createIndex() {
    await connect()
    
    let repo = new Repository(schema, client)
    await repo.dropIndex()
    await repo.createIndex()
    
}