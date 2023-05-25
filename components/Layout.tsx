import React from "react";
import Head from "next/head";
import Header from "./header/Header";
import Footer from "./footer/Footer";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Superhedge</title>
        <link rel='icon' href='/favicon.ico' key='favicon' />
      </Head>
      <main className='w-full bg-[#161717]'>
        <Header />
        <div className='bg-[#F7F7F7] min-h-[calc(100vh-210px)] py-4 md:py-8 rounded-bl-[12px] rounded-br-[12px] px-5 md:px-12'>
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
};
export default Layout;
