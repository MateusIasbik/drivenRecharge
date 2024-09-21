export type PhoneData = {
    phone: string[],
    carrier: string,
    fullname: string,
    description: string,
    cpf: string
};

export type RechargeData = {
    amount: number,
    phone_id: string
}