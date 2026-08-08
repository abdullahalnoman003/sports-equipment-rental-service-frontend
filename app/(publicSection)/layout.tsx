import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const PublicLayout = async ({children}: {children: React.ReactNode}) => {
    const user = await getMe()

    return(
        <>
        <Navbar user={user}/>
        {children}
        <Footer/>
        </>
    )
}
export default PublicLayout
