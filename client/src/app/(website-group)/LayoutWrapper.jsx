"use client"


import { useParams, usePathname } from 'next/navigation'
import Header from './common/Header'
import Footer from './common/Footer'
import { Provider } from 'react-redux'
import HeaderTwo from './common/HeaderTwo'
import { myStore } from '../store/store'

export default function LayoutWrapper({ children }) {

    const routes = usePathname()
    let { token, id } = useParams()
    const disabledRoutes = ["/pages/auth"];
    const showHeaderFooter = !disabledRoutes.includes(routes);
    const diffrentRouteHeader = ["/pages/contact-us", "/pages/profile",
        "/pages/message", "/pages/properties", "/pages/wishlist"];
    let diffrentHeaderORfooter = diffrentRouteHeader.includes(routes)


    return (
        <>
            <Provider store={myStore}>
                {
                    diffrentHeaderORfooter || id ?
                        <HeaderTwo />
                        :
                        <> {!token && <> {showHeaderFooter && <Header />} </>}</>
                }
                {children}
                {
                    routes == "/pages/message" ?
                        <></>
                        :
                        <>   {!token && <> {showHeaderFooter && <Footer />} </>}</>
                }
            </Provider>
        </>
    )
}
