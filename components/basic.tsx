export const PrimaryButton = ({ label, disabled = false, className, onClick }: { label: string, disabled?: boolean, className?: string, onClick?: () => void }) => {
    return (
        <button className={`bg-[#292929] w-full text-white rounded-[8px] py-[18px] px-[28px] ${className ?? ''} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={!disabled ? onClick : undefined}>
            {label}
        </button>
    );
}

export const SkeletonCard = () => {
    return (
        <div className="flex w-full flex-1 flex-col items-center">
            <div className="animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 w-full">
                <div className="flex flex-col space-y-2">
                    <div className="h-6 w-11/12 rounded-md bg-gray-300" />
                    <div className="h-6 w-10/12 rounded-md bg-gray-300" />
                    <div className="h-6 w-9/12 rounded-md bg-gray-300" />
                    <div className="h-6 w-9/12 rounded-md bg-gray-300" />
                </div>
            </div>
        </div>
    )
}
