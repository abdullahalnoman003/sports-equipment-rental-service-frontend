import type { Metadata } from "next";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export const metadata: Metadata = {
  title: "Provider Dashboard",
  description: "Manage your gear inventory, rental orders, and earnings on your GearUp provider dashboard.",
  robots: { index: false, follow: false },
};

const ProviderLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe()

    return (
        <>
        <Navbar user={user}/>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <Footer/>
        </>
    )
}

export default ProviderLayout
