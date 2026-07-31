const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <div className="flex min-h-screen flex-col">{children}</div>
        </>
    )
}

export default AdminLayout