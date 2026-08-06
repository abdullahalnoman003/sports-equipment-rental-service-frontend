import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <Navbar/>
        <div className="flex min-h-screen flex-col">{children}</div>
        <Footer/>
        </>
        )
}   

export default ProviderLayout