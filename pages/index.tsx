import { ConnectButton } from '@rainbow-me/rainbowkit';
// import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>Bullish Products</h1>
        <p className='max-w-md py-3'>We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.</p>
        <div className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div>
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">ETH/USD</h5>
              <p>ETH Bullish Spread</p>
            </div>
            <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</p>
            <h3 className="font-medium leading-tight text-3xl text-black">7-15%</h3>
            <div className='grid grid-cols-2 my-3'>
              <div className='flex flex-col'>
                <span className="text-base font-medium text-gray-700 dark:text-white">Investment Duration</span>
                <span className="text-base font-medium text-gray-700 dark:text-white">30 days</span>
              </div>
              <div className='flex flex-col'>
                <span className="text-base font-medium text-gray-700 dark:text-white">Principal Protection</span>
                <span className="text-base font-medium text-gray-700 dark:text-white">100%</span>
              </div>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-gray-700 dark:text-white">Amount deposited</span>
              <span className="text-base font-medium text-gray-700 dark:text-white">USDC 19,000</span>
            </div>
            <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 my-1">
              <div className="bg-gray-600 h-2" style={{width: '65%' }}></div>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-gray-700 dark:text-white">Max</span>
              <span className="text-base font-medium text-gray-700 dark:text-white">USDC 1,000,000</span>
            </div>
            <p className="my-2 text-sm font-normal text-gray-700 dark:text-gray-400">Issuance date</p>
            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-black">20h 24m 15s</h3>
            <button type="button" className="py-3 px-5 text-md font-medium text-white focus:outline-none bg-gray-500 hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
              Deposit
            </button>
        </div>
      </div>
      <div className='flex flex-col'>
        Content
      </div>
    </Layout>
  );
};

export default Home;
