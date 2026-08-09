import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe()

    return (
        <>
        <Navbar user={user}/>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <Footer/>
        </>
    )
}

export default CustomerLayout
