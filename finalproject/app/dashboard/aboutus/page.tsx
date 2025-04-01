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
            <div className="aboutuslocation">
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d922.4645574657181!2d-70.01525416502973!3d-15.83527874625025!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1743524873475!5m2!1ses-419!2spe" width="600" height="450"  loading="lazy"></iframe>
            </div>
        </div>


    );
}