export function conflictError(entity: string) {
    return {
        type: "conflict",
        message: `${entity} já existe ou usuário já possui 3 telefones cadastrados!`
    }
}

export function invalidError(entity: string) {
    return {
        type: "invalidId",
        message: `${entity} não existe!`
    };
}

export function rentNotFinalizedError() {
    return {
        type: "RentNotFinalized",
        message: "O aluguel ainda não foi finalizado!"
    };
}
