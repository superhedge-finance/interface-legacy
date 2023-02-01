import {useState} from "react";
import {TitleH3} from "../../components/basic";
import {PortfolioSummary} from "../../components/portfolio/Summary";
import {PortfolioPositions} from "../../components/portfolio/Positions";
import {PortfolioTransactionHistory} from "../../components/portfolio/TransactionHistory";

const Portfolio = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className={'pt-[80px] flex justify-center'}>
            <div className={'max-w-[650px] w-full'}>
                <div className={'flex flex-col items-center w-full'}>
                    <div className={'p-1 flex items-center bg-[#EBEBEB] rounded-[6px] h-[38px]'}>
                        <div
                            className={`${tab === 0 ? 'bg-white' : 'bg-transparent'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center w-[200px]`}
                            onClick={() => setTab(0)}>
                            DEPOSIT
                        </div>
                        <div
                            className={`${tab === 1 ? 'bg-white' : 'bg-transparent'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center w-[200px]`}
                            onClick={() => setTab(1)}>
                            WITHDRAW
                        </div>
                    </div>

                    <div className={'flex flex-col w-full space-y-[80px] mt-12'}>
                        <div className={'flex flex-col space-y-[20px]'}>
                            <TitleH3>Portfolio summary</TitleH3>
                            <PortfolioSummary />
                        </div>

                        <div className={'flex flex-col space-y-[20px]'}>
                            <TitleH3>Positions</TitleH3>
                            <PortfolioPositions />
                        </div>

                        <div className={'flex flex-col space-y-[20px]'}>
                            <TitleH3>Transaction History</TitleH3>
                            <PortfolioTransactionHistory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio
