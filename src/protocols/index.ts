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

export type PhoneResponseData = {
    id: number,
    client_id: number,
    phone_number: string,
    carrier_id: number,
    name: string,
    description: string
}

export type CarrierResponseData = {
    id: number,
    name: string,
    code: number
}