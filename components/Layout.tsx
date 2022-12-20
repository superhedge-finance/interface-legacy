import Head from 'next/head';
import Header from './header/Header';

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
                <Header></Header>
                <div className={'pt-[72px] pb-[62px] px-[42px] lg:px-[52px] bg-primary'}>
                    {children}
                </div>
            </main>
        </>
    )
}
export default Layout;
