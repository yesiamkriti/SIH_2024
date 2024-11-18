'use client'
import Image from 'next/image';
import './doctorcertificate.css';
export default function Doctorceritificate(){
    return(
        <main>
            <div className="certificate-main-cont">
                <div className="certificate-heading">
                    <h1>Certificates and license</h1>
                </div>
                <div className="certificate-image">
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                    <Image src ={'/certificate1.svg'} priority alt='certificate' height={130} width={130}/>
                </div>         
            </div>
        </main>
    )
}