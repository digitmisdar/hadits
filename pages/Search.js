//pages/Search.js
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState()
    
    return (
<div className="">
    <input type="text" onChange={async e => {
        const que = e.target.value
        if (que.length > 2) {
            setType('tunggu...')
            const res = await axios.get('/api/search?q='+ que)
            await setHits(res.data)
            setTimeout(function() {
                setType('tidak ditemukan')
            }, 1000);
        }
    }} className="input" placeholder="Ketikkan sesuatu..." />
    {
        hits.length === 0 ? type : hits.map(e => {
            return (
            <div key={e.entityId} className="card">
              <div className="card-content">
                <p className="title">{e.judul}</p>
                <br />
                <p className="subtitle">{e.content}</p>
                <p className="">{e.desc}</p>
                <i>H.R: {e.rawi}</i>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  <span>Suka</span>
                </p>
                <p className="card-footer-item">
                  <span>Perbaiki</span>
                </p>
              </footer>
            </div>
            )
        })
    }
</div>
    )
}