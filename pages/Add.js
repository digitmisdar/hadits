//pages/Add.js
import css from '../styles/Add.module.scss'
import { useState } from 'react'
import axios from 'axios'

export default function Add(argument) {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [desc, setDesc] = useState()
    const [author, setAuthor] = useState()
    
    const [expand, setExpand] = useState(false)
    
    const [poster, setPoster] = useState('Default')
    const [tag, setTag] = useState()
    const [tagged, _none] = useState(['hadits'])
    
    return (
<div className={css.body}>
    <h2 className={css.title}>Posting Hadits</h2>
    <input type="text" onChange={ e => setTitle(e.target.value) }
      placeholder="Judul... eg, Makan: Membaca Bismillah"
      className={`${css.input}`}/>
    <br />
    <textarea onChange={ e => setContent(e.target.value) }
      placeholder="Isi Hadits..."
      className={`${css.input} ${css.hdscontent}`}/>
    <br />
    <textarea type="text" onChange={ e => setDesc(e.target.value) }
      placeholder="Terjemahan..."
      className={`${css.input} ${css.hdscontent}`}/>
    <input type="text" onChange={ e => setAuthor(e.target.value) }
      placeholder="Perawi Hadits... eg, Al-Bukhari"
      className={`${css.input}`}/>
    
    <h5 onClick={_ => setExpand(!expand)}>{
        expand ? 'Tutup opsi tambahan <' : 'Opsi tambahan >'
    }</h5>
    
    { expand ?
        <div className={css.option}>
            <input type="text" onChange={e => setPoster(e.target.value)}
              className={css.input}
              placeholder="Nama Pengunggah..."
              value={poster}/>
            <div className={css.grouptags}>{
            
            tagged.map(item => {
                return (
                
                <div key={item} className={css.tagitem}>#{item}</div>
                
                )
            })
            
            }</div>
            <div className={css.tags}>
                <input type="text" onChange={e => setTag(e.target.value)} value={tag}
                  className={css.tag}
                  placeholder="Tambah Tag..."/>
                <button onClick={_ => {
                
                    tagged.push(tag)
                    setTag('')
                    
                }}
                  className={css.addtag}>Tambah</button>
            </div>
        </div>
      :null
    }
    
    <button onClick={async e => {
        e.preventDefault()
        
        const res = await axios.post('/api/add', {
            'judul': title,
            'content': content,
            'desc': desc,
            'rawi': author
        })
        alert(JSON.stringify(res.data))
        
    }}
      className={css.button}>Add</button>
</div>
    )
}