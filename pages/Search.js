//pages/Search.js
import css from '../styles/Search.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState()
    const [stat, setStat] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        async function fetchData() {
            if (type.length > 2) {
                setStat('tunggu...')
                const res = await axios.get('/api/search?q='+ type)
                await setHits(res.data)
                setTimeout(function() {
                    setStat('tidak ditemukan :(')
                }, 800);
            }
        }
        fetchData()
    }, [type])
    
    return (
<div>

    {/*SEARCHBAR*/}
    <div className={css.searchbox} >
        <input type="text" onChange={async e => {
        setType(e.target.value)
    }}
      placeholder="ketikkan sesuatu..."
      className={css.searchbar} value={type}/>
      
        <div className={css.searchicon}>
            <div></div>
            <div></div>
        </div>
    </div>
    
    {/*CARDS*/}
    {
        hits.length === 0 ? 
        
        <p className={loading ? css.stateloading : css.statestatus}>
            {stat}
        </p> 
        
        : hits.map(e => {
            return (
            <div key={e.entityId}
              className={css.cardwrapper}>
                <h3>{e.judul}</h3>
                <p className={css.cardcontent}>{e.content}</p>
                <p>{e.desc}</p>
                <i onClick={_ => setType(e.rawi)}
                   className={css.cardauthor}>{e.rawi}</i>
                <br />
            </div>)
        })
    }
    
</div>
    )
}