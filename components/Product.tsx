import Image from 'next/image';

export default function Product() {
    return (
        <div className="flex flex-col max-w-sm p-6 bg-gray-100 border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-700 hover:border-gray-300">
          <div>
            <span className='inline-block text-sm bg-gray-200 p-2'>Accepting Deposits</span>
            <span className='inline-block text-sm bg-gray-200 ml-3 p-2'>Call-spread</span>
          </div>
          <div className='my-5 flex flex-row'>
            <Image src='/vercel.svg' className='rounded-full border border-gray-200' alt='Product Logo' width={50} height={56}></Image>
            <div className='ml-3'>
              <h5 className="text-xl tracking-tight text-gray-900 dark:text-white">ETH/USD</h5>
              <span className='text-sm text-gray-700'>ETH Bullish Spread</span>
            </div>
          </div>
          <div>
            <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
            <h3 className="font-medium leading-tight text-3xl text-black">7-15%</h3>
          </div>
          <div className='grid grid-cols-2 my-3'>
            <div className='flex flex-col'>
              <span className="text-sm text-gray-700 dark:text-white">Investment Duration</span>
              <span className="text-base font-medium text-gray-700 dark:text-white">30 days</span>
            </div>
            <div className='flex flex-col'>
              <span className="text-sm text-gray-700 dark:text-white">Principal Protection</span>
              <span className="text-base font-medium text-gray-700 dark:text-white">100%</span>
            </div>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-sm text-gray-700 dark:text-white">Amount deposited</span>
            <span className="text-sm dark:text-white">USDC 19,000</span>
          </div>
          <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 my-1">
            <div className="bg-gray-600 h-2" style={{width: '65%' }}></div>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700 dark:text-white">Max</span>
            <span className="text-sm dark:text-white">USDC 1,000,000</span>
          </div>
          <div className='my-3'>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">Issuance date</p>
            <h3 className="font-medium leading-tight text-3xl">20h 24m 15s</h3>
          </div>
          <button type="button" className="py-3 px-5 text-base font-medium text-white focus:outline-none bg-gray-500 hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
            Deposit
          </button>
        </div>
    )
}