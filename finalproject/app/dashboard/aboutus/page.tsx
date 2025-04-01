import Image from 'next/image';
import '@/app/dashboard/aboutus/page.css'

export default function AboutUsPage() {
    return (
        <div className="aboutus">
            <div>
                <h1>There was a time when our things actually said something about who we are</h1>
                <div className='imagen'>
                <Image src='/Artesano.jpg' alt ="Logo" width={1500} height={1032}/>
                </div>
            </div>
            <div>
                <h2>Our favorite objects were made of stories, and they became a part of our story.</h2>
                <div className='imagen2'>
                <Image src='/Machu.jpg' alt ="Logo" width={1500} height={1032}/>
                </div>
            </div>
            <div>
                <h3>We are building a new kind of marketplace, a place that is fair for all, not a free-for-all, where the handmade is carefully curated and collected</h3>
                <div className='imagen2'>
                <Image src='/foto.jpg' alt ="Logo" width={1500} height={1032}/>
                </div>
            </div>
        </div>


    );
}