import {useState} from "react";
import {TitleH3} from "../../components/basic";
import {PortfolioSummary} from "../../components/portfolio/Summary";
import {PortfolioPositions} from "../../components/portfolio/Positions";
import {PortfolioTransactionHistory} from "../../components/portfolio/TransactionHistory";
import {SuperHedgeTabs} from "../../components/commons/Tabs";
import {PortfolioPositionList} from "../../components/portfolio/PositionList";

const Portfolio = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className={'py-[80px] flex justify-center'}>
            <div className={'max-w-[650px] w-full'}>
                <div className={'flex flex-col items-center w-full'}>
                    <SuperHedgeTabs labels={['OVERVIEW', 'MY LISTING']} tab={tab} setTab={(tab) => setTab(tab)} width={200} />

                    {
                        tab === 0 &&
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
                    }

                    {
                        tab === 1 &&
                            <div className={'flex flex-col w-full mt-12'}>
                                <PortfolioPositionList />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Portfolio
