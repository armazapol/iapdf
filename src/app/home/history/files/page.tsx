'use client'

import React from 'react'
import Image from 'next/image'
import style from '@/styles/FileHistory.module.css'
import { useRouter } from "next/navigation";


export default function Page() {

  const router = useRouter() 

  const goBack = () => {
    router.push('/home/history')
  }

  const files = [
    { img: "/img/File-history.png", info: {title:'Brainly Design System Privacy Policy.xls', peso: '200 MB'} },
    { img: "/img/File-history.png", info: {title:'Brainly Design System Privacy Policy.xls', peso: '200 MB'} },
    { img: "/img/File-history.png", info: {title:'Brainly Design System Privacy Policy.xls', peso: '200 MB'} }
  ]
  return (
    <div className={style.container}>
        <div className={style.backArrow}>
            <Image 
                src="/arrow-right.png"
                alt="back arrox"
                width={24}
                height={24}
                onClick={goBack}
                className={style.flecha}
                />
            <p>Back to history</p>
        </div>
        <div className={style.subContainer}>
            <div className={style.dateSubmitted}>
                <span>Date Submitted:<p>04/21/2025</p></span>
            </div>
            <div className={style.padre}>
                 <div className={style.linea}></div>
                {files.map((file, index) => (
                    <div key={index} className={style.fileContainer}>
                        <div className={style.files}>
                            <div className={style.file}>
                                <Image src={file.img} alt={`File ${index}`} width={32}
                                height={40}/>
                                <div>
                                <p className={style.title}>{file.info.title}</p>
                                <p className={style.peso}>{file.info.peso}</p>
                                </div>
                            </div>
                                <button className={style.btnDownload}><Image src="/img/download.png" alt="download" width={20}
                                height={20} /> Download</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.sendContainer} >
                <button className={style.btnSend}>
                    <Image src="/img/send.png" alt="send" width={18}
                    height={18} />
                    Send by email
                </button>
                <button className={style.btnDownload2}>
                    <Image src="/img/download2.png" alt="download" width={18}
                    height={18}/>
                    Download all
                </button>
            </div>
        </div>
    </div>
  )
}
