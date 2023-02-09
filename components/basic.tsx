import React from "react";

export const PrimaryButton = ({ label, disabled = false, className, onClick }: { label: string, disabled?: boolean, className?: string, onClick?: () => void }) => {
    return (
        <button className={`bg-[#292929] w-full text-white rounded-[8px] px-[28px] h-[50px] ${className ?? ''} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={!disabled ? onClick : undefined}>
            {label}
        </button>
    );
}

export const SecondaryButton = ({ label, disabled = false, className, onClick }: { label: string, disabled?: boolean, className?: string, onClick?: () => void }) => {
    return (
        <button className={`bg-white border-[1px] border-[#292929] w-full text-black rounded-[8px] py-[18px] px-[28px] ${className ?? ''} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={!disabled ? onClick : undefined}>
            {label}
        </button>
    );
}

export const TitleH2 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[44px] text-[#161717] leading-[44px] ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const TitleH3 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[32px] text-[#161717] leading-[40px] ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const TitleH5 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[24px] leading-[32px] text-[#161717] ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const ParaLight16 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[16px] leading-[24px] text-grey-70 font-light ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const TagRegular12 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[12px] leading-[12px] ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const SubtitleLight12 = ({ children, className = 'text-grey-70' }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[12px] leading-[12px] font-light ${className ?? ''}`}>
            {children}
        </span>
    );
}

export const SubtitleRegular14 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`text-[14px] leading-[14px] text-blacknew-100 ${className ?? ''}`}>
            {children}
        </span>
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
