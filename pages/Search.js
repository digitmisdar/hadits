//pages/Search.js
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [hits, setHits] = useState([])
    const [type, setType] = useState('Selamat Datang!//• Silahkan cari nama, judul, ataupun kata yang berkaitan dengan hadits yang ingin kamu cari di kolom pencarian diatas.//• Kamu juga bisa membantu aku dalam membangun projek ini dengan cara berdonasi dengan mengklik ikon merah di bawah.//• Jika kamu ingin mengetahui lebih banyak tentang situs ini kamu bisa ')
    const [loader, setLoader] = useState()
    let text = type.split("//")
    return (
<div className="body">
    <input type="text" onChange={async e => {
        const que = e.target.value
        if (que.length > 2) {
            setType('')
            setLoader('spinner-2')
            const res = await axios.get('/api/search?q='+ que)
            await setHits(res.data)
            setTimeout(function() {
                setType('Tidak ditemukan!')
                setLoader('')
            }, 1000);
        }
    }} className="input" placeholder="Ketikkan sesuatu...  eg: 'bukhari'" />
    {
        hits.length === 0 ? 
        
        <div className="text">
            <div className={"txt1 "+loader}>{text[0]}</div>
            <div>
                <div className="txt2">{text[1]}</div>
                <div className="txt3">{text[2]}</div>
                <div className="txt3">{text[3]}
                { text[3] &&
                    <a className="source" href="https://github.com/digitmisdar/hadits">klik disini.</a>
                }
                </div>
            </div>
        </div> 
        
        : hits.map(e => {
            return (
        <div key={entityId}>
            <div className="card">
              <div className="card-content">
                <p className="title">{e.judul}</p>
                <br />
                <p className="subtitle">{e.content}</p>
                <p className="">{e.desc}</p>
                <i>H.R: {e.rawi}</i>
              </div>
            </div>
            <br />
        </div>
            )
        })
    }
    <div className="sticky-footer">
        <a href="https://trakteer.id/misdar" target="_blank" rel="noreferrer"><img className="trakteer" src="https://cdn.trakteer.id/images/embed/trbtn-red-7.png" /></a>
        <div></div>
    </div>
</div>
    )
}