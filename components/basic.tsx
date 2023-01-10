import Image from "next/image";

export const PrimaryButton = ({ label, onClick }: { label: string, onClick?: () => void }) => {
    return (
        <button className='bg-[#292929] w-full text-white rounded-[8px] py-[18px] px-[28px]' onClick={onClick}>
            {label}
        </button>
    );
}

export const Loading = () => {
    return (
        <Image src={'/icons/loading.gif'} alt={'loading'} width={100} height={100} />
    )
}