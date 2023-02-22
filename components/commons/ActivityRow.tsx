import Image from "next/image";
import { Activity } from "../../types";
import { truncateAddress } from "../../utils/helpers";

export const ActivityHeader = () => {
  return (
    <div className={"py-3 px-6 h-[40px] grid grid-cols-4 rounded-[6px]"}>
      <span className={"text-grey-70 text-[12px] leading-[16px]"}>Date</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Deposited</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Lots</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Smart Contract</span>
    </div>
  );
};

export const ActivityRow = ({ activity, className }: { activity: Activity; className: string }) => {
  return (
    <div className={`py-3 px-6 h-[40px] grid grid-cols-4 rounded-[6px] ${className ?? ""}`}>
      <div className={"flex items-center space-x-2"}>
        <span className={"text-grey-70 text-[12px] leading-[16px]"}>{activity.date}</span>
      </div>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>{activity.amount.toLocaleString()} USDC</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>{activity.lots}</span>
      <span className={"text-[12px] leading-[16px] text-blacknew-100"}>
        <a href={`https://goerli.etherscan.io/address/${activity.contract}`} target={"_blank"} rel={"noreferrer"}>
          <div className={"flex items-center"}>
            <span className={"bg-primary-gradient bg-clip-text text-transparent"}>{truncateAddress(activity.contract)}</span>&nbsp;
            <Image src={"/icons/external.svg"} alt={"external icon"} width={18} height={18} />
          </div>
        </a>
      </span>
    </div>
  );
};
