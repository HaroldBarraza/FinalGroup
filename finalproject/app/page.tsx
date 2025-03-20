import SideNav from "./ui/dashboard/sidenav"
import '@/app/page.css'
import '@/app/ui/button.css'

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
          <img src="hero1.jpg" alt="hero"/>
        </div>
      </div>

    </main>
  )
}