
import SideNav from "@/app/ui/dashboard/sidenav";
import Footer from "@/app/ui/dashboard/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                <Footer/>
        </div>
        
    );
}