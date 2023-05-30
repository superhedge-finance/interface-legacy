export const SuperHedgeTabs = ({
  labels,
  tab,
  className,
  setTab
}: {
  labels: string[];
  className?: string;
  tab: number;
  setTab: (tab: number) => void;
}) => {
  return (
    <div className={"p-1 flex items-center bg-[#EBEBEB] rounded-[6px] h-[38px]"}>
      {labels.map((label, index) => {
        return (
          <div
            key={index}
            className={`${
              tab === index ? "bg-white" : "bg-transparent"
            } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center ${className ?? ""}`}
            onClick={() => setTab(index)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};
