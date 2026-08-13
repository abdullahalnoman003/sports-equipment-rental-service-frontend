import type { Metadata } from "next";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Monitor users, gear listings, rentals, and revenue across the GearUp platform.",
  robots: { index: false, follow: false },
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe()

    return (
        <>
        <Navbar user={user}/>
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        <Footer/>
        </>
    )
}

export default AdminLayout
