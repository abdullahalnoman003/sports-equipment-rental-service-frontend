import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { AiAssistant } from "@/components/ai/assistant";
import { getMe } from "@/service/getMe";

const PublicLayout = async ({children}: {children: React.ReactNode}) => {
    const user = await getMe()

    return(
        <>
        <Navbar user={user}/>
        {children}
        <Footer/>
        {/* Section 9: AI chat assistant, grounded in the live catalog. */}
        <AiAssistant />
        </>
    )
}
export default PublicLayout
