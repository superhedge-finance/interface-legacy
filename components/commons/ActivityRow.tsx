import Image from "next/image";
import { Activity } from "../../types";
import { truncateAddress, formatDate } from "../../utils/helpers";

export const ActivityHeader = () => {
  return (
    <div className={"py-3 px-6 h-[40px] grid grid-cols-4 rounded-[6px]"}>
      <span className={"text-grey-70 text-[12px] leading-[16px]"}>Date</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Deposited</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Lots</span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>Transaction</span>
    </div>
  );
};

export const ActivityRow = ({ activity, className, blockExplorer }: { activity: Activity; className: string; blockExplorer: string }) => {
  return (
    <div className={`py-3 px-6 h-[40px] grid grid-cols-4 rounded-[6px] ${className ?? ""}`}>
      <div className={"flex items-center space-x-2"}>
        <span className={"text-grey-70 text-[12px] leading-[16px]"}>{formatDate(activity.date)}</span>
      </div>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>
        {((Number(activity.amount)).toLocaleString("en-US", {maximumFractionDigits: 6}))} USDC
      </span>
      <span className={"text-[12px] leading-[16px] text-grey-70"}>{activity.lots}</span>
      <span className={"text-[12px] leading-[16px] text-blacknew-100"}>
        <a href={`${blockExplorer}/tx/${activity.txhash}`} target={"_blank"} rel={"noreferrer"}>
          <div className={"flex items-center"}>
            <span className={"bg-primary-gradient bg-clip-text text-transparent"}>{truncateAddress(activity.txhash)}</span>&nbsp;
            <Image src={"/icons/external.svg"} alt={"external icon"} width={18} height={18} />
          </div>
        </a>
      </span>
    </div>
  );
};
