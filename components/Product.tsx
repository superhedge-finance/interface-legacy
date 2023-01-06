import Image from 'next/image';
import {IProduct} from '../types/interface';
import Link from "next/link";

const status = [
    'Accepting',
    'Active',
    'Funds Locked'
]

export default function Product({product}: { product: IProduct }) {
    return (
        <div className="flex flex-col p-6 bg-white border border-gray-200 rounded shadow-md hover:border-gray-300">
            <div>
                <span
                    className='inline-block text-white text-sm bg-[#68AC6F] p-2 rounded-lg'>{status[product.status]}</span>
                <span className='inline-block text-white text-sm bg-[#7991DA] ml-3 p-2 rounded-lg'>Call-spread</span>
            </div>
            <div className='my-5 flex flex-row'>
                <div className={'relative flex items-center mr-[40px]'}>
                    <Image src='/usdc.svg' className='rounded-full' alt='Product Logo' width={60} height={60}/>
                    <Image src='/ethereum.svg' className='rounded-full absolute left-[40px]' alt='Product Logo'
                           width={60} height={60}/>
                </div>
                <div className='ml-3'>
                    <h5 className="text-xl tracking-tight text-black">{product.underlying}</h5>
                    <span className='text-sm text-gray-700'>{product.name}</span>
                </div>
            </div>
            <div className={'flex justify-between items-center space-x-12'}>
                <div className={'flex flex-col flex-1'}>
                    <div className="flex justify-between my-1">
                        <span className="text-sm text-gray-700">Amount deposited</span>
                        <span className="text-sm text-gray-700">USDC {product.currentCapacity.toString()}</span>
                    </div>
                    <div className="w-full bg-[#00000014] rounded my-1">
                        <div className="bg-gray-600 h-2 rounded" style={{
                            width: '65%',
                            background: 'linear-gradient(267.56deg, #11CB79 14.55%, #11A692 68.45%, #002366 136.67%)'
                        }}></div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-700">Max</span>
                        <span className="text-sm text-gray-700">USDC {product.maxCapacity.toString()}</span>
                    </div>
                </div>
                <div className={'flex flex-col items-center'}>
                    <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                    <h3 className="font-medium leading-tight text-3xl text-black">7-15%</h3>
                </div>
            </div>
            <div className={'flex items-center justify-between mt-5'}>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <p className="text-[12px] font-light text-gray-700">Issuance date</p>
                    <h3 className="text-[20px] font-light text-black">20h 24m 15s</h3>
                </div>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[12px] font-light text-gray-700">Investment Duration</span>
                    <span className="text-[20px] font-light text-black">30D</span>
                </div>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[12px] font-light text-gray-700">Principal Protection</span>
                    <span className="text-[20px] font-light text-black">100%</span>
                </div>
            </div>
            <Link href={`/product/${product.address}`}>
                <div className="py-3 px-5 text-base font-medium rounded-lg text-white focus:outline-none bg-black hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 flex items-center justify-center cursor-pointer mt-8">
                    DEPOSIT
                </div>
            </Link>
        </div>
    )
}
