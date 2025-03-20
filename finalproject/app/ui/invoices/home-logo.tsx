import { playfairDisplay } from "@/app/ui/fonts";
import '@/app/ui/invoices/home-logo.css'

export default function homelogo(){
    return(
        <div
        className={`${playfairDisplay.className}`}>
            <p className="text-[100px]">Home Made.com</p>
        </div>
    )
}