import {useState} from "react";

export const PortfolioSummary = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className={'bg-white w-full rounded-lg p-5'}>
            <img src={'/portfolio/summary.png'} alt={'portfolio summary'} />
            <div className={'mt-5 p-1 flex items-center space-x-2 rounded-[6px] h-[38px]'}>
                <div
                    className={`${tab === 0 ? 'bg-[#EBEBEB]' : 'bg-[rgba(0,0,0,0.04)]'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
                    onClick={() => setTab(0)}>
                    WEEK
                </div>
                <div
                    className={`${tab === 1 ? 'bg-[#EBEBEB]' : 'bg-[rgba(0,0,0,0.04)]'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
                    onClick={() => setTab(1)}>
                    MONTH
                </div>
                <div
                    className={`${tab === 2 ? 'bg-[#EBEBEB]' : 'bg-[rgba(0,0,0,0.04)]'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
                    onClick={() => setTab(2)}>
                    ALL TIME
                </div>
            </div>
        </div>
    )
}
