import Sidebar from "../containers/Sidebar"

const Layout = ({ children }) => {
    return (
        <div className="flex gap-5">
            <Sidebar />
            <main className="max-w-[1200px] overflow-y-scroll flex-1 md:mx-auto mr-6 -ml-10 py-16">{children}</main>
        </div>
    )
}

export default Layout