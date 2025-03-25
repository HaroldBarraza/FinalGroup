import SideNav from "./ui/dashboard/sidenav"
import '@/app/page.css'
import '@/app/ui/button.css'
import Image from "next/image";

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
        <button>SHOP ALL</button>
        <Image src='/jewelry.webp' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>
      <div className="decor">
        <h2>Home Decor</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <button>SHOP COLLECTION</button>
        <Image src='/hats.jpg' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>
      <div className="ceramic">
        <h2>Ceramic</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <button>SHOP ALL</button>
        <Image src='/ceramic.jpg' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>
      <div className="clothing">
        <h2>Clothing</h2>
        <p>One of the largest and most unique collection of handmade jewelry </p>
        <button>SHOP COLLECTION</button>
        <Image src='/clothing.webp' alt="jew" width={1500} height={1032} style={{width:'90%', height:'auto'}}/>
      </div>

    </main>
  )
}