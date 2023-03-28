import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout ({children}) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon.ico"/>
                <title>PokeNext</title>
            </Head>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}