import SideNav from "./ui/dashboard/sidenav"
import '@/app/page.css'
import '@/app/ui/button.css'
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/ui/dashboard/footer";

export default function Page() {
  return(
    <main>
      <SideNav />
      <div className="heros">
        <div className="text">
          <h1>New HandMade</h1>
          <p>Hundreds of NEW creations added each week to Home Made</p>
          <button>Shop Now ➤</button>
        </div>
        <div className="products">
          <Image src='/hero1.jpg' alt ="Logo" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
        </div>
      </div>
      <div className="jew">
        <h2>Jewelry</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <Link href='/dashboard/jewelry'><button>SHOP ALL</button></Link>
        
        <Image src='/jewelry.jpg' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>
      <div className="ceramic">
        <h2>Ceramic</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <Link href='/dashboard/ceramic' ><button  >SHOP COLLECTION</button></Link>
        <Image src='/ceramic.jpg' alt="jew" width={1500} height={1032} style={{width:'100%', height:'auto'}}/>
      </div>
      <div className="clothing">
        <h2>Clothing</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <Link href='/dashboard/clothing'><button>SHOP ALL</button> </Link>
        
        <Image src='/clothing.jpg' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>
      <Footer />


    </main>
  )
}