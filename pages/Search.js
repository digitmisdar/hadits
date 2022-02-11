//pages/Search.js
import css from '../styles/Search.module.scss'
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState()
    const [loading, setLoading] = useState(false)
    
    return (
<div>

    {/*SEARCHBAR*/}
    <div className={css.searchbox} >
        <input type="text" onChange={async e => {
        const que = e.target.value
        if (que.length > 2) {
            setType('tunggu...')
            const res = await axios.get('/api/search?q='+ que)
            await setHits(res.data)
            setTimeout(function() {
                setType('tidak ditemukan :(')
            }, 800);
        }
    }}
      placeholder="ketikkan sesuatu..."
      className={css.searchbar} />
      
        <div className={css.searchicon}>
            <div></div>
            <div></div>
        </div>
    </div>
    
    {/*CARDS*/}
    {
        hits.length === 0 ? 
        
        <p className={loading ? css.stateloading : css.statestatus}>
            {type}
        </p> 
        
        : hits.map(e => {
            return (
            <div key={e.entityId}
              className={css.cardwrapper}>
                <h2>{e.judul}</h2>
                <b>{e.content}</b>
                <p>{e.desc}</p>
                <i>{e.rawi}</i>
                <br />
            </div>)
        })
    }
    
</div>
    )
}