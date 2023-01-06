
export const PrimaryButton = ({ label, onClick }: { label: string, onClick?: () => void }) => {
    return (
        <button className='bg-[#292929] w-full text-white rounded-[8px] py-[18px] px-[28px]' onClick={onClick}>
            {label}
        </button>
    );
}
