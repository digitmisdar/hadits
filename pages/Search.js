//pages/Search.js
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState()
    
    return (
<div>
    <input type="text" onChange={async e => {
        const que = e.target.value
        if (que.length > 2) {
            setType('tunggu...')
            const res = await axios.get('/api/search?q='+ que)
            await setHits(res.data)
            setTimeout(function() {
                setType('tidak ditemukan')
            }, 800);
        }
    }} />
    {
        hits.length === 0 ? type : hits.map(e => {
            return (<li key={e.entityId}>
                <h2>{e.judul}</h2>
                <b>{e.content}</b>
                <p>{e.desc}</p>
                <i>{e.rawi}</i>
                <br />
                <small>{e.entityId}</small>
            </li>)
        })
    }
</div>
    )
}