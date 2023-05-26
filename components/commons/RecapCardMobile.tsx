export const RecapCardMobile = ({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) => {
    return (
      <div className={`flex md:flex-col flex-1 items-center justify-between h-[40px] md:h-[66px] bg-[#0000000a] rounded-[7px] p-3 ${className ?? ""}`}>
        <p className='text-[16px] md:text-[12px] font-light text-gray-700'>{label}</p>
        <h3 className='text-[16px] font-light text-black'>{value}</h3>
      </div>
    );
};
