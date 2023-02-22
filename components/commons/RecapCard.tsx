export const RecapCard = ({ label, value, className }: { label: string; value: string; className?: string }) => {
  return (
    <div className={`flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4 ${className ?? ""}`}>
      <p className='text-[12px] font-light text-gray-700'>{label}</p>
      <h3 className='text-[20px] font-light text-black'>{value}</h3>
    </div>
  );
};
