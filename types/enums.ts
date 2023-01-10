export enum Status {
    Pending = 'Accepting',
    Active = 'Active(Accepted)',
    Locked = 'Funds Locked(Locked)'
}

export enum DEPOSIT_STATUS {
    NONE,
    APPROVE,
    APPROVING,
    DEPOSIT,
}

export enum WITHDRAW_STATUS {
    NONE,
    INITIATE,
    PENDING,
    DONE,
}