//pages/Search.js
import css from '../styles/Search.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState()
    const [stat, setStat] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        async function fetchData() {
            if (type.length > 2) {
                setStat('');setLoading(true);setError(false)
                axios.get('/api/search?q='+ type)
                 .then(res => {
                    setHits(res.data)
                    setTimeout(function() {
                        setStat('tidak ditemukan :(')
                        setLoading(false)
                    }, 800)
                 })
                 .catch(err => {
                    setLoading(false);setError(true)
                    setStat("Koneksi Menuju Database Error :(), Segera refresh halaman. Jika masalah masih berlanjut,  silahkan DM admin di instagram @misdar.k untuk dilakukan perbaikan.")
                 })
            } else {
                setStat('')
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
        
        <p className={
        error ? css.servererror
        : loading ? css.stateloading : css.statestatus
        }>
            
            {stat}
            
            {/*LOADING ICONS >>>*/}
            <div></div>
            <div></div>
            <div></div>
            {/*<<<*/}
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