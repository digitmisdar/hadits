//pages/Add.js
import { useState } from 'react'
import axios from 'axios'

export default function Add(argument) {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [desc, setDesc] = useState()
    const [author, setAuthor] = useState()
    
    return (
<div>
    <input type="text" onChange={ e => setTitle(e.target.value) } />
    <br />
    <textarea onChange={ e => setContent(e.target.value) } />
    <br />
    <textarea type="text" onChange={ e => setDesc(e.target.value) } />
    <input type="text" onChange={ e => setAuthor(e.target.value) } />
    <button onClick={async e => {
        e.preventDefault()
        
        const res = await axios.post('/api/add', {
            'judul': title,
            'content': content,
            'desc': desc,
            'rawi': author
        })
        alert(JSON.stringify(res.data))
        
    }}>Add</button>
</div>
    )
}