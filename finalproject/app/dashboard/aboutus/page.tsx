import Image from "next/image";
import '@/app/dashboard/aboutus/page.css'

export default function AboutUsPage() {
    return (
        <div className="aboutus">
            <h1>There was a time when our things actually said something about who we are</h1>
            {/*<Image ></Image>*/}
            <p>Our favorite objects were made of stories, and they became a part of our story.</p>

            <h2>Today - one brown box at a time, our lives fill up with easy stuff that has nothing to say, blending into a backdrop of bland</h2>
            <h3>so that everything you add to cart adds a stanza to your story.</h3>
        </div>


    );
}