import Head from 'next/head';
import Header from './header/Header';
import Footer from './footer/Footer';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Superhedge</title>
                <link rel="icon" href="/favicon.ico" key="favicon" />
            </Head>
            <main className='w-full'>
                <Header />
                <div className='container mx-auto py-8'>
                    { children }
                </div>
                <Footer />
            </main>
        </>
    )
}
export default Layout;
