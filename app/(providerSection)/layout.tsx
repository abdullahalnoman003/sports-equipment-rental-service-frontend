import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const ProviderLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe()

    return (
        <>
        <Navbar user={user}/>
        <div className="flex min-h-screen flex-col">{children}</div>
        <Footer/>
        </>
    )
}

export default ProviderLayout
