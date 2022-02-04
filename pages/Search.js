//pages/Search.js
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState('Selamat Datang!//• Silahkan cari nama, judul, ataupun kata yang berkaitan dengan hadits yang ingin kamu cari di kolom pencarian diatas.//• Kamu juga bisa membantu aku dalam membangun projek ini dengan cara berdonasi dengan mengklik ikon merah di bawah.//• Jika kamu ingin mengetahui lebih banyak tentang situs ini kamu bisa ')
    
    let text = type.split("//")
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
    }} className="input" placeholder="Ketikkan sesuatu...  eg: 'bukhari'" />
    {
        hits.length === 0 ? 
        
        <div className="text">
            <div className="txt1">{text[0]}</div>
            <div className="txt2">{text[1]}</div>
            <div className="txt3">{text[2]}</div>
            <div className="txt3">{text[3]}
            { text[3] ?
                <a href="https://github.com/digitmisdar/hadits">klik disini.</a>
                :null
            }
            </div>
        </div> 
        
        : hits.map(e => {
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
    <div className="sticky-footer">
        <a href="https://trakteer.id/misdar" target="_blank"><img className="trakteer" src="https://cdn.trakteer.id/images/embed/trbtn-red-7.png" /></a>
        <div></div>
    </div>
</div>
    )
}